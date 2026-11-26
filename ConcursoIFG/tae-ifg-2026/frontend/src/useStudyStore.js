import { useEffect, useRef, useState } from "react";
import { DEFAULT_STATE } from "./data/conteudo.js";

const storageKey = "ifg_2026_ati_401_v1";

function normalize(value) {
  if (!value || Array.isArray(value) || typeof value !== "object") {
    throw new Error("O backup precisa conter um objeto JSON.");
  }
  const defaults = structuredClone(DEFAULT_STATE);
  const { sessions, ...data } = value;
  return {
    ...defaults,
    ...data,
    agenda: { ...defaults.agenda, ...data.agenda },
    topics: data.topics ?? {},
    adminChk: data.adminChk ?? {},
    diadChk: data.diadChk ?? {},
    cycle: { ...defaults.cycle, ...data.cycle },
    sim: { ...defaults.sim, ...data.sim },
    iq: { ...defaults.iq, ...data.iq },
    errors: Array.isArray(data.errors) ? data.errors : defaults.errors,
  };
}

function cachedState() {
  try {
    return normalize(JSON.parse(localStorage.getItem(storageKey) || "{}"));
  } catch {
    return structuredClone(DEFAULT_STATE);
  }
}

async function api(path, { method = "GET", value, signal, keepalive } = {}) {
  const response = await fetch("/api/" + path, {
    method, signal, keepalive,
    cache: "no-store",
    headers: value === undefined ? undefined : { "Content-Type": "application/json" },
    body: value === undefined ? undefined : JSON.stringify(value),
  });
  if (!response.ok) throw new Error("Resposta HTTP " + response.status);
  return response.json();
}

export function useStudyStore() {
  const [study, setStudy] = useState(cachedState);
  const [status, setStatus] = useState("loading");
  const [health, setHealth] = useState(null);
  const [sessions, setSessions] = useState([]);
  const latest = useRef(study);
  const connected = useRef(false);
  const pending = useRef(false);
  const saveTimer = useRef();
  const inFlight = useRef(null);
  const advancingCycle = useRef(false);

  function replace(data) {
    latest.current = data;
    setStudy(data);
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch {
      if (!connected.current) setStatus("unavailable");
    }
  }

  function flush(keepalive = false) {
    clearTimeout(saveTimer.current);
    if (inFlight.current) return inFlight.current;
    if (advancingCycle.current) return Promise.resolve(false);
    if (!connected.current || !pending.current) return Promise.resolve(true);
    inFlight.current = (async () => {
      setStatus("saving");
      while (pending.current) {
        pending.current = false;
        const value = latest.current;
        try {
          const result = await api("state", {
            method: "PUT", value,
            keepalive: keepalive && new TextEncoder().encode(JSON.stringify(value)).length < 64000,
          });
          if (result.lastBackupAt) {
            setHealth(previous => ({ ...previous, lastBackupAt: result.lastBackupAt }));
          }
        } catch {
          pending.current = true;
          setStatus("error");
          return false;
        }
      }
      setStatus("connected");
      return true;
    })().finally(() => { inFlight.current = null; });
    return inFlight.current;
  }

  function update(updater) {
    replace(updater(latest.current));
    if (connected.current) {
      pending.current = true;
      clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => flush(), 160);
    }
  }

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const saveBeforeExit = () => { void flush(true); };
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") saveBeforeExit();
    };
    Promise.all([api("state", { signal: controller.signal }), api("health", { signal: controller.signal })])
      .then(([data, server]) => {
        if (cancelled) return;
        if (server.dashboard !== "ifg-401") throw new Error("Servidor incompatível.");
        connected.current = true;
        replace(normalize(data));
        setSessions(data.sessions ?? []);
        setHealth(server);
        setStatus("connected");
      })
      .catch(() => { if (!cancelled) setStatus("local"); })
      .finally(() => clearTimeout(timeout));
    window.addEventListener("pagehide", saveBeforeExit);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timeout);
      clearTimeout(saveTimer.current);
      window.removeEventListener("pagehide", saveBeforeExit);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  async function completeBlock(block, nextCycle) {
    if (connected.current) {
      if (!await flush()) throw new Error("Salve o progresso antes de concluir o bloco.");
      advancingCycle.current = true;
      try {
        const result = await api("sessions", {
          method: "POST",
          value: { blockId: block.id, disc: block.disc, label: block.label, hours: block.hours, cycle: nextCycle },
        });
        setSessions(result.sessions);
        if (result.lastBackupAt) setHealth(previous => ({ ...previous, lastBackupAt: result.lastBackupAt }));
        replace({ ...latest.current, cycle: result.cycle ?? nextCycle });
        // Legacy servers send the session history without updating the cycle.
        if (!result.cycle) pending.current = true;
      } finally {
        advancingCycle.current = false;
        await flush();
      }
    } else {
      update(current => ({ ...current, cycle: nextCycle }));
    }
  }

  async function backup() {
    if (!connected.current || !await flush()) throw new Error("O SQLite está indisponível.");
    const result = await api("backup", { method: "POST" });
    setHealth(result);
    return result.backupPath;
  }

  async function importState(value) {
    const normalized = normalize(value);
    update(() => normalized);
    return flush();
  }

  async function reset() {
    clearTimeout(saveTimer.current);
    pending.current = false;
    await inFlight.current;
    if (connected.current) {
      await api("state", { method: "DELETE" });
      const [data, server] = await Promise.all([api("state"), api("health")]);
      replace(normalize(data));
      setHealth(server);
      setSessions(data.sessions);
      setStatus("connected");
      pending.current = false;
    } else {
      replace(structuredClone(DEFAULT_STATE));
      setSessions([]);
    }
  }

  return { study, status, health, sessions, update, completeBlock, backup, importState, reset };
}
