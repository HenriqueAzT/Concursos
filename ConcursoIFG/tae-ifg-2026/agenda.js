const EXAM_DAY = STUDY_AGENDA_DATA.exam.date;
const STUDY_START = STUDY_AGENDA_DATA.weeks[0].start;
const STUDY_END = STUDY_AGENDA_DATA.weeks.at(-1).end;
const AGENDA_DEFAULT = { weeklyHours: 8, weeklyQuestions: 30, sessions: {} };
const saoPauloDate = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit"
});
const longDateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC", weekday: "long", day: "numeric", month: "long"
});
const monthFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", month: "long", year: "numeric" });
const shortDateFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "numeric", month: "short" });
const studyTopics = new Map();
const metricsNumber = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 });
const weekdays = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
let agendaView = "week";
let agendaDate = agendaInitialDate();
let agendaStatus = "";

function civilDate(iso) {
  return new Date(iso + "T00:00:00Z");
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function shiftDate(iso, amount) {
  const date = civilDate(iso);
  date.setUTCDate(date.getUTCDate() + amount);
  return isoDate(date);
}

function weekStart(iso) {
  return shiftDate(iso, -civilDate(iso).getUTCDay());
}

function todayInSaoPaulo() {
  return saoPauloDate.format(new Date());
}

function agendaInitialDate() {
  return [STUDY_START, todayInSaoPaulo(), EXAM_DAY].sort()[1];
}

function durationLabel(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return [hours ? hours + " h" : "", remainder || !hours ? remainder + " min" : ""].filter(Boolean).join(" ");
}

function titleCase(text) {
  return text.charAt(0).toLocaleUpperCase("pt-BR") + text.slice(1);
}

function dateRange(first, last) {
  return shortDateFormat.format(civilDate(first)) + " a " + shortDateFormat.format(civilDate(last));
}

function boundedNumber(value, fallback, min, max) {
  const number = Number(value);
  return value != null && Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
}

function validStudyDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && value >= STUDY_START && value <= STUDY_END && !Number.isNaN(civilDate(value).getTime())
    && isoDate(civilDate(value)) === value;
}

function agendaSettings() {
  const stored = state.agenda || {};
  return {
    weeklyHours: boundedNumber(stored.weeklyHours, AGENDA_DEFAULT.weeklyHours, 8, 10),
    weeklyQuestions: Math.round(boundedNumber(stored.weeklyQuestions, AGENDA_DEFAULT.weeklyQuestions, 5, 300)),
    sessions: stored.sessions && typeof stored.sessions === "object" && !Array.isArray(stored.sessions) ? stored.sessions : {}
  };
}

