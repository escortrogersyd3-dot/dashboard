#!/usr/bin/env python3
"""Reject changed paths that are outside an admitted OTP scope or high-risk."""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CATALOG = ROOT / "automation" / "task-catalog.json"
HIGH_RISK = re.compile(r"(^|/)(\.env($|\.)|.*\.(db|sqlite|sqlite3|pem|key)$)|rtsp://|nvr", re.IGNORECASE)


def allowed(path: str, prefixes: list[str]) -> bool:
    return any(path == prefix.rstrip("/") or path.startswith(prefix.rstrip("/") + "/") for prefix in prefixes)


def high_risk(path: str) -> bool:
    return path != ".env.example" and bool(HIGH_RISK.search(path))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--otp-id", required=True)
    parser.add_argument("--paths", nargs="*", default=[])
    args = parser.parse_args()
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    task = next((item for item in catalog["tasks"] if item["otp_id"] == args.otp_id), None)
    if not task or not task.get("artifact"):
        raise ValueError("OTP artifact is unavailable")
    otp = json.loads((ROOT / task["artifact"]).read_text(encoding="utf-8"))
    rejected = [path for path in args.paths if high_risk(path) or not allowed(path, otp["allowed_paths"])]
    if rejected:
        raise ValueError("HOLD_SCOPE_VIOLATION: " + ", ".join(rejected))
    print(json.dumps({"result": "PASS", "otp_id": args.otp_id, "checked_paths": args.paths}, sort_keys=True))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        raise SystemExit(1)
