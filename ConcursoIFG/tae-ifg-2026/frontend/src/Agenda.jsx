import { useEffect, useRef, useState } from "react";
import {
  EXAM_DAY, STUDY_START, STUDY_END, agendaInitialDate, agendaOfficialEvents, agendaPeriodDelta,
  agendaRows, agendaSettings, canNavigate, civilDate, countStats, dateRange, durationLabel,
  longDateFormat, monthFormat, scheduleDate, shiftDate, shiftMonth, studyTopics, titleCase,
  todayInSaoPaulo, validStudyDate, weekMetadata, weekStart,
} from "./calendario.js";
import { EDITAL_FACTS } from "./data/edital.js";
import { STUDY_AGENDA_DATA } from "./data/plano.js";

const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const number = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });

function Metrics({ rows, allRows, study, selected, settings, setSettings, today, openTab }) {
  const first = weekStart(selected);
  const last = shiftDate(first, 6);
  const week = countStats(rows);
  const all = countStats(allRows);
  const covered = [...studyTopics.keys()].filter(id => study.topics[id]?.theory).length;
  const deadlines = EDITAL_FACTS.timeline.filter(event => event.date >= today
    && (event.exam || /Inscrições e envio|Pagamento da taxa|Horário e local|Cartão de Informação do Candidato/.test(event.title)))
    .sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);

  return (
    <aside className="agenda-rail" aria-label="Resumo dos estudos">
      <section className="rail-section rail-progress">
        <div className="rail-heading"><h2>Sua semana</h2><span>{dateRange(first, last)}</span></div>
        <Metric label="Tempo" value={week.actualMinutes} max={week.minutes} text={durationLabel(week.actualMinutes) + " / " + durationLabel(week.minutes)} />
        <Metric label="Questões" value={week.actualQuestions} max={week.questions} />
        <Metric label="Sessões" value={week.done} max={rows.length} />
        <details className="rail-config">
          <summary>Ajustar metas semanais</summary>
          <form key={settings.weeklyHours + "/" + settings.weeklyQuestions} onSubmit={event => {
            event.preventDefault();
            const fields = new FormData(event.currentTarget);
            setSettings({ weeklyHours: Number(fields.get("hours")), weeklyQuestions: Number(fields.get("questions")) });
          }}>
            <label>Horas por semana <input name="hours" type="number" min="8" max="10" step="0.5" defaultValue={settings.weeklyHours} required /></label>
            <label>Questões de treino <input name="questions" type="number" min="5" max="300" defaultValue={settings.weeklyQuestions} required /></label>
            <button className="btn btn-primary btn-sm">Salvar metas</button>
          </form>
          <p className="session-meta">Os simulados têm duração fixa. A última semana prevê 6 horas.</p>
        </details>
      </section>
      <section className="rail-section">
        <div className="rail-heading"><h2>Até a prova</h2><span>14 fev 2027</span></div>
        <Metric label="Sessões registradas" value={all.done} max={allRows.length} />
        <Metric label="Teoria no edital" value={covered} max={studyTopics.size} />
        <Metric label="Acertos na agenda" value={all.right} max={all.actualQuestions}
          text={all.actualQuestions ? number.format(100 * all.right / all.actualQuestions) + "% (" + all.right + "/" + all.actualQuestions + ")" : "—"} />
        <button type="button" className="text-link" onClick={() => openTab("edital")}>Ver conteúdo do edital <span aria-hidden="true">›</span></button>
      </section>
      <section className="rail-section">
        <div className="rail-heading"><h2>Próximos prazos</h2></div>
        {deadlines.length ? deadlines.map(event => (
          <div className="deadline" key={event.date}>
            <time dateTime={event.date}>{event.date.slice(8) + "/" + event.date.slice(5, 7)}</time>
            <span>{event.title}</span>
          </div>
        )) : <p className="session-meta">Consulte as últimas publicações da banca.</p>}
        <button type="button" className="text-link" onClick={() => openTab("cronograma")}>Ver cronograma oficial <span aria-hidden="true">›</span></button>
      </section>
    </aside>
  );
}