function agendaRows(settings) {
  return STUDY_AGENDA_DATA.weeks.flatMap(week => {
    const full = week.exceptions.find(item => item.type === "full-mock");
    const half = week.diagnostics?.find(item => item.type === "timed-half-mock");
    const fixedMock = full || half;
    const base = week.sessions.map((session, i) => {
      const date = session.date || shiftDate(week.start, weekdays.indexOf(session.day));
      return { ...session, id: "w" + week.number + "-" + (i + 1), date, mock: date === fixedMock?.date ? fixedMock : null };
    });
    const ordinary = base.filter(session => !session.mock);
    const minutes = ordinary.reduce((sum, session) => sum + session.minutes, 0);
    const questions = ordinary.reduce((sum, session) => sum + session.questions, 0);
    const targetMinutes = full || week.phase === "taper"
      ? minutes : Math.round(minutes * settings.weeklyHours / AGENDA_DEFAULT.weeklyHours);
    const targetQuestions = Math.round(questions * settings.weeklyQuestions / AGENDA_DEFAULT.weeklyQuestions);
    let usedMinutes = 0;
    let usedQuestions = 0;
    return base.map(session => {
      const mock = session.mock;
      const plannedMinutes = mock ? mock.minutes
        : Math.round((usedMinutes + session.minutes) * targetMinutes / minutes) - Math.round(usedMinutes * targetMinutes / minutes);
      const plannedQuestions = mock ? mock.questions
        : Math.round((usedQuestions + session.questions) * targetQuestions / questions) - Math.round(usedQuestions * targetQuestions / questions);
      if (!mock) {
        usedMinutes += session.minutes;
        usedQuestions += session.questions;
      }
      const topics = session.topicIds.map(id => studyTopics.get(id)).filter(Boolean);
      const mainTopics = topics.slice(0, 2).map(topic => topic.title.replace(/^\d+[a-z]?\.\s*/, ""));
      const subjects = session.subjects.map(id => DISC_META[id].short).join(" · ");
      const revision = ["revisao", "sprint", "taper"].includes(week.phase);
      return {
        id: session.id,
        date: session.date,
        minutes: plannedMinutes,
        questions: plannedQuestions,
        disc: session.subjects[0],
        kind: mock ? "Questões cronometradas" : subjects,
        title: mock ? (full ? "Simulado integral" : "Meio simulado")
          : session.activity || (revision ? "Revisão e questões" : mainTopics.join(" + ")),
        description: mock ? (mock.format || mock.note)
          : revision ? "Recupere os pontos fracos de memória e confira as respostas no caderno de erros."
            : "Comece pela revisão pendente, pratique com questões e corrija os erros.",
        topics: mock ? [] : session.topicIds,
        mock: Boolean(mock)
      };
    });
  }).map(session => {
    const saved = settings.sessions[session.id] || {};
    const actualQuestions = Math.round(boundedNumber(saved.questions, 0, 0, 300));
    return {
      ...session,
      date: validStudyDate(saved.date) ? saved.date : session.date,
      done: saved.done === true,
      actualMinutes: Math.round(boundedNumber(saved.minutes, 0, 0, 600)),
      actualQuestions,
      right: Math.round(boundedNumber(saved.right, 0, 0, actualQuestions))
    };
  });
}

function countStats(rows) {
  return rows.reduce((total, row) => ({
    minutes: total.minutes + row.minutes,
    questions: total.questions + row.questions,
    done: total.done + Number(row.done),
    actualMinutes: total.actualMinutes + (row.done ? row.actualMinutes : 0),
    actualQuestions: total.actualQuestions + (row.done ? row.actualQuestions : 0),
    right: total.right + (row.done ? row.right : 0)
  }), { minutes: 0, questions: 0, done: 0, actualMinutes: 0, actualQuestions: 0, right: 0 });
}

function agendaMetric(label, value, max, text) {
  const bar = max > 0 ? '<progress aria-label="' + label + '" value="' + Math.min(value, max) + '" max="' + max + '"></progress>' : "";
  return '<div class="metric"><div class="metric-label"><span>' + label + '</span><strong>' + text + '</strong></div>' + bar + '</div>';
}

function weekMetadata(date) {
  const start = weekStart(date);
  return STUDY_AGENDA_DATA.weeks.find(week => weekStart(week.start) === start);
}

function shiftMonth(iso, amount) {
  const date = civilDate(iso.slice(0, 7) + "-01");
  date.setUTCMonth(date.getUTCMonth() + amount);
  return isoDate(date);
}

function agendaPeriodDelta(amount) {
  if (agendaView === "week") return shiftDate(weekStart(agendaDate), amount * 7);
  return shiftMonth(agendaDate, amount);
}

function canNavigate(date) {
  if (agendaView === "week") return date >= weekStart(STUDY_START) && date <= weekStart(EXAM_DAY);
  return date.slice(0, 7) >= STUDY_START.slice(0, 7) && date.slice(0, 7) <= EXAM_DAY.slice(0, 7);
}

function scheduleDate(date) {
  return [STUDY_START, date, EXAM_DAY].sort()[1];
}

function agendaOfficialEvents(date) {
  return EDITAL_FACTS.timeline.filter(event => event.date === date || (event.start === date && event.start >= STUDY_START));
}

