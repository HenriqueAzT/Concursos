import { useEffect, useRef, useState } from "react";
import { CYCLE_BLOCKS, DISC_META } from "./data/conteudo.js";
import { durationLabel, todayInSaoPaulo } from "./calendario.js";

function Timer() {
  const [preset, setPreset] = useState(3000);
  const [remaining, setRemaining] = useState(3000);
  const [deadline, setDeadline] = useState(null);
  const audio = useRef(null);

  useEffect(() => {
    if (deadline === null) return;
    const ticking = setInterval(() => {
      const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds !== 0) return;
      setDeadline(null);
      if (audio.current?.state !== "running") return;
      const context = audio.current;
      const sound = context.createOscillator();
      const volume = context.createGain();
      sound.frequency.value = 880;
      volume.gain.setValueAtTime(.12, context.currentTime);
      volume.gain.exponentialRampToValueAtTime(.001, context.currentTime + .35);
      sound.connect(volume).connect(context.destination);
      sound.start();
      sound.stop(context.currentTime + .35);
    }, 200);
    return () => clearInterval(ticking);
  }, [deadline]);

  useEffect(() => () => { void audio.current?.close(); }, []);

  function start() {
    if (window.AudioContext) {
      audio.current ||= new AudioContext();
      void audio.current.resume().catch(() => {});
    }
    setDeadline(Date.now() + (remaining || preset) * 1000);
    if (remaining === 0) setRemaining(preset);
  }

  return <article className="card">
    <div className="card-header">
      <h2 className="card-title">Timer de foco</h2>
      <div className="action-row">
        {[25, 50, 90].map(minutes => <button key={minutes} className="btn btn-sm" type="button" aria-pressed={preset === minutes * 60}
          onClick={() => { setPreset(minutes * 60); setRemaining(minutes * 60); setDeadline(null); }}>{minutes} min</button>)}
      </div>
    </div>
    <div className="timer-display" role="timer">{Math.floor(remaining / 60) + ":" + String(remaining % 60).padStart(2, "0")}</div>
    <div className="action-row timer-actions">
      <button className="btn btn-primary" type="button" disabled={deadline !== null} onClick={start}>Iniciar</button>
      <button className="btn" type="button" disabled={deadline === null} onClick={() => {
        setRemaining(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
        setDeadline(null);
      }}>Pausar</button>
      <button className="btn" type="button" onClick={() => { setRemaining(preset); setDeadline(null); }}>Reiniciar</button>
    </div>
  </article>;
}

