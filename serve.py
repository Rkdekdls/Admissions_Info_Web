#!/usr/bin/env python3
"""Static site + Kakao REST proxies (browser CORS bypass)."""
from __future__ import annotations

import json
import os
import re
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qs, urlencode, urlparse
from urllib.request import Request, urlopen

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT", "8765"))
KAKAO_TRANSIT = "https://dapi.kakao.com/v2/routing/publictraffic"
KAKAO_KEYWORD = "https://dapi.kakao.com/v2/local/search/keyword.json"
KAKAO_ADDRESS = "https://dapi.kakao.com/v2/local/search/address.json"
API_PATHS = {"/api/kakao/transit", "/api/kakao/places"}


def load_rest_key() -> str:
    env_key = (os.environ.get("KAKAO_MAP_REST_KEY") or os.environ.get("KAKAO_REST_KEY") or "").strip()
    if env_key:
        return env_key
    path = os.path.join(ROOT, "js", "kakao-config.js")
    try:
        text = open(path, encoding="utf-8").read()
    except OSError:
        return ""
    match = re.search(r'KAKAO_MAP_REST_KEY\s*=\s*"([^"]+)"', text)
    return match.group(1).strip() if match else ""


def kakao_get(url: str, key: str) -> tuple[int, bytes, str]:
    req = Request(url, headers={"Authorization": f"KakaoAK {key}"})
    try:
        with urlopen(req, timeout=15) as res:
            return res.status, res.read(), res.headers.get("Content-Type", "application/json; charset=utf-8")
    except HTTPError as err:
        body = err.read() if err.fp else str(err).encode("utf-8")
        return err.code, body, "application/json; charset=utf-8"
    except URLError as err:
        raise RuntimeError(str(err.reason)) from err