function renderCalendar(rows) {
  const selectedMonth = agendaDate.slice(0, 7);
  const today = todayInSaoPaulo();
  const startOfWeek = weekStart(agendaDate);
  const week = weekMetadata(agendaDate);
  const dates = [];
  if (agendaView === "week") {
    for (let i = 0; i < 7; i++) dates.push(shiftDate(startOfWeek, i));
  } else {
    const monthStart = selectedMonth + "-01";
    const first = weekStart(monthStart);
    const last = shiftDate(shiftMonth(monthStart, 1), -1);
    const end = shiftDate(weekStart(last), 6);
    for (let current = first; current <= end; current = shiftDate(current, 1)) dates.push(current);
  }
  document.getElementById("phaseLabel").textContent = agendaView === "month"
    ? "Planejamento mensal" : (week ? week.label : "Prova objetiva");
  document.getElementById("periodTitle").textContent = agendaView === "week"
    ? dateRange(startOfWeek, shiftDate(startOfWeek, 6)) : titleCase(monthFormat.format(civilDate(agendaDate)));
  document.getElementById("prevPeriod").disabled = !canNavigate(agendaPeriodDelta(-1));
  document.getElementById("nextPeriod").disabled = !canNavigate(agendaPeriodDelta(1));
  document.querySelectorAll("[data-calendar-view]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.calendarView === agendaView));
  });

  const grid = document.getElementById("calendarGrid");
  grid.classList.toggle("month", agendaView === "month");
  grid.innerHTML = dates.map(date => {
    const sessions = rows.filter(row => row.date === date);
    const stats = countStats(sessions);
    const events = agendaOfficialEvents(date);
    const inMonth = agendaView === "week" || date.startsWith(selectedMonth);
    const labels = [longDateFormat.format(civilDate(date))];
    if (sessions.length) labels.push(stats.done + " de " + sessions.length + " sessões concluídas");
    if (events.length) labels.push("data oficial");
    const markers = [
      stats.done < sessions.length ? '<i class="day-dot pending"></i>' : "",
      stats.done ? '<i class="day-dot done"></i>' : "",
      events.length ? '<i class="day-dot official"></i>' : ""
    ].join("");
    return '<button type="button" class="calendar-day' + (inMonth ? "" : " outside") + '" data-date="' + date
      + '" aria-label="' + escapeHtml(labels.join(", ")) + '" aria-pressed="' + (date === agendaDate) + '"'
      + (date === today ? ' aria-current="date"' : "") + '><span class="day-number">' + Number(date.slice(8))
      + '</span><span class="day-markers" aria-hidden="true">' + markers + '</span>'
      + (agendaView === "week" && stats.minutes ? '<span class="day-load">' + durationLabel(stats.minutes) + '</span>' : "")
      + '</button>';
  }).join("");
}

