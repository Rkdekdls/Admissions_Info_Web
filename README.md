# 입시 정보 조회 서비스

`serve.py`만 실행해서는 지도·대중교통이 동작하지 않습니다.  
**키를 먼저 넣은 뒤** 서버를 켜야 합니다.

## 1. 카카오 키 준비

1. `js/kakao-config.example.js`를 복사해 `js/kakao-config.js`로 저장합니다.
2. [카카오 개발자 콘솔](https://developers.kakao.com)에서 **JavaScript 키**와 **REST API 키**를 확인합니다.
3. Web 플랫폼에 `http://127.0.0.1:8765`를 등록합니다.
4. `js/kakao-config.js`에 키를 넣습니다.

```js
window.KAKAO_MAP_APP_KEY = "여기에_JavaScript_키";   // 지도용 (필수)
window.KAKAO_MAP_REST_KEY = "여기에_REST_API_키";     // 대중교통·장소검색 (아래 서버 키 참고)
window.KAKAO_TRANSIT_PROXY = "";
```

`js/kakao-config.js`는 `.gitignore` 대상이라 깃에 올라가지 않습니다.

## 2. 서버 실행

프로젝트 폴더에서:

```powershell
python serve.py
```

브라우저에서 http://127.0.0.1:8765/ 를 엽니다.  
포트 변경: `$env:PORT=9000; python serve.py`

## 서버 키 (REST API 키)

대중교통·장소 검색(`/api/kakao/transit`, `/api/kakao/places`)은 **REST API 키**가 필요합니다.  
`serve.py`는 아래 순서로 읽습니다.

1. 환경변수 `KAKAO_MAP_REST_KEY` (또는 `KAKAO_REST_KEY`)
2. 없으면 `js/kakao-config.js`의 `KAKAO_MAP_REST_KEY`

### 방법 A — 설정 파일에 넣기 (로컬에서 제일 단순)

`js/kakao-config.js`에 REST 키를 넣고 `python serve.py`만 실행하면 됩니다.

```js
window.KAKAO_MAP_REST_KEY = "여기에_REST_API_키";
```

### 방법 B — 환경변수만 쓰기 (브라우저에 REST 키 노출 안 함)

`js/kakao-config.js`의 `KAKAO_MAP_REST_KEY`는 비워 두고, **서버를 켤 때** 환경변수를 함께 줍니다.  
환경변수 없이 `python serve.py`만 하면 REST 프록시는 `REST key missing`으로 실패합니다.

**PowerShell**

```powershell
$env:KAKAO_MAP_REST_KEY = "여기에_REST_API_키"
python serve.py
```

**cmd**

```bat
set KAKAO_MAP_REST_KEY=여기에_REST_API_키
python serve.py
```

**bash**

```bash
export KAKAO_MAP_REST_KEY="여기에_REST_API_키"
python serve.py
```

> JavaScript 키(`KAKAO_MAP_APP_KEY`)는 지도 SDK용이라 `kakao-config.js`에 반드시 있어야 합니다.  
> REST만 환경변수로 빼는 것이고, APP 키까지 비우면 지도 자체가 안 뜹니다.

## 프록시 경로

| 경로 | 용도 |
|------|------|
| `/api/kakao/transit` | 대중교통 경로 |
| `/api/kakao/places` | 장소·주소 검색 |
| `/api/kakao/maps-sdk` | 지도 JS SDK (로컬 Referer 우회) |
