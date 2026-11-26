/*
 * Study calendar source data for painel-aprovacao-ifg-2026.html.
 * Browser independent: plain data only; no DOM, dates are ISO local dates.
 * Topic IDs are the IDs currently declared in TOPICS_DATA.
 */
const STUDY_AGENDA_DATA = {
  version: 1,
  timezone: "America/Sao_Paulo",
  exam: { date: "2027-02-14", durationMinutes: 240, format: "50 questões; 4 horas" },
  baseline: {
    weeklyMinutes: 480,
    weeklyQuestions: 30,
    days: "Domingo a sexta: 60 min/dia; sábado: 120 min",
    questionMix: { TI: 12, PORT: 6, LEG: 6, RLM: 3, INF: 3 },
    weightedMinutes: { TI: 270, PORT: 90, LEG: 60, RLM: 30, INF: 30 },
    method: "Estudo ativo, questões corrigidas e registro breve dos erros; revisões espaçadas 24h/7d/30d."
  },
  subjectNames: {
    TI: "Conhecimentos específicos de TI",
    PORT: "Língua Portuguesa",
    LEG: "Legislação",
    RLM: "Raciocínio Lógico e Matemática",
    INF: "Informática"
  },
  questionDistributionOfficial: {
    TI: { questions: 20, points: 60, minimumPoints: 39 },
    PORT: { questions: 10, points: 20, minimumPoints: 12 },
    LEG: { questions: 10, points: 10, minimumPoints: 5 },
    RLM: { questions: 5, points: 5, minimumPoints: 2 },
    INF: { questions: 5, points: 5, minimumPoints: 2 },
    total: { questions: 50, points: 100, minimumPoints: 60 }
  },
  schedulingNotes: [
    "Plano começa em 25/11/2026; a primeira semana é parcial (5 horas disponíveis: qua-sex 1h/dia e sáb 2h).",
    "Semanas regulares seguem domingo-sábado e 8 horas-base. Dois simulados integrais de 4h são eventos excepcionais de sábado: cada um substitui as 2h regulares do sábado e acrescenta somente 2h, totalizando 10h naquela semana (limite confirmado).",
    "A semana final é reduzida para 6 horas, encerra o estudo pesado na sexta 12/02 e reserva sábado 13/02 para descanso/logística. A prova está marcada para domingo 14/02/2027.",
    "Metas semanais de questões são metas de treino além de simulados; nos simulados, priorize a prova completa e a análise de erros, sem tentar cumprir volume artificial."
  ],
  weeks: [
    {
      number: 1, start: "2026-11-25", end: "2026-11-28", label: "Diagnóstico e base inicial", phase: "diagnostico",
      plannedMinutes: 300, targetQuestions: 30,
      topicIds: ["ti-02", "ti-07", "ti-13a", "port-01", "leg-01", "leg-02", "rlm-01", "inf-01", "inf-02"],
      focus: "Diagnóstico inicial; Engenharia de Software, Git, fundamentos de SQL; interpretação, Constituição/Lei 8.112, lógica, Windows e fundamentos de informática.",
      sessions: [
        { date: "2026-11-25", minutes: 60, subjects: ["TI"], topicIds: ["ti-02", "ti-07"], questions: 3, activity: "Diagnóstico curto + processos de software e Git" },
        { date: "2026-11-26", minutes: 60, subjects: ["TI"], topicIds: ["ti-13a"], questions: 3, activity: "SQL diagnóstico: SELECT, filtros e agregações" },
        { date: "2026-11-27", minutes: 60, subjects: ["PORT", "LEG"], topicIds: ["port-01", "leg-01", "leg-02"], questions: 12, activity: "Interpretação (6 questões) + legislação (6 questões)" },
        { date: "2026-11-28", minutes: 120, subjects: ["TI", "RLM", "INF"], topicIds: ["ti-02", "ti-07", "ti-13a", "rlm-01", "inf-01", "inf-02"], questions: 12, activity: "Fechamento do diagnóstico: TI, lógica e informática" }
      ],
      diagnostics: [{ date: "2026-11-28", type: "baseline", questions: 30, minutes: 60, subjectMix: { TI: 12, PORT: 6, LEG: 6, RLM: 3, INF: 3 }, note: "Distribuídas pelas quatro sessões da semana conforme as metas de questões; registrar acertos por disciplina, sem pressão de tempo." }],
      exceptions: []
    },
    {
      number: 2, start: "2026-11-29", end: "2026-12-05", label: "Engenharia, lógica e dados", phase: "base",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-03a", "ti-13b", "ti-14a", "port-04", "leg-03"],
      focus: "Padrões de projeto; normalização, transações e concorrência; sistemas operacionais; morfossintaxe e ética pública.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-03a"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-13b"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-04"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-14a"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-03"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-03a", "ti-13b"], questions: 3 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-03a", "ti-13b", "port-04"], questions: 6, activity: "Bloco duplo: questões, revisão 24h e caderno de erros" }
      ], exceptions: []
    },
    {
      number: 3, start: "2026-12-06", end: "2026-12-12", label: "Web, requisitos e legislação educacional", phase: "base",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-03c", "ti-04", "ti-08", "ti-14c", "port-05", "leg-04", "leg-05", "leg-06", "inf-03"],
      focus: "UML/Scrum, requisitos, contêineres, infraestrutura; sintaxe e coesão; LDB, Institutos Federais e PCCTAE; Office.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-03c", "ti-04"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-08", "ti-14c"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-05"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-03c", "ti-04"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-04", "leg-05", "leg-06"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-08", "ti-14c"], questions: 3 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-03c", "ti-04", "inf-03"], questions: 6 }
      ], exceptions: []
    },
    {
      number: 4, start: "2026-12-13", end: "2026-12-19", label: "Testes, linguagens e pontuação", phase: "base",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-05", "ti-10b", "ti-10c", "ti-17", "port-06", "leg-07", "leg-08", "rlm-02"],
      focus: "TDD e testes; linguagens e infraestrutura; concordância, regência e crase; transparência, LGPD; contagem e probabilidade.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-05", "ti-10b"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-10c", "ti-17"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-06"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-05", "ti-10b"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-07", "leg-08"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-10c", "ti-17"], questions: 9 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-05", "port-06", "rlm-02"], questions: 0, activity: "Bloco substituído pelo diagnóstico cronometrado de meia prova." }
      ],
      diagnostics: [{ date: "2026-12-19", type: "timed-half-mock", questions: 25, minutes: 120, replacesRegularMinutes: 120, extraMinutes: 0, note: "Meia prova cronometrada em 2h substitui o bloco regular de sábado; conferir equilíbrio entre matérias e manter o caderno de erros." }],
      exceptions: []
    },
    {
      number: 5, start: "2026-12-20", end: "2026-12-26", label: "Aplicações web, arquitetura e processo administrativo", phase: "base",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-03b", "ti-09", "ti-10a", "ti-13c", "port-07", "leg-10", "inf-04"],
      focus: "DevOps/DevSecOps, aplicações web, PHP, SQL e SGBDs; pronomes e pontuação; processo administrativo; LibreOffice.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-03b", "ti-09"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-10a", "ti-13c"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-07"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-03b", "ti-09"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-10"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-10a", "ti-13c"], questions: 3 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-03b", "port-07", "inf-04"], questions: 6 }
      ], exceptions: []
    },
    {
      number: 6, start: "2026-12-27", end: "2027-01-02", label: "Hardware, sistemas e licitações", phase: "base",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-01", "ti-14b", "ti-18a", "port-02", "port-03", "leg-09", "rlm-03"],
      focus: "Hardware e sistemas; semântica/morfologia; Lei 14.133; proporção e matemática aplicada. Reforço dos conteúdos fracos do primeiro simulado.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-01", "ti-14b"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-18a"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-02", "port-03"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-01", "ti-14b"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-09"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-18a"], questions: 3 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-01", "port-02", "rlm-03"], questions: 6 }
      ], exceptions: []
    },
    {
      number: 7, start: "2027-01-03", end: "2027-01-09", label: "Mensageria, formatos e conjuntos", phase: "fechamento",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-06", "ti-11", "ti-18b", "rlm-04", "rlm-05"],
      focus: "Mensageria, formatos e armazenamento; conjuntos e geometria; recuperação das leis e tópicos de português estudados.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-06"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-11", "ti-18b"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-01", "port-04"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-06", "ti-11"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-01", "leg-02", "leg-03"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-18b"], questions: 3 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-06", "rlm-04", "rlm-05"], questions: 6 }
      ], exceptions: []
    },
    {
      number: 8, start: "2027-01-10", end: "2027-01-16", label: "Banco de dados, nuvem e revisão intermediária", phase: "fechamento",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-13d", "ti-15", "ti-16", "port-01", "leg-11", "inf-05"],
      focus: "Banco de dados avançado/BI, nuvem e serviços; improbidade; proteção web. Diagnóstico intermediário por disciplina e revisão do caderno de erros.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-13d", "ti-15"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-16"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-01", "port-05"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-13d", "ti-15"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-11"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI", "INF"], topicIds: ["ti-16", "inf-05"], questions: 9, activity: "Apache/NGINX e segurança na navegação" },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-13d", "inf-05"], questions: 0, activity: "Bloco regular substituído pelo simulado integral de 4h (2h core + 2h extra)." }
      ],
      exceptions: [{ date: "2027-01-16", type: "full-mock", minutes: 240, questions: 50, replacesRegularMinutes: 120, extraMinutes: 120, weeklyTotalMinutes: 600, format: "Simulado integral cronometrado: 50 questões/4h. Substitui as 2h regulares do sábado e acrescenta 2h; total semanal 10h, dentro do teto confirmado." }]
    },
    {
      number: 9, start: "2027-01-17", end: "2027-01-23", label: "Fechamento de IA e revisão integrada", phase: "fechamento",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-12"],
      focus: "Inteligência artificial e aprendizado de máquina. Revisar todos os módulos anteriores, com foco em questões erradas e matérias com menor acerto.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-12"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-12"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-01", "port-02", "port-03", "port-04", "port-05", "port-06", "port-07"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-12", "ti-13a", "ti-13b", "ti-13c", "ti-13d"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-01", "leg-02", "leg-03", "leg-04", "leg-05", "leg-06", "leg-07", "leg-08", "leg-09", "leg-10", "leg-11"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-12"], questions: 3 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-12", "rlm-01", "rlm-02", "rlm-03", "rlm-04", "rlm-05"], questions: 6 }
      ], exceptions: []
    },
    {
      number: 10, start: "2027-01-24", end: "2027-01-30", label: "Revisão cumulativa e precisão", phase: "revisao",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-01", "ti-02", "ti-03a", "ti-03b", "ti-03c", "ti-04", "ti-05", "ti-07", "ti-13a", "ti-13b", "ti-13c", "ti-13d"],
      focus: "Revisão acumulada TI: engenharia, versionamento, banco de dados; Português, leis, RLM e informática conforme o caderno de erros. Sem matéria nova.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-02", "ti-03a", "ti-03b", "ti-03c", "ti-04", "ti-05", "ti-07"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-01", "ti-13a", "ti-13b", "ti-13c", "ti-13d"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-01", "port-04", "port-05", "port-06", "port-07"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-02", "ti-03a", "ti-03b", "ti-03c", "ti-04", "ti-05", "ti-07"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-01", "leg-02", "leg-03", "leg-04", "leg-05", "leg-06", "leg-07", "leg-08", "leg-09", "leg-10", "leg-11"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-01", "ti-13a", "ti-13b", "ti-13c", "ti-13d"], questions: 3 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-01", "ti-02", "ti-03a", "ti-03b", "ti-03c", "ti-04", "ti-05", "ti-07", "ti-13a", "ti-13b", "ti-13c", "ti-13d", "rlm-01", "rlm-02", "rlm-03", "rlm-04", "rlm-05"], questions: 6 }
      ], exceptions: []
    },
    {
      number: 11, start: "2027-01-31", end: "2027-02-06", label: "Simulado final e correção estratégica", phase: "sprint",
      plannedMinutes: 480, targetQuestions: 30,
      topicIds: ["ti-06", "ti-08", "ti-09", "ti-10a", "ti-10b", "ti-10c", "ti-11", "ti-12", "ti-14a", "ti-14b", "ti-14c", "ti-15", "ti-16", "ti-17", "ti-18a", "ti-18b"],
      focus: "Revisão cumulativa de desenvolvimento, sistemas, nuvem e IA; uma última prova integral; corrigir erros sem iniciar assuntos extensos.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-06", "ti-08", "ti-09", "ti-10a", "ti-10b", "ti-10c"], questions: 3 },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-11", "ti-12", "ti-14a", "ti-14b", "ti-14c", "ti-15", "ti-16", "ti-17", "ti-18a", "ti-18b"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-01", "port-02", "port-03", "port-04", "port-05", "port-06", "port-07"], questions: 6 },
        { day: "quarta", minutes: 60, subjects: ["TI"], topicIds: ["ti-06", "ti-08", "ti-09", "ti-10a", "ti-10b", "ti-10c"], questions: 3 },
        { day: "quinta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-01", "leg-02", "leg-03", "leg-04", "leg-05", "leg-06", "leg-07", "leg-08", "leg-09", "leg-10", "leg-11"], questions: 6 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-11", "ti-12", "ti-14a", "ti-14b", "ti-14c", "ti-15", "ti-16", "ti-17", "ti-18a", "ti-18b"], questions: 9 },
        { day: "sábado", minutes: 120, subjects: ["TI", "PORT", "RLM", "INF"], topicIds: ["ti-06", "ti-08", "ti-09", "ti-10a", "ti-10b", "ti-10c", "ti-11", "ti-12", "ti-14a", "ti-14b", "ti-14c", "ti-15", "ti-16", "ti-17", "ti-18a", "ti-18b", "rlm-01", "rlm-02", "rlm-03", "rlm-04", "rlm-05", "inf-01", "inf-02", "inf-03", "inf-04", "inf-05"], questions: 0, activity: "Bloco regular substituído pelo simulado integral de 4h (2h core + 2h extra)." }
      ],
      exceptions: [{ date: "2027-02-06", type: "full-mock", minutes: 240, questions: 50, replacesRegularMinutes: 120, extraMinutes: 120, weeklyTotalMinutes: 600, format: "Último simulado integral cronometrado: 50 questões/4h. Substitui as 2h regulares do sábado e acrescenta 2h; total semanal 10h, dentro do teto confirmado. Corrigir os erros no dia seguinte." }]
    },
    {
      number: 12, start: "2027-02-07", end: "2027-02-13", label: "Revisão leve e véspera", phase: "taper",
      plannedMinutes: 360, targetQuestions: 18,
      topicIds: ["ti-01", "ti-02", "ti-03a", "ti-03b", "ti-03c", "ti-04", "ti-05", "ti-06", "ti-07", "ti-08", "ti-09", "ti-10a", "ti-10b", "ti-10c", "ti-11", "ti-12", "ti-13a", "ti-13b", "ti-13c", "ti-13d", "ti-14a", "ti-14b", "ti-14c", "ti-15", "ti-16", "ti-17", "ti-18a", "ti-18b", "port-01", "port-02", "port-03", "port-04", "port-05", "port-06", "port-07", "leg-01", "leg-02", "leg-03", "leg-04", "leg-05", "leg-06", "leg-07", "leg-08", "leg-09", "leg-10", "leg-11", "rlm-01", "rlm-02", "rlm-03", "rlm-04", "rlm-05", "inf-01", "inf-02", "inf-03", "inf-04", "inf-05"],
      focus: "Revisão curta do caderno de erros, fórmulas, prazos e pontos fracos; nenhuma matéria nova. Sexta encerra o estudo pesado; sábado é descanso e preparação logística.",
      sessions: [
        { day: "domingo", minutes: 60, subjects: ["TI"], topicIds: ["ti-01", "ti-02", "ti-03a", "ti-03b", "ti-03c", "ti-04", "ti-05", "ti-07", "ti-13a", "ti-13b", "ti-13c", "ti-13d"], questions: 3, activity: "Revisão ativa, sem conteúdo novo" },
        { day: "segunda", minutes: 60, subjects: ["TI"], topicIds: ["ti-06", "ti-08", "ti-09", "ti-10a", "ti-10b", "ti-10c", "ti-11", "ti-12", "ti-14a", "ti-14b", "ti-14c", "ti-15", "ti-16", "ti-17", "ti-18a", "ti-18b"], questions: 3 },
        { day: "terça", minutes: 60, subjects: ["PORT"], topicIds: ["port-01", "port-02", "port-03", "port-04", "port-05", "port-06", "port-07"], questions: 4 },
        { day: "quarta", minutes: 60, subjects: ["LEG"], topicIds: ["leg-01", "leg-02", "leg-03", "leg-04", "leg-05", "leg-06", "leg-07", "leg-08", "leg-09", "leg-10", "leg-11"], questions: 4 },
        { day: "quinta", minutes: 60, subjects: ["RLM", "INF"], topicIds: ["rlm-01", "rlm-02", "rlm-03", "rlm-04", "rlm-05", "inf-01", "inf-02", "inf-03", "inf-04", "inf-05"], questions: 4 },
        { day: "sexta", minutes: 60, subjects: ["TI"], topicIds: ["ti-01", "ti-02", "ti-03a", "ti-03b", "ti-03c", "ti-04", "ti-05", "ti-06", "ti-07", "ti-08", "ti-09", "ti-10a", "ti-10b", "ti-10c", "ti-11", "ti-12", "ti-13a", "ti-13b", "ti-13c", "ti-13d", "ti-14a", "ti-14b", "ti-14c", "ti-15", "ti-16", "ti-17", "ti-18a", "ti-18b"], questions: 0, activity: "Leitura leve de resumos; encerrar cedo, dormir bem e preparar materiais" }
      ],
      exceptions: [{ date: "2027-02-13", type: "rest-and-logistics", minutes: 0, note: "Véspera sem estudo programado; separar documento e materiais conforme edital e descansar." }]
    }
  ]
};

if (typeof module !== "undefined" && module.exports) module.exports = STUDY_AGENDA_DATA;
