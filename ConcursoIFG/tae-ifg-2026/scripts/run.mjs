import { spawn, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { createServer, preview } from "vite";

const project = fileURLToPath(new URL("../", import.meta.url));
const pythonScript = join(project, "backend", "server.py");
const port = process.env.IFG_PORT || "8765";
const backendUrl = "http://127.0.0.1:" + port;
const isPreview = process.argv.includes("--preview");
let ownedBackend;
let vite;
let stopping = false;
let backendExit;

async function health() {
  try {
    const response = await fetch(backendUrl + "/api/health", { signal: AbortSignal.timeout(600) });
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
}

function findPython() {
  const candidates = process.env.IFG_PYTHON
    ? [process.env.IFG_PYTHON]
    : process.platform === "win32" ? ["py", "python"] : ["python3", "python"];
  for (const command of candidates) {
    const result = spawnSync(command, ["-c", "import sys; assert sys.version_info >= (3, 10); print(sys.executable)"], {
      stdio: ["ignore", "pipe", "ignore"],
      encoding: "utf8",
      timeout: 2000,
      windowsHide: true,
      env: { ...process.env, PYTHONIOENCODING: "utf-8" },
    });
    if (result.status === 0 && result.stdout.trim()) return result.stdout.trim();
  }
}

async function startBackend() {
  const running = await health();
  if (running?.dashboard === "ifg-401") {
    if (process.env.IFG_DB_PATH && resolve(running.dbPath) !== resolve(process.env.IFG_DB_PATH)) {
      throw new Error("O servidor Python ativo está usando outro banco. Encerre-o ou configure outra porta.");
    }
    console.log("Reutilizando o servidor IFG em " + backendUrl);
    return;
  }

  const python = findPython();
  if (!python) throw new Error("Python 3.10 ou mais recente é necessário. Você pode indicar o executável em IFG_PYTHON.");
  const env = { ...process.env, IFG_HOST: "127.0.0.1", IFG_PORT: port };
  if (!env.IFG_DB_PATH && process.platform === "win32" && env.LOCALAPPDATA) {
    env.IFG_DB_PATH = join(env.LOCALAPPDATA, "PainelIFG", "estudos.db");
  }
  ownedBackend = spawn(python, ["-B", pythonScript], { cwd: project, env, stdio: "inherit", windowsHide: true });
  ownedBackend.once("error", error => { backendExit = error.message; });
  ownedBackend.once("exit", (code, signal) => {
    backendExit = code ?? signal;
    if (vite && !stopping) {
      console.error("O servidor Python foi encerrado.");
      void stop(1);
    }
  });

  for (let attempt = 0; attempt < 50 && !stopping; attempt++) {
    if (backendExit !== undefined) break;
    if ((await health())?.dashboard === "ifg-401") return;
    await delay(100);
  }
  if (!stopping) throw new Error("O backend não respondeu em " + backendUrl + ". Confira a porta e o log do Python.");
}

async function stop(exitCode) {
  if (stopping) return;
  stopping = true;
  ownedBackend?.kill();
  try {
    if (vite?.close) await vite.close();
    else if (vite?.httpServer) await new Promise(resolveClose => vite.httpServer.close(resolveClose));
  } finally {
    process.exitCode = exitCode;
  }
}

process.once("SIGINT", () => { void stop(0); });
process.once("SIGTERM", () => { void stop(0); });

try {
  if (isPreview && !existsSync(join(project, "frontend", "dist", "index.html"))) {
    throw new Error("Execute npm run build antes de npm run preview.");
  }
  await startBackend();
  if (!stopping) {
    const configFile = join(project, "vite.config.js");
    vite = isPreview ? await preview({ configFile }) : await createServer({ configFile });
    if (!isPreview) await vite.listen();
    vite.printUrls();
  }
} catch (error) {
  console.error(error.message);
  await stop(1);
}
