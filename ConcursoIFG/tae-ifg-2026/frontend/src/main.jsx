import { useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Agenda } from "./Agenda.jsx";
import { ExamDay, Library, OfficialDates, Performance, Syllabus, materialsUrl } from "./Sections.jsx";
import { StudyMethod } from "./StudyMethod.jsx";
import { StudyTools } from "./StudyTools.jsx";
import { useStudyStore } from "./useStudyStore.js";
import "./base.css";
import "./painel.css";
import "./react-painel.css";

const tabs = [
  ["agenda", "Agenda de estudos"], ["warroom", "Desempenho e nota"], ["edital", "Edital verticalizado"],
  ["biblioteca", "Biblioteca"], ["cronograma", "Prazos oficiais"], ["metodo", "Método de estudo"],
  ["ferramentas", "Timer e erros"], ["diad", "Cargo e dia da prova"],
];

const storageStatus = {
  loading: "Carregando progresso", connected: "SQLite conectado", saving: "Salvando no SQLite",
  error: "Falha ao sincronizar", local: "Salvo neste navegador", unavailable: "Armazenamento indisponível",
};

function App() {
  const store = useStudyStore();
  const { study, status, update } = store;
  const [tab, setTab] = useState("agenda");
  const [topic, setTopic] = useState(null);
  const main = useRef(null);
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = study.theme === "dark" ? "dark" : "light";
  }, [study.theme]);

  function openTab(name, selection = null) {
    setTab(name);
    setTopic(selection);
    window.scrollTo(0, 0);
    main.current?.focus({ preventScroll: true });
  }

  return (
    <>
      <a className="skip-link" href="#main">Ir para o conteúdo</a>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <div className="brand-logo" aria-hidden="true"><svg viewBox="0 0 28 28" fill="none">
              <path d="M5 6h7a4 4 0 0 1 4 4v12a4 4 0 0 0-4-4H5V6Zm11 5a4 4 0 0 1 4-4h3v11h-3a4 4 0 0 0-4 4M8 10h4m-4 4h4"
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg></div>
            <div className="brand-title"><div className="brand-name">Painel de estudos</div><p>IFG · Analista de TI · Cód. 401</p></div>
          </div>
          <div className="topbar-right">
            <div className={"db-pill " + (status === "connected" ? "db-ok" : "db-offline")} aria-live="polite">
              <span aria-hidden="true">●</span> {storageStatus[status]}
            </div>
            <button className="btn btn-sm" type="button" aria-label="Alternar tema claro e escuro" disabled={status === "loading"}
              onClick={() => update(current => ({ ...current, theme: current.theme === "dark" ? "light" : "dark" }))}>Tema</button>
          </div>
        </div>
      </header>
      <div className="app-layout">
        <aside className="app-sidebar">
          <nav className="nav-wrap" aria-label="Seções do painel">
            {tabs.map(([name, label]) => <button key={name} type="button" className={"tab-btn" + (name === tab ? " active" : "")}
              aria-current={name === tab ? "page" : undefined} onClick={() => openTab(name)}>{label}</button>)}
          </nav>
          <div className="sidebar-source">
            <a href={materialsUrl("./8ff48c83-7e97-4366-9376-1205e69dbab6.pdf")} target="_blank" rel="noopener">Edital 001/2026 <span aria-hidden="true">↗</span></a>
            <a href="https://www.institutoaocp.org.br/concursos/724" target="_blank" rel="noopener">Página da banca <span aria-hidden="true">↗</span></a>
          </div>
        </aside>
        <main className="main" id="main" tabIndex={-1} ref={main}>
          {status === "loading" ? <p role="status">Carregando progresso…</p> : <>
            <section hidden={tab !== "agenda"}><Agenda study={study} update={update} openTab={openTab} openTopic={id => openTab("edital", id)} /></section>
            {tab === "warroom" && <Performance study={study} update={update} />}
            {tab === "edital" && <Syllabus key={topic || "todos"} study={study} update={update} initialTopic={topic} />}
            {tab === "biblioteca" && <Library />}
            {tab === "cronograma" && <OfficialDates study={study} update={update} />}
            {tab === "metodo" && <StudyMethod openLibrary={() => openTab("biblioteca")} />}
            <section hidden={tab !== "ferramentas"}><StudyTools store={store} /></section>
            {tab === "diad" && <ExamDay study={study} update={update} />}
          </>}
        </main>
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