function Metric({ label, value, max, text = value + " / " + max }) {
  return (
    <div className="metric">
      <div className="metric-label"><span>{label}</span><strong>{text}</strong></div>
      {max > 0 && <progress aria-label={label} value={Math.min(value, max)} max={max} />}
    </div>
  );
}

function SessionControls({ row, onChange, onMove, details }) {
  const hasRecord = row.actualMinutes > 0;
  const initialQuestions = hasRecord ? row.actualQuestions : row.questions;
  const [maxRight, setMaxRight] = useState(initialQuestions);

  function save(event) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const minutes = Number(fields.get("minutes"));
    const questions = Number(fields.get("questions"));
    const right = Number(fields.get("right"));
    if (right > questions) return;
    details.current.open = false;
    onChange({ done: true, minutes, questions, right }, "Sessão registrada.");
  }

  return (
    <details ref={details}>
      <summary>{row.done ? "Editar registro ou data" : "Detalhes e reagendamento"}</summary>
      <form className="session-log" onSubmit={save}>
        <label>Minutos feitos<input name="minutes" type="number" min="1" max="600"
          defaultValue={hasRecord ? row.actualMinutes : row.minutes} required /></label>
        <label>Questões feitas<input name="questions" type="number" min="0" max="300"
          defaultValue={initialQuestions} onChange={event => setMaxRight(Number(event.target.value))} required /></label>
        <label>Acertos<input name="right" type="number" min="0" max={maxRight} placeholder="0"
          defaultValue={hasRecord || !initialQuestions ? row.right : ""} required /></label>
        <button className="btn btn-primary btn-sm">Salvar registro</button>
      </form>
      <form className="session-move" onSubmit={event => {
        event.preventDefault();
        const date = new FormData(event.currentTarget).get("date");
        if (validStudyDate(date)) onMove(date);
      }}>
        <label>Data da sessão<input name="date" type="date" min={STUDY_START} max={STUDY_END} defaultValue={row.date} required /></label>
        <button className="btn btn-sm">Mover sessão</button>
      </form>
    </details>
  );
}

function Session({ row, onChange, onMove, openTab, openTopic }) {
  const details = useRef(null);
  const topics = row.topics.map(id => studyTopics.get(id));
  const minutes = durationLabel(row.done ? row.actualMinutes : row.minutes);
  const planned = "Tempo previsto de " + minutes + (row.questions ? " · " + row.questions + (row.questions === 1 ? " questão" : " questões") : "");
  const actual = minutes + " realizados · " + row.actualQuestions + " questões · " + row.right + " acertos";
  return (
    <article className={"session" + (row.done ? " done" : "")}>
      <div className="session-top">
        <div>
          <div className="session-type">{row.kind}{row.done && " · Concluída"}</div>
          <h3>{row.title}</h3>
          <p className="session-meta">{row.done ? actual : planned}</p>
        </div>
        {row.done
          ? <button type="button" className="btn btn-sm session-reopen" onClick={() => onChange({ done: false }, "Sessão reaberta.")}>Reabrir</button>
          : <button type="button" className="btn btn-primary btn-sm" onClick={() => {
            details.current.open = true;
            details.current.querySelector("input").focus();
          }}>Registrar</button>}
      </div>
      <p className="session-description">{row.description}</p>
      {row.mock && <div className="session-topics">
        <button type="button" className="text-link" onClick={() => openTab("biblioteca")}>Abrir provas e gabaritos</button>
        <button type="button" className="text-link" onClick={() => openTab("warroom")}>Calcular a nota ponderada</button>
      </div>}
      {topics.length > 0 && <details className="session-topic-details">
        <summary>Tópicos da sessão ({topics.length})</summary>
        <div className="session-topics">
          {topics.map(topic => <button key={topic.id} type="button" className="text-link" onClick={() => openTopic(topic.id)}>
            {topic.title.replace(/^\d+[a-z]?\.\s*/, "")}
          </button>)}
        </div>
      </details>}
      <SessionControls key={[row.date, row.done, row.minutes, row.questions, row.actualMinutes, row.actualQuestions, row.right].join("/")}
        row={row} onChange={onChange} onMove={onMove} details={details} />
    </article>
  );
}

