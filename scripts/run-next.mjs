import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");

if (!existsSync(nextCli)) {
  console.error(
    "Missing Next.js CLI at node_modules/next/dist/bin/next.\n" +
      "Run: npm install\n" +
      "If install fails in ML&RLLC (ampersand in path), this repo includes .npmrc " +
      "using PowerShell for lifecycle scripts; or run: npm install --ignore-scripts"
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const env = { ...process.env };
if (env.NEXT_TELEMETRY_DISABLED === undefined) {
  env.NEXT_TELEMETRY_DISABLED = "1";
}

const isBuild = args[0] === "build";
const child = spawn(process.execPath, [nextCli, ...args], {
  stdio: isBuild ? ["ignore", "inherit", "inherit"] : "inherit",
  cwd: root,
  env,
  shell: false
});

child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