function BackupControls({ store, busy, run }) {
  function download() {
    const blob = new Blob([JSON.stringify(store.study, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "progresso-ifg-401-" + todayInSaoPaulo() + ".json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <article className="card">
    <div className="card-header"><h2 className="card-title">Armazenamento e backup</h2></div>
    <div className="summary-box mb-12">
      {store.health ? <>
        <div><strong>Banco ativo</strong> · {store.health.engine}</div>
        <div>{store.health.dbPath}</div>
        <div><strong>Cópia automática</strong> · {store.health.backupPath}</div>
        {store.health.lastBackupAt && <div>Último backup em {new Date(store.health.lastBackupAt).toLocaleString("pt-BR")}</div>}
        {store.health.lastBackupError && <div>O SQLite informou uma falha ao atualizar a cópia automática.</div>}
      </> : <div>O acompanhamento está no navegador. Use o JSON para guardar ou transferir seus registros.</div>}
    </div>
    <div className="action-row">
      <button className="btn btn-primary btn-sm" type="button" disabled={busy || !store.health}
        onClick={() => run(async () => "Backup atualizado em " + await store.backup())}>Atualizar backup</button>
      <button className="btn btn-sm" type="button" onClick={download}>Exportar JSON</button>
      <label className="btn btn-sm file-control">Importar JSON
        <input className="sr-only" type="file" accept=".json,application/json" disabled={busy}
          onChange={event => {
            const file = event.target.files[0];
            event.target.value = "";
            if (!file) return;
            run(async () => {
              const saved = await store.importState(JSON.parse(await file.text()));
              return saved ? "Progresso importado." : "Progresso disponível no navegador. Falha ao sincronizar com SQLite.";
            });
          }} />
      </label>
      <button className="btn btn-danger btn-sm" type="button" disabled={busy} onClick={() => {
        if (window.confirm("Apagar todo o progresso da agenda, tópicos, histórico, checklists e caderno de erros?")) {
          run(async () => { await store.reset(); return "Progresso apagado."; });
        }
      }}>Zerar progresso</button>
    </div>
  </article>;
}

function Cycle({ store, busy, run }) {
  const { cycle } = store.study;
  const index = cycle.currentIndex % CYCLE_BLOCKS.length;
  const block = CYCLE_BLOCKS[index];
  function complete() {
    const currentIndex = (index + 1) % CYCLE_BLOCKS.length;
    const next = { currentIndex, laps: cycle.laps + Number(currentIndex === 0), hours: cycle.hours + block.hours };
    run(async () => { await store.completeBlock(block, next); return "Bloco concluído."; });
  }

  return <article className="card mt-16">
    <div className="card-header">
      <div><h2 className="card-title">Ciclo livre de estudos</h2>
        <p className="card-sub">Bloco {index + 1} de {CYCLE_BLOCKS.length} · {cycle.laps} voltas · {durationLabel(Math.round(cycle.hours * 60))}</p>
      </div>
      <button className="btn btn-primary btn-sm" type="button" onClick={complete} disabled={busy}>Concluir bloco ativo</button>
    </div>
    <div className="cycle-grid">
      {CYCLE_BLOCKS.map((item, i) => (
        <button key={item.id} className={"cycle-block" + (i === index ? " active-block" : "")} type="button"
          disabled={busy} aria-pressed={i === index}
          onClick={() => store.update(current => ({ ...current, cycle: { ...current.cycle, currentIndex: i } }))}>
          <strong>{item.label}</strong><span>{durationLabel(item.hours * 60)}</span>
        </button>
      ))}
    </div>
  </article>;
}

function ErrorNotebook({ study, update }) {
  function add(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const topic = fields.get("topic").trim();
    const mistake = fields.get("mistake").trim();
    const rule = fields.get("rule").trim();
    if (!topic || !mistake || !rule) return;
    const note = { id: crypto.randomUUID(), disc: fields.get("disc"), topic, mistake, rule, mastered: false };
    update(current => ({ ...current, errors: [note, ...current.errors] }));
    form.reset();
  }

  return <article className="card mt-16">
    <div className="card-header"><h2 className="card-title">Caderno de erros</h2></div>
    <form className="error-fields" onSubmit={add}>
      <label>Disciplina<select name="disc">{Object.entries(DISC_META).map(([id, meta]) => <option key={id} value={id}>{meta.short}</option>)}</select></label>
      <label>Tópico<input name="topic" type="text" required /></label>
      <label>Onde errei<textarea name="mistake" rows="2" required /></label>
      <label>Regra para lembrar<textarea name="rule" rows="2" required /></label>
      <button className="btn btn-primary btn-sm">Adicionar erro</button>
    </form>
    <div className="table-wrap mt-12">
      <table>
        <thead><tr><th>Disciplina</th><th>Tópico</th><th>Erro</th><th>Regra</th><th>Ações</th></tr></thead>
        <tbody>
          {study.errors.map(note => <tr key={note.id} className={note.mastered ? "mastered-note" : undefined}>
            <td>{DISC_META[note.disc]?.short || note.disc}</td><th scope="row">{note.topic}</th><td>{note.mistake}</td><td>{note.rule}</td>
            <td><div className="action-row">
              <button className="btn btn-sm" type="button" onClick={() => update(current => ({
                ...current, errors: current.errors.map(error => error.id === note.id ? { ...error, mastered: !error.mastered } : error),
              }))}>{note.mastered ? "Reabrir" : "Marcar como dominado"}</button>
              <button className="btn btn-sm btn-danger" type="button" aria-label={"Excluir erro " + note.topic}
                onClick={() => update(current => ({ ...current, errors: current.errors.filter(error => error.id !== note.id) }))}>Excluir</button>
            </div></td>
          </tr>)}
          {study.errors.length === 0 && <tr><td colSpan={5}>Nenhum erro registrado.</td></tr>}
        </tbody>
      </table>
    </div>
  </article>;
}

function CycleHistory({ sessions }) {
  return <article className="card mt-16">
    <div className="card-header"><h2 className="card-title">Histórico do ciclo livre</h2></div>
    {sessions.length ? <div className="table-wrap"><table>
      <thead><tr><th>Data</th><th>Disciplina</th><th>Bloco</th><th>Tempo</th></tr></thead>
      <tbody>{sessions.map(session => <tr key={session.id}>
        <td>{new Date(session.createdAt).toLocaleString("pt-BR")}</td>
        <td>{DISC_META[session.disc]?.short || session.disc}</td>
        <td>{session.label}</td><td>{durationLabel(Math.round(session.hours * 60))}</td>
      </tr>)}</tbody>
    </table></div> : <p className="card-sub">Nenhum bloco registrado no SQLite.</p>}
  </article>;
}

export function StudyTools({ store }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function run(action) {
    setBusy(true);
    setMessage("");
    try {
      setMessage(await action());
    } catch (error) {
      setMessage(error.message);
    } finally {
      setBusy(false);
    }
  }
  return <>
    <h1 className="page-title">Timer e erros</h1>
    <div className="grid grid-2"><Timer /><BackupControls store={store} busy={busy} run={run} /></div>
    {message && <p className="section-desc operation-status" role="status">{message}</p>}
    <Cycle store={store} busy={busy} run={run} />
    <ErrorNotebook study={store.study} update={store.update} />
    <CycleHistory sessions={store.sessions} />
  </>;
}