function sessionMarkup(row) {
  const label = DISC_META[row.disc]?.short || (row.disc === "SIM" ? "Simulado" : "Revisão");
  const type = escapeHtml(row.kind || label);
  const topics = (row.topics || []).map(id => studyTopics.get(id)).filter(Boolean);
  const hasRecord = row.actualMinutes > 0;
  const actualMinutes = hasRecord ? row.actualMinutes : row.minutes;
  const actualQuestions = hasRecord ? row.actualQuestions : row.questions;
  const stats = row.done
    ? durationLabel(row.actualMinutes) + " realizados · " + row.actualQuestions + " questões · " + row.right + " acertos"
    : "Tempo previsto de " + durationLabel(row.minutes) + (row.questions ? " · " + row.questions + (row.questions === 1 ? " questão" : " questões") : "");
  const safeId = escapeHtml(row.id);
  return '<article class="session' + (row.done ? " done" : "") + '"><div class="session-top"><div><div class="session-type">'
    + type + (row.done ? " · Concluída" : "") + '</div><h3>' + escapeHtml(row.title) + '</h3><p class="session-meta">'
    + stats + '</p></div>' + (row.done ? '<button type="button" class="btn btn-sm session-reopen" data-reopen="' + safeId + '">Reabrir</button>'
      : '<button type="button" class="btn btn-primary btn-sm" data-log="' + safeId + '">Registrar</button>') + '</div>'
    + (row.description ? '<p class="session-description">' + escapeHtml(row.description) + '</p>' : '')
    + (row.mock ? '<div class="session-topics"><button type="button" class="text-link" data-open-tab="biblioteca">Abrir provas e gabaritos</button><button type="button" class="text-link" data-open-tab="warroom">Calcular a nota ponderada</button></div>' : "")
    + (topics.length ? '<details class="session-topic-details"><summary>Tópicos da sessão (' + topics.length + ')</summary><div class="session-topics">' + topics.map(topic => '<button type="button" class="text-link" data-study-topic="'
      + escapeHtml(topic.id) + '">' + escapeHtml(topic.title.replace(/^\d+[a-z]?\.\s*/, "")) + '</button>').join("") + '</div></details>' : "")
    + '<details data-session-details="' + safeId + '"><summary>' + (row.done ? "Editar registro ou data" : "Detalhes e reagendamento")
    + '</summary><form class="session-log" data-id="' + safeId + '"><label>Minutos feitos<input type="number" name="minutes" min="1" max="600" value="'
    + actualMinutes + '" required></label><label>Questões feitas<input type="number" name="questions" min="0" max="300" value="'
    + actualQuestions + '" required></label><label>Acertos<input type="number" name="right" min="0" max="'
    + actualQuestions + '" value="' + (hasRecord || !actualQuestions ? row.right : "") + '" placeholder="0" required></label><button class="btn btn-primary btn-sm">Salvar registro</button></form>'
    + '<form class="session-move" data-id="' + safeId + '"><label>Data da sessão<input type="date" name="date" min="'
    + STUDY_START + '" max="' + STUDY_END + '" value="' + row.date + '" required></label><button class="btn btn-sm">Mover sessão</button></form></details></article>';
}

function renderAgendaDay(rows) {
  const day = rows.filter(row => row.date === agendaDate);
  const events = agendaOfficialEvents(agendaDate);
  const stats = countStats(day);
  document.getElementById("dayTitle").textContent = titleCase(longDateFormat.format(civilDate(agendaDate)));
  document.getElementById("daySummary").textContent = day.length
    ? stats.done + " de " + day.length + (day.length === 1 ? " sessão concluída" : " sessões concluídas") + " · " + durationLabel(stats.minutes) + " de estudo"
    : (agendaDate === EXAM_DAY ? "Dia da prova" : "Sem sessões planejadas");
  const eventMarkup = events.map(event => '<div class="agenda-official"><strong>' + escapeHtml(event.title)
    + '</strong> · ' + escapeHtml(event.desc) + '</div>').join("");
  let content = day.map(sessionMarkup).join("");
  const rest = weekMetadata(agendaDate)?.exceptions.find(item => item.date === agendaDate && item.type === "rest-and-logistics");
  if (!content && !eventMarkup) content = '<div class="agenda-empty">' + (rest
    ? escapeHtml(rest.note) : "Selecione outro dia para consultar as sessões ou mova uma sessão pendente para esta data.") + '</div>';
  document.getElementById("daySessions").innerHTML = eventMarkup + content;
  document.getElementById("agendaFeedback").textContent = agendaStatus;
}

