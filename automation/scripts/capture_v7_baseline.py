#!/usr/bin/env python3
"""Read the frozen V7 HTML and generate reproducible static evidence plus screenshots."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import subprocess
import tempfile
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DEFAULT_SOURCE = Path(r"F:\CDriveOffload\UserFolders\Desktop\ObserverOS_PinkHouse_V7_Full_Responsive_Demo.html")
DEFAULT_CHROME = Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe")
VIEWPORTS = (("desktop", 1440, 1024), ("mobile", 390, 844))


class Inventory(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.classes: set[str] = set()
        self.tags: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.tags.add(tag)
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"] or "")
        self.classes.update((values.get("class") or "").split())


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def capture(chrome: Path, source: Path, output: Path, width: int, height: int) -> dict[str, object]:
    with tempfile.TemporaryDirectory(prefix="dashboard-v7-") as profile:
        command = [
            str(chrome), "--headless=new", "--disable-gpu", "--no-first-run",
            "--no-default-browser-check", "--disable-background-networking",
            "--disable-component-update", "--disable-sync", "--disable-extensions",
            "--no-pings", "--metrics-recording-only", "--virtual-time-budget=5000",
            f"--user-data-dir={profile}", "--allow-file-access-from-files",
            f"--window-size={width},{height}", f"--screenshot={output}", source.as_uri(),
        ]
        result = subprocess.run(command, text=True, capture_output=True, timeout=60, check=False)
    if result.returncode != 0 or not output.is_file():
        raise RuntimeError(f"Chrome screenshot failed ({result.returncode}): {result.stderr.strip()}")
    return {"file": output.name, "viewport": {"width": width, "height": height}, "sha256": digest(output)}


def browser_version(chrome: Path) -> str:
    if os.name == "nt":
        escaped = str(chrome).replace("'", "''")
        return subprocess.check_output(
            ["powershell", "-NoProfile", "-Command", f"(Get-Item -LiteralPath '{escaped}').VersionInfo.ProductVersion"],
            text=True,
        ).strip()
    return subprocess.check_output([str(chrome), "--version"], text=True).strip()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--chrome", type=Path, default=DEFAULT_CHROME)
    parser.add_argument("--static-only", action="store_true")
    args = parser.parse_args()
    source = args.source.resolve()
    if not source.is_file():
        raise FileNotFoundError(source)
    html = source.read_text(encoding="utf-8")
    inventory = Inventory()
    inventory.feed(html)
    output = ROOT / "baseline" / "v7"
    shots = output / "screenshots"
    shots.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, object] = {
        "baseline_asset": source.name,
        "source_path": str(source),
        "source_bytes": source.stat().st_size,
        "source_sha256": digest(source),
        "captured_at_utc": datetime.now(timezone.utc).isoformat(),
        "dom": {"tags": sorted(inventory.tags), "ids": sorted(inventory.ids), "classes": sorted(inventory.classes)},
        "css_breakpoints_px": sorted({int(item) for item in re.findall(r"@media\s*\([^)]*max-width\s*:\s*(\d+)px", html)}),
        "functions": sorted(set(re.findall(r"function\s+([A-Za-z_$][\w$]*)\s*\(", html))),
        "screenshots": [],
    }
    if not args.static_only:
        if not args.chrome.is_file():
            raise FileNotFoundError(args.chrome)
        version = browser_version(args.chrome)
        manifest["browser"] = {"path": str(args.chrome), "version": version, "mode": "headless=new"}
        manifest["screenshots"] = [capture(args.chrome, source, shots / f"{name}-{width}x{height}.png", width, height) for name, width, height in VIEWPORTS]
    (output / "manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"result": "PASS", "manifest": "baseline/v7/manifest.json", "source_sha256": manifest["source_sha256"], "screenshots": len(manifest["screenshots"])}, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
