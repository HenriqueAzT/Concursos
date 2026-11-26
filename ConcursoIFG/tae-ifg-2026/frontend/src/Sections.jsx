import { useState } from "react";
import { durationLabel, todayInSaoPaulo } from "./calendario.js";
import { ADMIN_CHECKLIST, DIAD_CHECKLIST, DISC_META, TOPICS_DATA } from "./data/conteudo.js";
import { EDITAL_FACTS } from "./data/edital.js";
import { LIBRARY_DATA } from "./data/biblioteca.js";
import { STUDY_AGENDA_DATA } from "./data/plano.js";

const scoreKeys = { TI: "esp", PORT: "port", LEG: "leg", RLM: "rlm", INF: "inf" };
const scores = STUDY_AGENDA_DATA.questionDistributionOfficial;
const disciplines = Object.keys(DISC_META);
const number = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const topicDefaults = { theory: false, r24: false, r7: false, r30: false, qTotal: 0, qRight: 0 };
const libraryGroups = [...new Set(LIBRARY_DATA.map(item => item.group))];

export function materialsUrl(url) {
  return url.startsWith("./") ? "/materiais/" + url.slice(2) : url;
}

function fold(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

export function Library() {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const resources = LIBRARY_DATA.filter(item => (!group || item.group === group) &&
    fold([item.group, item.title, item.description, item.type].join(" ")).includes(fold(search.trim())));
  return (
    <>
      <h1 className="page-title">Biblioteca</h1>
      <p className="section-desc">Provas anteriores, legislação e referências para cada família de assuntos.</p>
      <div className="library-controls">
        <label>Buscar material <input type="search" value={search} onChange={event => setSearch(event.target.value)}
          placeholder="Ex.: PostgreSQL ou Lei 8.112" /></label>
        <label>Categoria <select value={group} onChange={event => setGroup(event.target.value)}>
          <option value="">Todas</option>{libraryGroups.map(category => <option key={category}>{category}</option>)}
        </select></label>
      </div>
      {resources.length === 0 && <p className="section-desc">Nenhum material corresponde a essa busca.</p>}
      {libraryGroups.map(category => {
        const items = resources.filter(item => item.group === category);
        if (!items.length) return null;
        return <section key={category} className="library-group">
          <h2>{category}</h2>
          {items.map(item => <article className="resource" key={item.url}>
            <div><a href={materialsUrl(item.url)} target="_blank" rel="noopener">{item.title}</a><p>{item.description}</p></div>
            <span className="resource-type">{item.type}</span>
          </article>)}
        </section>;
      })}
    </>
  );
}

function Topic({ topic, progress, update, expanded }) {
  const [show, setShow] = useState(expanded);
  const meta = DISC_META[topic.disc];
  const priority = { critica: ["b-red", "Prioridade crítica"], alta: ["b-amber", "Prioridade alta"],
    media: ["b-muted", "Prioridade média"] }[topic.prio];
  const practice = progress.qTotal ? Math.round(100 * progress.qRight / progress.qTotal) : null;
  return (
    <article className={"topic-card" + (progress.theory ? " done" : "")} data-topic={topic.id}>
      <div className="topic-head">
        <div>
          <div className="topic-badges">
            <span className={"badge " + meta.badge}>{meta.short}</span>
            <span className={"badge " + priority[0]}>{priority[1]}</span>
            <span className="badge b-muted">{topic.sub}</span>
          </div>
          <h2 className="topic-title">{topic.title}</h2>
        </div>
        <div className="topic-actions">
          {practice !== null && <span className="badge b-muted">{practice}% de acerto</span>}
          <button className="btn btn-sm" type="button" aria-expanded={show} onClick={() => setShow(!show)}>
            {show ? "Recolher" : "Ver resumo"}
          </button>
        </div>
      </div>
      <div className="topic-controls">
        {[["theory", "Teoria"], ["r24", "Rev. 24 h"], ["r7", "Rev. 7 dias"], ["r30", "Rev. 30 dias"]].map(([field, label]) => (
          <label key={field} className="chk-label">
            <input type="checkbox" checked={Boolean(progress[field])} onChange={event => update(field, event.target.checked)} /> {label}
          </label>
        ))}
        <div className="q-inputs">
          {[["qTotal", "Questões"], ["qRight", "Acertos"]].map(([field, label]) => (
            <label key={field}>{label} <input type="number" min="0" max={field === "qRight" ? progress.qTotal : undefined}
              value={progress[field]} onChange={event => update(field, Math.max(0, Number.parseInt(event.target.value, 10) || 0))} /></label>
          ))}
        </div>
      </div>
      {show && <div className="topic-body">
        <p><strong>O que estudar</strong> · {topic.resumo}</p>
        <p><strong>O que praticar</strong> · {topic.aocp}</p>
      </div>}
    </article>
  );
}

export function Syllabus({ study, update, initialTopic }) {
  const [search, setSearch] = useState(initialTopic ? TOPICS_DATA.find(topic => topic.id === initialTopic).title : "");
  const [disc, setDisc] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const filters = [
    ["Disciplina", disc, setDisc, disciplines.map(id => [id, DISC_META[id].short])],
    ["Prioridade", priority, setPriority, [["critica", "Crítica"], ["alta", "Alta"], ["media", "Média"]]],
    ["Progresso", status, setStatus, [["pending", "Teoria pendente"], ["done", "Teoria concluída"], ["weak", "Acerto abaixo de 70%"]]],
  ];
  const visible = TOPICS_DATA.filter(topic => {
    const progress = study.topics[topic.id] || topicDefaults;
    const matches = fold([topic.title, topic.sub, topic.resumo, topic.aocp].join(" ")).includes(fold(search.trim()));
    if (!matches || (disc && topic.disc !== disc) || (priority && topic.prio !== priority)) return false;
    if (status === "done") return progress.theory;
    if (status === "pending") return !progress.theory;
    if (status === "weak") return progress.qTotal > 0 && progress.qRight / progress.qTotal < .7;
    return true;
  });
  return (
    <>
      <h1 className="page-title">Edital verticalizado</h1>
      <p className="section-desc">Anexo III · marque a teoria, as revisões e as questões feitas por assunto.</p>
      <div className="library-controls syllabus-controls">
        <label>Buscar tópico <input type="search" value={search} onChange={event => setSearch(event.target.value)} /></label>
        {filters.map(([label, value, setValue, options]) => <label key={label}>{label}
          <select value={value} onChange={event => setValue(event.target.value)}>
            <option value="">Todos</option>{options.map(([id, name]) => <option key={id} value={id}>{name}</option>)}
          </select>
        </label>)}
        <button className="btn btn-sm" type="button" onClick={() => update(current => ({ ...current, expandAll: !current.expandAll }))}>
          {study.expandAll ? "Recolher resumos" : "Expandir resumos"}
        </button>
      </div>
      <p className="section-desc">{visible.length} de {TOPICS_DATA.length} tópicos</p>
      {visible.map(topic => <Topic key={topic.id + study.expandAll} topic={topic} progress={{ ...topicDefaults, ...study.topics[topic.id] }}
        expanded={study.expandAll} update={(field, value) => update(current => {
          const progress = { ...topicDefaults, ...current.topics[topic.id], [field]: value };
          progress.qRight = Math.min(progress.qRight, progress.qTotal);
          return { ...current, topics: { ...current.topics, [topic.id]: progress } };
        })} />)}
    </>
  );
}

function ScoreSimulator({ sim, setSim }) {
  const entries = disciplines.map(id => {
    const info = scores[id];
    const weight = info.points / info.questions;
    const right = sim[scoreKeys[id]];
    return { ...info, id, weight, right, pointsEarned: right * weight, minRight: info.minimumPoints / weight };
  });
  const total = entries.reduce((sum, row) => sum + row.pointsEarned, 0);
  const failures = entries.filter(row => row.pointsEarned < row.minimumPoints).map(row => DISC_META[row.id].short);
  if (total < scores.total.minimumPoints) failures.push("Nota geral");
  return <article className="card">
    <div className="card-header">
      <h2 className="card-title">Simulador de nota</h2>
      <button className="btn btn-sm" type="button" onClick={() => setSim({ esp: 18, port: 8, leg: 9, rlm: 4, inf: 5 })}>Simular meta de treino</button>
    </div>
    {entries.map(row => <label className="sim-row" key={row.id}>
      <span><strong>{DISC_META[row.id].short}</strong> <span className="muted">(peso {row.weight} · mín. {row.minRight})</span></span>
      <input type="range" aria-label={"Acertos em " + DISC_META[row.id].short} min="0" max={row.questions} value={row.right}
        onChange={event => setSim({ ...sim, [scoreKeys[row.id]]: Number(event.target.value) })} />
      <span>{row.right}/{row.questions} · {row.pointsEarned} pts</span>
    </label>)}
    <div className={"sim-status " + (failures.length ? "alert-danger" : "alert-green")} role="status">
      <strong>{failures.length ? "Abaixo dos mínimos" : "Mínimos atingidos"} ({total} / 100 pontos)</strong>
      <p>{failures.length ? failures.join(" · ") : "A classificação depende da posição e dos critérios do edital."}</p>
    </div>
  </article>;
}

function Salary({ iq, setIq }) {
  const salary = 5215.39;
  const food = 1192;
  const school = iq.pre ? 526.64 : 0;
  const bonus = salary * Number(iq.pct);
  return <article className="card">
    <div className="card-header"><h2 className="card-title">Remuneração estimada · Nível E</h2></div>
    <div className="salary-controls">
      <label>Titulação <select value={iq.pct} onChange={event => setIq({ ...iq, pct: event.target.value })}>
        <option value="0">Graduação</option><option value="0.30">Especialização (30%)</option>
        <option value="0.52">Mestrado (52%)</option><option value="0.75">Doutorado (75%)</option>
      </select></label>
      <label className="chk-label"><input type="checkbox" checked={iq.pre} onChange={event => setIq({ ...iq, pre: event.target.checked })} /> Incluir auxílio pré-escolar</label>
    </div>
    <div className="summary-box mt-12">
      {[["Vencimento básico", salary], ["Incentivo à qualificação", bonus], ["Auxílio-alimentação", food], ["Auxílio pré-escolar", school],
        ["Total bruto estimado", salary + food + school + bonus]].map(([label, value]) =>
        <div className="flex-between" key={label}><span>{label}</span><strong>{money.format(value)}</strong></div>)}
    </div>
  </article>;
}

export function Performance({ study, update }) {
  const totals = TOPICS_DATA.map(topic => ({ ...topic, ...study.topics[topic.id] }));
  const done = totals.filter(topic => topic.theory).length;
  const questions = totals.reduce((sum, topic) => sum + (topic.qTotal || 0), 0);
  const right = totals.reduce((sum, topic) => sum + (topic.qRight || 0), 0);
  const metrics = [
    ["Cobertura do edital", number.format(100 * done / totals.length) + "%", done + " de " + totals.length + " tópicos"],
    ["Questões por assunto", questions, questions ? number.format(100 * right / questions) + "% de acerto" : "Registros do edital verticalizado"],
    ["Ciclo livre", durationLabel(Math.round(60 * study.cycle.hours)), study.cycle.laps + " voltas completas"],
    ["Nota mínima", "60 pts", "Com mínimos por disciplina"],
  ];
  return (
    <>
      <h1 className="page-title">Desempenho e nota</h1>
      <p className="section-desc">Acompanhe o edital verticalizado e calcule a nota ponderada da prova.</p>
      <div className="grid grid-4 mb-12">
        {metrics.map(([label, value, caption]) => <div className="kpi" key={label}>
          <div className="kpi-label">{label}</div><div className="kpi-val">{value}</div><div className="kpi-note">{caption}</div>
        </div>)}
      </div>
      <div className="grid grid-2">
        <article className="card">
          <div className="card-header"><h2 className="card-title">Cobertura por disciplina</h2></div>
          {disciplines.map(id => {
            const items = totals.filter(topic => topic.disc === id);
            const count = items.filter(topic => topic.theory).length;
            return <div className="metric" key={id}>
              <div className="metric-label"><span>{DISC_META[id].name}</span><strong>{count} / {items.length}</strong></div>
              <progress aria-label={DISC_META[id].name} value={count} max={items.length} />
            </div>;
          })}
        </article>
        <article className="card">
          <div className="card-header"><div><h2 className="card-title">Estrutura da prova objetiva</h2>
            <p className="card-sub">50 questões · 4 horas · 100 pontos</p></div></div>
          <div className="table-wrap"><table>
            <thead><tr><th>Disciplina</th><th>Questões</th><th>Peso</th><th>Mínimo</th><th>Máximo</th></tr></thead>
            <tbody>{disciplines.map(id => {
              const item = scores[id];
              return <tr key={id}><th scope="row">{DISC_META[id].short}</th><td>{item.questions}</td>
                <td>{item.points / item.questions}</td><td>{item.minimumPoints}</td><td>{item.points}</td></tr>;
            })}</tbody>
          </table></div>
        </article>
        <ScoreSimulator sim={study.sim} setSim={sim => update(current => ({ ...current, sim }))} />
        <Salary iq={study.iq} setIq={iq => update(current => ({ ...current, iq }))} />
      </div>
    </>
  );
}

function Checklist({ items, values, toggle }) {
  return items.map(item => (
    <label className={"chk-row" + (values[item.id] ? " checked" : "")} key={item.id}>
      <input type="checkbox" checked={Boolean(values[item.id])} onChange={event => toggle(item.id, event.target.checked)} />
      <span>{item.text}</span>
    </label>
  ));
}

export function OfficialDates({ study, update }) {
  const today = todayInSaoPaulo();
  return (
    <>
      <h1 className="page-title">Prazos oficiais</h1>
      <p className="section-desc">
        Datas previstas no Anexo I, conferidas em 25/11/2026. <a href="https://www.institutoaocp.org.br/concursos/724" target="_blank" rel="noopener">Consultar Instituto AOCP</a>
      </p>
      <div className="card mb-12">
        <div className="card-header"><h2 className="card-title">Checklist administrativo</h2></div>
        <Checklist items={ADMIN_CHECKLIST} values={study.adminChk}
          toggle={(id, checked) => update(current => ({ ...current, adminChk: { ...current.adminChk, [id]: checked } }))} />
      </div>
      <div className="card">
        <div className="card-header"><h2 className="card-title">Calendário do concurso · horário de Brasília</h2></div>
        <div className="timeline">
          {EDITAL_FACTS.timeline.map(event => {
            const expired = event.date < today || (event.date === today && event.title === "Solicitação de isenção da taxa"
              && new Date() >= new Date("2026-11-25T17:00:00-03:00"));
            const active = event.start && event.start <= today;
            const label = expired ? "Encerrado" : event.exam ? "Prova" : active ? "Em andamento" : "Previsto";
            return <div className={"tl-item" + (event.exam ? " tl-exam" : "")} key={event.title}>
              <div className="tl-date">{event.label}</div>
              <div><strong>{event.title}</strong><p className="card-sub">{event.desc}</p></div>
              <div><span className={"badge " + (expired ? "b-muted" : "b-green")}>{label}</span></div>
            </div>;
          })}
        </div>
      </div>
    </>
  );
}

export function ExamDay({ study, update }) {
  return (
    <>
      <h1 className="page-title">Cargo e dia da prova</h1>
      <div className="official-notices">
        <h2 className="section-title">Requisitos e regras do código 401</h2>
        {EDITAL_FACTS.notices.map(item => <p key={item.title}><strong>{item.title}</strong> · {item.text}</p>)}
      </div>
      <div className="grid grid-2">
        <article className="card">
          <div className="card-header"><h2 className="card-title">Atribuições do cargo · Anexo II</h2></div>
          <ul className="week-list">
            <li>Desenvolver sistemas informatizados, levantar requisitos, modelar dados, testar e implantar.</li>
            <li>Administrar ambientes de informática, redes, sistemas operacionais e bancos de dados.</li>
            <li>Documentar sistemas, definir padrões técnicos e avaliar a viabilidade de soluções.</li>
            <li>Coordenar projetos, prestar suporte, orientar usuários e assessorar ensino, pesquisa e extensão.</li>
          </ul>
        </article>
        <article className="card">
          <div className="card-header"><h2 className="card-title">Checklist para 14/02/2027</h2></div>
          <Checklist items={DIAD_CHECKLIST} values={study.diadChk}
            toggle={(id, checked) => update(current => ({ ...current, diadChk: { ...current.diadChk, [id]: checked } }))} />
        </article>
      </div>
    </>
  );
}
