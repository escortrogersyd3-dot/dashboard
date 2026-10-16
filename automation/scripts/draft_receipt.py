#!/usr/bin/env python3
"""Print a non-authoritative receipt draft; this command writes no files."""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--otp-id", required=True)
    parser.add_argument("--status", choices=["pass", "hold", "fail"], default="hold")
    args = parser.parse_args()
    catalog = json.loads((ROOT / "automation" / "task-catalog.json").read_text(encoding="utf-8"))
    task = next(item for item in catalog["tasks"] if item["otp_id"] == args.otp_id)
    artifact = ROOT / task["artifact"]
    commit = subprocess.check_output(["git", "-C", str(ROOT), "rev-parse", "HEAD"], text=True).strip()
    print(json.dumps({
        "otp_id": args.otp_id,
        "otp_sha256": hashlib.sha256(artifact.read_bytes()).hexdigest(),
        "git_commit": commit,
        "status": args.status,
        "changed_paths": [],
        "checks": [],
        "holds": ["Draft only; external audit evidence not attached"]
    }, indent=2, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
