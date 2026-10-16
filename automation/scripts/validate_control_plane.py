#!/usr/bin/env python3
"""Validate the repository-local automation control plane without external access."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CATALOG = ROOT / "automation" / "task-catalog.json"
TEMPLATE = ROOT / "automation" / "otp-template.json"


def fail(message: str) -> None:
    raise ValueError(message)


def load(path: Path) -> dict:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError:
        fail(f"missing required file: {path.relative_to(ROOT)}")
    except json.JSONDecodeError as exc:
        fail(f"invalid JSON in {path.relative_to(ROOT)}: {exc}")


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def validate_catalog() -> dict:
    catalog = load(CATALOG)
    template = load(TEMPLATE)
    tasks = catalog.get("tasks")
    if not isinstance(tasks, list) or not tasks:
        fail("task catalog must contain a non-empty tasks list")
    ids = [task.get("otp_id") for task in tasks]
    if any(not isinstance(item, str) or not item for item in ids):
        fail("every task must have an otp_id")
    if len(ids) != len(set(ids)):
        fail("duplicate otp_id in task catalog")
    allowed_statuses = set(template["allowed_statuses"])
    by_id = {task["otp_id"]: task for task in tasks}
    for task in tasks:
        if task.get("status") not in allowed_statuses:
            fail(f"invalid status for {task['otp_id']}")
        for dependency in task.get("depends_on", []):
            if dependency not in by_id:
                fail(f"unknown dependency {dependency} in {task['otp_id']}")
            if dependency == task["otp_id"]:
                fail(f"self dependency in {task['otp_id']}")
        artifact = task.get("artifact")
        if artifact:
            validate_otp(ROOT / artifact, template, task["otp_id"])
    return catalog


def validate_otp(path: Path, template: dict, expected_id: str | None = None) -> dict:
    otp = load(path)
    missing = [field for field in template["required_fields"] if field not in otp]
    if missing:
        fail(f"OTP {path.name} missing fields: {', '.join(missing)}")
    if expected_id and otp["otp_id"] != expected_id:
        fail(f"OTP id mismatch in {path.name}")
    if otp["status"] not in template["allowed_statuses"]:
        fail(f"invalid OTP status in {path.name}")
    if not otp["allowed_paths"]:
        fail(f"OTP {path.name} has no allowed_paths")
    return otp


def verify_issue() -> None:
    body = os.environ.get("ISSUE_BODY", "")
    id_match = re.search(r"OTP-ID:\s*([^\s>]+)", body)
    sha_match = re.search(r"OTP-SHA256:\s*([a-f0-9]{64})", body, flags=re.I)
    if not id_match or not sha_match:
        fail("issue body must contain OTP-ID and OTP-SHA256 markers")
    catalog = validate_catalog()
    task = next((item for item in catalog["tasks"] if item["otp_id"] == id_match.group(1)), None)
    if not task or not task.get("artifact"):
        fail("issue OTP-ID has no admitted local artifact")
    actual = sha256(ROOT / task["artifact"])
    if actual != sha_match.group(1).lower():
        fail("issue OTP-SHA256 does not match the exact local artifact")
    print(f"issue admission valid: {task['otp_id']} {actual}")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--verify-issue", action="store_true")
    args = parser.parse_args()
    if args.verify_issue:
        verify_issue()
    else:
        catalog = validate_catalog()
        admitted = [item["otp_id"] for item in catalog["tasks"] if item["status"] == "admitted"]
        print(f"control-plane valid: {len(catalog['tasks'])} tasks; admitted={','.join(admitted)}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except ValueError as exc:
        print(f"control-plane invalid: {exc}", file=sys.stderr)
        raise SystemExit(1)