function calendarDates(selected, view) {
  const first = weekStart(selected);
  if (view === "week") return weekdays.map((_, i) => shiftDate(first, i));
  const month = selected.slice(0, 7) + "-01";
  const last = shiftDate(shiftMonth(month, 1), -1);
  const end = shiftDate(weekStart(last), 6);
  const dates = [];
  for (let cursor = weekStart(month); cursor <= end; cursor = shiftDate(cursor, 1)) dates.push(cursor);
  return dates;
}

export function Agenda({ study, update, openTab, openTopic }) {
  const [selected, setSelected] = useState(agendaInitialDate);
  const [view, setView] = useState("week");
  const [feedback, setFeedback] = useState("");
  const [today, setToday] = useState(todayInSaoPaulo);
  const calendar = useRef(null);
  const dayHeading = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setToday(todayInSaoPaulo()), 60000);
    return () => clearInterval(timer);
  }, []);

  const settings = agendaSettings(study.agenda);
  const rows = agendaRows(settings);
  const start = weekStart(selected);
  const weekRows = rows.filter(row => weekStart(row.date) === start);
  const week = weekMetadata(selected);
  const daysToExam = Math.round((civilDate(EXAM_DAY) - civilDate(today)) / 86400000);
  const day = rows.filter(row => row.date === selected);
  const dayStats = countStats(day);
  const events = agendaOfficialEvents(selected);
  const rest = week?.exceptions.find(item => item.date === selected && item.type === "rest-and-logistics");

  function changeSession(id, fields, message) {
    update(current => {
      const agenda = agendaSettings(current.agenda);
      return { ...current, agenda: { ...agenda, sessions: { ...agenda.sessions, [id]: { ...agenda.sessions[id], ...fields } } } };
    });
    setFeedback(message);
  }

  return (
    <>
      <div className="agenda-heading">
        <div><h1 className="page-title">Agenda de estudos</h1><p>Analista de TI do IFG · Instituto AOCP</p></div>
        <div className="exam-countdown">
          <span>Prova em <strong>14/02/2027</strong></span><span aria-hidden="true">·</span>
          <strong>{daysToExam > 0 ? daysToExam + " dias" : daysToExam === 0 ? "Hoje" : "Data prevista já passou"}</strong>
        </div>
      </div>
      <div className="agenda-layout">
        <div className="agenda-column">
          <section className="agenda-sheet" aria-labelledby="period-title" ref={calendar}>
            <div className="calendar-toolbar">
              <div>
                <h2 id="period-title">{view === "week" ? dateRange(start, shiftDate(start, 6)) : titleCase(monthFormat.format(civilDate(selected)))}</h2>
                <div className="phase-label">{view === "month" ? "Planejamento mensal" : week?.label || "Prova objetiva"}</div>
              </div>
              <div className="calendar-actions">
                <div className="view-switch" aria-label="Visualização do calendário">
                  {[["week", "Semana"], ["month", "Mês"]].map(([value, label]) => (
                    <button key={value} type="button" aria-pressed={value === view}
                      onClick={() => { setView(value); setSelected(scheduleDate(selected)); }}>{label}</button>
                  ))}
                </div>
                {[[-1, "‹", "Período anterior"], [1, "›", "Próximo período"]].map(([step, icon, label]) => {
                  const date = agendaPeriodDelta(selected, view, step);
                  return <button key={step} className="agenda-icon-button" type="button" aria-label={label}
                    disabled={!canNavigate(date, view)} onClick={() => setSelected(scheduleDate(date))}>{icon}</button>;
                })}
                <button className="btn btn-sm" type="button" onClick={() => setSelected(agendaInitialDate())}>Hoje</button>
              </div>
            </div>
            <div className="calendar-weekdays" aria-hidden="true">{weekdays.map(label => <span key={label}>{label}</span>)}</div>
            <div className={"calendar-grid " + view}>
              {calendarDates(selected, view).map(date => {
                const sessions = rows.filter(row => row.date === date);
                const { done, minutes } = countStats(sessions);
                const official = agendaOfficialEvents(date).length > 0;
                const label = [longDateFormat.format(civilDate(date)),
                  sessions.length && done + " de " + sessions.length + " sessões concluídas", official && "data oficial"].filter(Boolean).join(", ");
                const out = view === "month" && date.slice(0, 7) !== selected.slice(0, 7);
                return <button key={date} type="button" className={"calendar-day" + (out ? " outside" : "")} data-date={date}
                  aria-pressed={date === selected} aria-label={label} aria-current={date === today ? "date" : undefined}
                  onClick={() => { setSelected(date); setFeedback(""); }}>
                  <span className="day-number">{Number(date.slice(8))}</span>
                  <span className="day-markers" aria-hidden="true">
                    {done < sessions.length && <i className="day-dot pending" />}
                    {done > 0 && <i className="day-dot done" />}
                    {official && <i className="day-dot official" />}
                  </span>
                  {view === "week" && minutes > 0 && <span className="day-load">{durationLabel(minutes)}</span>}
                </button>;
              })}
            </div>
            <div className="calendar-legend">
              <span><i className="day-dot pending" /> Estudo</span>
              <span><i className="day-dot done" /> Concluído</span>
              <span><i className="day-dot official" /> Data oficial</span>
            </div>
          </section>
          <section className="day-detail" aria-labelledby="day-title">
            <div className="day-detail-heading">
              <h2 tabIndex={-1} ref={dayHeading} id="day-title">{titleCase(longDateFormat.format(civilDate(selected)))}</h2>
              <p>{day.length
                ? dayStats.done + " de " + day.length + (day.length === 1 ? " sessão concluída" : " sessões concluídas") + " · " + durationLabel(dayStats.minutes) + " de estudo"
                : selected === EXAM_DAY ? "Dia da prova" : "Sem sessões planejadas"}</p>
            </div>
            {events.map(event => <div key={event.title} className="agenda-official"><strong>{event.title}</strong> · {event.desc}</div>)}
            {day.map(row => <Session key={row.id} row={row} openTab={openTab} openTopic={openTopic}
              onChange={(fields, message) => changeSession(row.id, fields, message)}
              onMove={date => {
                setSelected(date);
                changeSession(row.id, { date }, "Sessão movida.");
                dayHeading.current.focus();
              }} />)}
            {!day.length && !events.length && <div className="agenda-empty">
              {rest?.note || "Selecione outro dia para consultar as sessões ou mova uma sessão pendente para esta data."}
            </div>}
            <p className="sr-only" role="status">{feedback}</p>
          </section>
          <details className="agenda-plan">
            <summary>Visão das 12 semanas</summary>
            {STUDY_AGENDA_DATA.weeks.map(item => {
              const scheduled = rows.filter(row => row.date >= item.start && row.date <= item.end);
              const stats = countStats(scheduled);
              return <article className="plan-week" key={item.number}>
                <div><button className="text-link" type="button" onClick={() => {
                  setView("week");
                  setSelected(item.start);
                  calendar.current.scrollIntoView({ block: "center" });
                }}>{item.number} · {item.label}</button><p>{item.focus}</p></div>
                <div className="plan-meta"><span>{dateRange(item.start, item.end)}</span>
                  <span>{durationLabel(stats.minutes)} · {stats.done}/{scheduled.length} sessões</span></div>
              </article>;
            })}
          </details>
        </div>
        <Metrics rows={weekRows} allRows={rows} study={study} selected={selected} settings={settings}
          today={today} openTab={openTab}
          setSettings={fields => {
            update(current => ({ ...current, agenda: { ...agendaSettings(current.agenda), ...fields } }));
            setFeedback("Metas atualizadas.");
          }} />
      </div>
    </>
  );
}