function renderAgendaRail(rows, settings) {
  const first = weekStart(agendaDate);
  const last = shiftDate(first, 6);
  const weekRows = rows.filter(row => row.date >= first && row.date <= last);
  const week = countStats(weekRows);
  const overall = countStats(rows);
  const covered = TOPICS_DATA.filter(topic => state.topics[topic.id]?.theory).length;
  document.getElementById("weekProgressPeriod").textContent = dateRange(first, last);
  document.getElementById("weekMetrics").innerHTML =
    agendaMetric("Tempo", week.actualMinutes, week.minutes, durationLabel(week.actualMinutes) + " / " + durationLabel(week.minutes))
    + agendaMetric("Questões", week.actualQuestions, week.questions, week.actualQuestions + " / " + week.questions)
    + agendaMetric("Sessões", week.done, weekRows.length, week.done + " / " + weekRows.length);
  document.getElementById("overallMetrics").innerHTML =
    agendaMetric("Sessões registradas", overall.done, rows.length, overall.done + " / " + rows.length)
    + agendaMetric("Teoria no edital", covered, TOPICS_DATA.length, covered + " / " + TOPICS_DATA.length)
    + agendaMetric("Acertos na agenda", overall.right, overall.actualQuestions, overall.actualQuestions
      ? metricsNumber.format(100 * overall.right / overall.actualQuestions) + "% (" + overall.right + "/" + overall.actualQuestions + ")" : "—");
  document.getElementById("weeklyHours").value = settings.weeklyHours;
  document.getElementById("weeklyQuestions").value = settings.weeklyQuestions;
  const today = todayInSaoPaulo();
  const next = EDITAL_FACTS.timeline.filter(event => event.date >= today
    && (event.exam || /Inscrições e envio|Pagamento da taxa|Horário e local|Cartão de Informação do Candidato/.test(event.title)))
    .sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3);
  document.getElementById("nextDeadlines").innerHTML = next.map(event =>
    '<div class="deadline"><time datetime="' + event.date + '">' + event.date.slice(8) + "/" + event.date.slice(5, 7)
      + '</time><span>' + escapeHtml(event.title) + '</span></div>').join("")
    || '<p class="session-meta">Consulte as últimas publicações da banca.</p>';
}

function renderAgenda() {
  const settings = agendaSettings();
  const rows = agendaRows(settings);
  renderCalendar(rows);
  renderAgendaDay(rows);
  renderAgendaRail(rows, settings);
  document.getElementById("studyPlan").innerHTML = STUDY_AGENDA_DATA.weeks.map(week => {
    const scheduled = rows.filter(row => row.date >= week.start && row.date <= week.end);
    const stats = countStats(scheduled);
    return '<article class="plan-week"><div><button type="button" class="text-link" data-plan-week="' + week.start + '">'
      + week.number + ' · ' + escapeHtml(week.label) + '</button><p>' + escapeHtml(week.focus) + '</p></div><div class="plan-meta"><span>'
      + dateRange(week.start, week.end) + '</span><span>' + durationLabel(stats.minutes) + ' · ' + stats.done + '/'
      + scheduled.length + ' sessões</span></div></article>';
  }).join("");
}

function saveSessionChange(id, changes, feedback) {
  const settings = agendaSettings();
  settings.sessions = { ...settings.sessions, [id]: { ...settings.sessions[id], ...changes } };
  state.agenda = settings;
  agendaStatus = feedback;
  saveState();
  renderAgenda();
}

