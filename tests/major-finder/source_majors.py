# -*- coding: utf-8 -*-
import json
from pathlib import Path
import openpyxl

root = Path(__file__).resolve().parents[2]
wb = openpyxl.load_workbook(root / "data" / "major_info.xlsx", read_only=True, data_only=True)
ws = wb.active
rows = []
for i, row in enumerate(ws.iter_rows(values_only=True), start=1):
    if i == 1 or not row or not row[2]:
        continue
    rows.append({
        "row": i,
        "track": str(row[0]).strip(),
        "mid": str(row[1]).strip(),
        "name": str(row[2]).strip(),
    })
print(json.dumps(rows, ensure_ascii=False))
