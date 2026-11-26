import { DEFAULT_STATE, DISC_META, TOPICS_DATA } from "./data/conteudo.js";
import { EDITAL_FACTS } from "./data/edital.js";
import { STUDY_AGENDA_DATA } from "./data/plano.js";

export const EXAM_DAY = STUDY_AGENDA_DATA.exam.date;
export const STUDY_START = STUDY_AGENDA_DATA.weeks[0].start;
export const STUDY_END = STUDY_AGENDA_DATA.weeks.at(-1).end;
const AGENDA_DEFAULT = DEFAULT_STATE.agenda;
const saoPauloDate = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "America/Sao_Paulo", year: "numeric", month: "2-digit", day: "2-digit"
});
export const longDateFormat = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC", weekday: "long", day: "numeric", month: "long"
});
export const monthFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", month: "long", year: "numeric" });
const shortDateFormat = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "numeric", month: "short" });
export const studyTopics = new Map(TOPICS_DATA.map(topic => [topic.id, topic]));
const weekdays = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export function civilDate(iso) {
  return new Date(iso + "T00:00:00Z");
}

export function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

export function shiftDate(iso, amount) {
  const date = civilDate(iso);
  date.setUTCDate(date.getUTCDate() + amount);
  return isoDate(date);
}

export function weekStart(iso) {
  return shiftDate(iso, -civilDate(iso).getUTCDay());
}

export function todayInSaoPaulo() {
  return saoPauloDate.format(new Date());
}

export function agendaInitialDate() {
  return [STUDY_START, todayInSaoPaulo(), EXAM_DAY].sort()[1];
}

export function durationLabel(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return [hours ? hours + " h" : "", remainder || !hours ? remainder + " min" : ""].filter(Boolean).join(" ");
}

export function titleCase(text) {
  return text.charAt(0).toLocaleUpperCase("pt-BR") + text.slice(1);
}

export function dateRange(first, last) {
  const label = shortDateFormat.format(civilDate(first));
  return first === last ? label : label + " a " + shortDateFormat.format(civilDate(last));
}

function boundedNumber(value, fallback, min, max) {
  const number = Number(value);
  return value != null && Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
}

export function validStudyDate(value) {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && value >= STUDY_START && value <= STUDY_END && !Number.isNaN(civilDate(value).getTime())
    && isoDate(civilDate(value)) === value;
}

export function agendaSettings(stored = {}) {
  stored ||= {};
  return {
    weeklyHours: boundedNumber(stored.weeklyHours, AGENDA_DEFAULT.weeklyHours, 8, 10),
    weeklyQuestions: Math.round(boundedNumber(stored.weeklyQuestions, AGENDA_DEFAULT.weeklyQuestions, 5, 300)),
    sessions: stored.sessions && typeof stored.sessions === "object" && !Array.isArray(stored.sessions) ? stored.sessions : {}
  };
}

export function agendaRows(settings) {
  return STUDY_AGENDA_DATA.weeks.flatMap(week => {
    const full = week.exceptions.find(item => item.type === "full-mock");
    const half = week.diagnostics?.find(item => item.type === "timed-half-mock");
    const fixedMock = full || half;
    const base = week.sessions.map((session, i) => {
      const date = session.date || shiftDate(week.start, weekdays.indexOf(session.day));
      return { ...session, id: session.id ?? "w" + week.number + "-" + (i + 1), date, mock: date === fixedMock?.date ? fixedMock : null };
    });
    const ordinary = base.filter(session => !session.mock);
    const minutes = ordinary.reduce((sum, session) => sum + session.minutes, 0);
    const questions = ordinary.reduce((sum, session) => sum + session.questions, 0);
    const opening = week.phase === "diagnostico";
    const targetMinutes = full || opening || week.phase === "taper"
      ? minutes : Math.round(minutes * settings.weeklyHours / AGENDA_DEFAULT.weeklyHours);
    const targetQuestions = opening ? questions : Math.round(questions * settings.weeklyQuestions / AGENDA_DEFAULT.weeklyQuestions);
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
          : session.description ?? (revision ? "Recupere os pontos fracos de memória e confira as respostas no caderno de erros."
            : "Comece pela revisão pendente, pratique com questões e corrija os erros."),
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

export function countStats(rows) {
  return rows.reduce((total, row) => ({
    minutes: total.minutes + row.minutes,
    questions: total.questions + row.questions,
    done: total.done + Number(row.done),
    actualMinutes: total.actualMinutes + (row.done ? row.actualMinutes : 0),
    actualQuestions: total.actualQuestions + (row.done ? row.actualQuestions : 0),
    right: total.right + (row.done ? row.right : 0)
  }), { minutes: 0, questions: 0, done: 0, actualMinutes: 0, actualQuestions: 0, right: 0 });
}

export function weekMetadata(date) {
  const start = weekStart(date);
  return STUDY_AGENDA_DATA.weeks.find(week => weekStart(week.start) === start);
}

export function shiftMonth(iso, amount) {
  const date = civilDate(iso.slice(0, 7) + "-01");
  date.setUTCMonth(date.getUTCMonth() + amount);
  return isoDate(date);
}

export function agendaPeriodDelta(agendaDate, agendaView, amount) {
  if (agendaView === "week") return shiftDate(weekStart(agendaDate), amount * 7);
  return shiftMonth(agendaDate, amount);
}

export function canNavigate(date, agendaView) {
  if (agendaView === "week") return date >= weekStart(STUDY_START) && date <= weekStart(EXAM_DAY);
  return date.slice(0, 7) >= STUDY_START.slice(0, 7) && date.slice(0, 7) <= EXAM_DAY.slice(0, 7);
}

export function scheduleDate(date) {
  return [STUDY_START, date, EXAM_DAY].sort()[1];
}

export function agendaOfficialEvents(date) {
  return EDITAL_FACTS.timeline.filter(event => event.date === date || (event.start === date && event.start >= STUDY_START));
}