function searchFold(value) {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function renderLibrary() {
  const term = searchFold(document.getElementById("librarySearch").value.trim());
  const group = document.getElementById("libraryGroup");
  const groups = [...new Set(LIBRARY_DATA.map(item => item.group))];
  const selection = group.value;
  if (group.options.length === 1) {
    group.insertAdjacentHTML("beforeend", groups.map(name => '<option>' + escapeHtml(name) + '</option>').join(""));
  }
  const visible = LIBRARY_DATA.filter(item => (!selection || item.group === selection)
    && searchFold([item.group, item.title, item.description, item.type].join(" ")).includes(term));
  document.getElementById("libraryResults").innerHTML = groups.map(name => {
    const items = visible.filter(item => item.group === name);
    if (!items.length) return "";
    return '<section class="library-group"><h2>' + escapeHtml(name) + '</h2>' + items.map(item =>
      '<article class="resource"><div><a href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">'
        + escapeHtml(item.title) + '</a><p>' + escapeHtml(item.description) + '</p></div><span class="resource-type">'
        + escapeHtml(item.type) + '</span></article>').join("") + '</section>';
  }).join("") || '<p class="section-desc">Nenhum material corresponde a essa busca. Tente o nome da disciplina ou um termo mais curto.</p>';
}

function installAgenda() {
  TOPICS_DATA.forEach(topic => studyTopics.set(topic.id, topic));
  document.getElementById("calendarGrid").addEventListener("click", event => {
    const target = event.target.closest("[data-date]");
    if (!target) return;
    agendaDate = target.dataset.date;
    renderAgenda();
    document.querySelector('[data-date="' + agendaDate + '"]')?.focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-calendar-view]").forEach(button => button.addEventListener("click", () => {
    agendaView = button.dataset.calendarView;
    agendaDate = scheduleDate(agendaDate);
    renderAgenda();
  }));
  [[-1, "prevPeriod"], [1, "nextPeriod"]].forEach(([amount, id]) => {
    document.getElementById(id).addEventListener("click", () => {
      const date = agendaPeriodDelta(amount);
      if (!canNavigate(date)) return;
      agendaDate = scheduleDate(date);
      renderAgenda();
    });
  });
  document.getElementById("agendaToday").addEventListener("click", () => {
    agendaDate = agendaInitialDate();
    renderAgenda();
  });
  document.getElementById("studyPlan").addEventListener("click", event => {
    const button = event.target.closest("[data-plan-week]");
    if (!button) return;
    agendaView = "week";
    agendaDate = button.dataset.planWeek;
    renderAgenda();
    const selected = document.querySelector('.calendar-day[aria-pressed="true"]');
    selected.focus();
    selected.scrollIntoView({ block: "center" });
  });
  document.getElementById("agendaPreferences").addEventListener("submit", event => {
    event.preventDefault();
    const fields = new FormData(event.target);
    state.agenda = {
      ...agendaSettings(),
      weeklyHours: Number(fields.get("hours")),
      weeklyQuestions: Number(fields.get("questions"))
    };
    agendaStatus = "Metas atualizadas.";
    saveState();
    renderAgenda();
  });
  const sessionList = document.getElementById("daySessions");
  sessionList.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.log) {
      const details = button.closest(".session").querySelector(".session-log").closest("details");
      details.open = true;
      details.querySelector("input").focus();
    }
    if (button.dataset.reopen) {
      const id = button.dataset.reopen;
      saveSessionChange(id, { done: false }, "Sessão reaberta.");
      sessionList.querySelector('[data-log="' + id + '"]')?.focus();
    }
    if (button.dataset.studyTopic) {
      const topic = studyTopics.get(button.dataset.studyTopic);
      document.getElementById("filterSearch").value = topic.title;
      document.getElementById("filterDisc").selectedIndex = 0;
      document.getElementById("filterPrio").selectedIndex = 0;
      document.getElementById("filterStatus").selectedIndex = 0;
      renderTopics();
      openTab("edital", true);
    }
  });
  sessionList.addEventListener("input", event => {
    if (event.target.name !== "questions") return;
    event.target.form.elements.right.max = event.target.value || "0";
  });
  sessionList.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.target;
    const fields = new FormData(form);
    const id = form.dataset.id;
    if (form.classList.contains("session-move")) {
      const date = fields.get("date");
      if (!validStudyDate(date)) return;
      agendaDate = date;
      saveSessionChange(id, { date }, "Sessão movida.");
      document.getElementById("dayTitle").setAttribute("tabindex", "-1");
      document.getElementById("dayTitle").focus();
      return;
    }
    const minutes = Number(fields.get("minutes"));
    const questions = Number(fields.get("questions"));
    const right = Number(fields.get("right"));
    if (right > questions) return;
    saveSessionChange(id, { done: true, minutes, questions, right }, "Sessão registrada.");
    sessionList.querySelector('[data-reopen="' + id + '"]')?.focus();
  });
  document.getElementById("librarySearch").addEventListener("input", renderLibrary);
  document.getElementById("libraryGroup").addEventListener("change", renderLibrary);
  renderLibrary();
}
