#!/usr/bin/env python3
"""Verify V7 evidence hashes without changing the frozen source or fixtures."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "baseline" / "v7" / "manifest.json"


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> int:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    source = Path(manifest["source_path"])
    if not source.is_file():
        raise FileNotFoundError(f"baseline source unavailable: {source}")
    if source.stat().st_size != manifest["source_bytes"] or digest(source) != manifest["source_sha256"]:
        raise ValueError("HOLD_BASELINE_SOURCE_DRIFT")
    for screenshot in manifest["screenshots"]:
        path = MANIFEST.parent / "screenshots" / screenshot["file"]
        if not path.is_file() or digest(path) != screenshot["sha256"]:
            raise ValueError(f"HOLD_VISUAL_FIXTURE_DRIFT: {screenshot['file']}")
    print(json.dumps({"result": "PASS", "source_sha256": manifest["source_sha256"], "screenshots": len(manifest["screenshots"])}, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
