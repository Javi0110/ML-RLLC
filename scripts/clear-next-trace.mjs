import { existsSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trace = path.join(root, ".next", "trace");
if (existsSync(trace)) {
  try {
    unlinkSync(trace);
  } catch {
    /* OneDrive/antivirus may hold the file; build may still succeed */
  }
}
