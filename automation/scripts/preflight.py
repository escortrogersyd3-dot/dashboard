#!/usr/bin/env python3
"""Offline preflight for one admitted Dashboard OTP."""
from __future__ import annotations

import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONFIG = ROOT / "automation" / "local-runner.config.json"
CATALOG = ROOT / "automation" / "task-catalog.json"


def git(*args: str) -> str:
    return subprocess.check_output(["git", "-C", str(ROOT), *args], text=True).strip()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--otp-id", required=True)
    args = parser.parse_args()
    config = json.loads(CONFIG.read_text(encoding="utf-8"))
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    task = next((item for item in catalog["tasks"] if item["otp_id"] == args.otp_id), None)
    if task is None:
        raise ValueError("OTP is absent from task catalog")
    if task["status"] != "admitted":
        raise ValueError(f"OTP is not admitted: {task['status']}")
    artifact = task.get("artifact")
    if not artifact:
        raise ValueError("admitted OTP has no artifact")
    artifact_path = ROOT / artifact
    if not artifact_path.is_file():
        raise ValueError("OTP artifact is absent")
    remote = git("remote", "get-url", "origin")
    if remote != config["expected_remote"]:
        raise ValueError("origin does not match local-runner configuration")
    if git("status", "--porcelain"):
        raise ValueError("working tree is not clean at task start")
    digest = hashlib.sha256(artifact_path.read_bytes()).hexdigest()
    print(json.dumps({
        "result": "PASS",
        "otp_id": args.otp_id,
        "otp_sha256": digest,
        "remote": remote,
        "runtime_mode": config["runtime_mode"],
        "observeros_access": config["observeros_access"]
    }, sort_keys=True))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (ValueError, subprocess.CalledProcessError) as exc:
        print(f"PREFLIGHT_HOLD: {exc}", file=sys.stderr)
        raise SystemExit(1)
