import { rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trace = path.join(root, ".next", "trace");

try {
  await rm(trace, { force: true, recursive: true });
  console.log(`removed: ${trace}`);
} catch (err) {
  if (err && err.code !== "ENOENT") {
    console.error(`error removing ${trace}:`, err);
  }
}
