import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const preview = path.join(root, "public", "observeros-v7-offline-preview.html");
const record = path.join(root, "docs", "planning", "V7_078_FILE_REVIEW_CONFIRMATION_R1.md");
const expectedPreviewHash = "8706d8cd6585dcd1a4d58be0a377d1ffe8d0228c5362d0fcb6abf93c5a2d627a";
const expectedFrozenHash = "cbafbb0fb3944071e7c8605037f7be2aba9389047cc36e2ad1767b5444ce21ec";

const hash = (value) => createHash("sha256").update(value).digest("hex");
const [previewBytes, recordText] = await Promise.all([readFile(preview), readFile(record, "utf8")]);

if (hash(previewBytes) !== expectedPreviewHash) throw new Error("offline preview SHA-256 drifted");
for (const required of [
  "Owner's explicit message, “已经确认”",
  expectedPreviewHash,
  expectedFrozenHash,
  "HOLD_LIVE_INTEGRATION",
  "not live-integration approval"
]) {
  if (!recordText.includes(required)) throw new Error(`confirmation record missing: ${required}`);
}

console.log("file-review confirmation valid: fixed preview + Owner confirmation + retained live hold");