def docs_from_body(body: bytes) -> list:
    try:
        data = json.loads(body.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        return []
    docs = data.get("documents")
    return docs if isinstance(docs, list) else []


def normalize_place(doc: dict, kind: str) -> dict | None:
    if kind == "address":
        road = doc.get("road_address") or {}
        addr = doc.get("address") or {}
        name = road.get("address_name") or addr.get("address_name") or doc.get("address_name") or ""
        x = road.get("x") or addr.get("x") or doc.get("x")
        y = road.get("y") or addr.get("y") or doc.get("y")
        if not name or x is None or y is None:
            return None
        return {
            "id": f"addr:{name}:{x}:{y}",
            "place_name": name,
            "address_name": addr.get("address_name") or name,
            "road_address_name": road.get("address_name") or "",
            "category_name": "주소",
            "category_group_code": "ADDR",
            "x": str(x),
            "y": str(y),
            "kind": "address",
        }

    name = doc.get("place_name") or ""
    x = doc.get("x")
    y = doc.get("y")
    if not name or x is None or y is None:
        return None
    return {
        "id": str(doc.get("id") or f"place:{name}:{x}:{y}"),
        "place_name": name,
        "address_name": doc.get("address_name") or "",
        "road_address_name": doc.get("road_address_name") or "",
        "category_name": doc.get("category_name") or "",
        "category_group_code": doc.get("category_group_code") or "",
        "x": str(x),
        "y": str(y),
        "kind": "place",
    }


def place_rank(item: dict) -> tuple:
    code = item.get("category_group_code") or ""
    cat = item.get("category_name") or ""
    kind = item.get("kind") or ""
    if code == "SW8" or "지하철" in cat:
        bucket = 0
    elif "버스" in cat or "정류장" in cat:
        bucket = 1
    elif kind == "address" or code == "ADDR":
        bucket = 2
    else:
        bucket = 3
    return (bucket, item.get("place_name") or "")


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def do_OPTIONS(self):
        if urlparse(self.path).path in API_PATHS:
            self.send_response(204)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
            self.send_header("Access-Control-Allow-Headers", "Authorization, Content-Type")
            self.end_headers()
            return
        self.send_error(404)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/kakao/transit":
            self.proxy_transit(parsed.query)
            return
        if parsed.path == "/api/kakao/places":
            self.proxy_places(parsed.query)
            return
        super().do_GET()

    def proxy_transit(self, query: str) -> None:
        key = load_rest_key()
        if not key:
            self._json_error(500, "REST key missing in js/kakao-config.js")
            return

        qs = parse_qs(query, keep_blank_values=True)
        flat = {k: (v[0] if v else "") for k, v in qs.items()}
        required = ("start_x", "start_y", "end_x", "end_y")
        if any(not flat.get(name) for name in required):
            self._json_error(400, "start_x, start_y, end_x, end_y required")
            return

        try:
            status, body, content_type = kakao_get(f"{KAKAO_TRANSIT}?{urlencode(flat)}", key)
        except RuntimeError as err:
            self._json_error(502, f"Kakao upstream error: {err}")
            return
        self._send_bytes(status, body, content_type)

    def proxy_places(self, query: str) -> None:
        key = load_rest_key()
        if not key:
            self._json_error(500, "REST key missing in js/kakao-config.js")
            return

        qs = parse_qs(query, keep_blank_values=True)
        q = (qs.get("query") or [""])[0].strip()
        if not q:
            self._json_error(400, "query required")
            return

        size = min(max(int((qs.get("size") or ["8"])[0] or "8"), 1), 15)
        x = (qs.get("x") or [""])[0]
        y = (qs.get("y") or [""])[0]
        common = {"query": q, "size": str(size)}
        if x and y:
            common["x"] = x
            common["y"] = y
            common["sort"] = "accuracy"

        jobs = {
            "keyword": f"{KAKAO_KEYWORD}?{urlencode(common)}",
            "subway": f"{KAKAO_KEYWORD}?{urlencode({**common, 'category_group_code': 'SW8'})}",
            "address": f"{KAKAO_ADDRESS}?{urlencode({'query': q, 'size': str(size)})}",
        }

        raw: dict[str, list] = {name: [] for name in jobs}
        try:
            with ThreadPoolExecutor(max_workers=3) as pool:
                futures = {pool.submit(kakao_get, url, key): name for name, url in jobs.items()}
                for future in as_completed(futures):
                    name = futures[future]
                    status, body, _ = future.result()
                    if status == 200:
                        raw[name] = docs_from_body(body)
        except RuntimeError as err:
            self._json_error(502, f"Kakao upstream error: {err}")
            return

        merged = []
        seen = set()
        for kind, docs in (("subway", raw["subway"]), ("keyword", raw["keyword"]), ("address", raw["address"])):
            for doc in docs:
                item = normalize_place(doc, "address" if kind == "address" else "place")
                if not item:
                    continue
                key_id = item["id"]
                soft = f"{item['place_name']}|{item['x']}|{item['y']}"
                if key_id in seen or soft in seen:
                    continue
                seen.add(key_id)
                seen.add(soft)
                merged.append(item)

        merged.sort(key=place_rank)
        payload = json.dumps({"status": "OK", "documents": merged[:12]}, ensure_ascii=False).encode("utf-8")
        self._send_bytes(200, payload, "application/json; charset=utf-8")

    def _send_bytes(self, status: int, body: bytes, content_type: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _json_error(self, status: int, message: str) -> None:
        body = json.dumps({"status": "ERROR", "message": message}, ensure_ascii=False).encode("utf-8")
        self._send_bytes(status, body, "application/json; charset=utf-8")

    def log_message(self, fmt: str, *args) -> None:
        sys.stderr.write("%s - %s\n" % (self.address_string(), fmt % args))


def main() -> None:
    server = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"Serving {ROOT}")
    print(f"Open http://127.0.0.1:{PORT}/#university/university-map")
    print("Proxies: /api/kakao/transit , /api/kakao/places")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
