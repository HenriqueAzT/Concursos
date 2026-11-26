// Dados conferidos no Edital de Abertura IFG nº 001/2026 (PDF local, 42 páginas).
// Sem retificação de abertura identificada até 25/11/2026.
// Fontes públicas institucionais: https://ifg.edu.br/comunicados-campus-formosa/17-ifg/ultimas-noticias/48575-ifg-publica-edital-de-concurso-com-36-vagas-e-vencimentos-de-ate-r-5-2-mil
// Página do concurso AOCP: https://www.institutoaocp.org.br/concursos/724
const EDITAL_FACTS = {
  checkedAt: "2026-11-25",
  sources: [
    "E:/Concursos/ConcursoIFG/edital.pdf (Edital nº 001/2026, Anexo I e itens 2, 5, 8, 11, 12, 14, pp. 1-4, 14-17, 22-23, 36-37)",
    "https://ifg.edu.br/comunicados-campus-formosa/17-ifg/ultimas-noticias/48575-ifg-publica-edital-de-concurso-com-36-vagas-e-vencimentos-de-ate-r-5-2-mil",
    "https://www.institutoaocp.org.br/concursos/724",
    "https://noticias.institutoaocp.org.br/blog/ifg-abre-inscricoes-de-concurso-publico-para-diversas-areas/"
  ],
  timeline: [
    { date: "2026-11-16", label: "16/11/2026", title: "Publicação do Edital de Abertura nº 001/2026", desc: "Publicado no Diário Oficial da União; legislação do conteúdo programático é a vigente nesta data." },
    { date: "2026-11-18", start: "2026-11-17", label: "17 e 18/11/2026", title: "Impugnação do edital", desc: "Período previsto no Anexo I." },
    { date: "2026-11-23", label: "23/11/2026", title: "Respostas às impugnações", desc: "Acompanhar os comunicados e eventual retificação na página da AOCP." },
    { date: "2026-11-25", start: "2026-11-24", label: "24/11 (9h) a 25/11/2026 (16h)", title: "Solicitação de isenção da taxa", desc: "CadÚnico com renda per capita até meio salário mínimo ou doador de medula óssea. Documentos: até 17h de 25/11. Prazo encerrado na data desta checagem.", urgent: true },
    { date: "2026-12-04", label: "04/12/2026", title: "Resultado preliminar dos pedidos de isenção", desc: "Conferir a publicação da AOCP." },
    { date: "2026-12-08", start: "2026-12-07", label: "07 e 08/12/2026", title: "Recurso contra indeferimento da isenção", desc: "Janela recursal: 00h de 07/12 a 23h59 de 08/12." },
    { date: "2026-12-14", label: "14/12/2026", title: "Resultado dos recursos de isenção", desc: "Deferimento pós-recurso." },
    { date: "2026-12-23", start: "2026-11-24", label: "24/11 (9h) a 23/12/2026 (23h59)", title: "Inscrições e envio de laudos", desc: "Inscrição, laudo para concorrer como PcD e documentação para condição especial encerram às 23h59 de 23/12." , urgent: true },
    { date: "2026-12-24", start: "2026-11-24", label: "24/11 a 24/12/2026", title: "Pagamento da taxa e 2ª via do boleto", desc: "Pagamento até 24/12 conforme horário de compensação bancária; segunda via disponível até 17h de 24/12." },
    { date: "2027-01-06", label: "06/01/2027", title: "Deferimento das inscrições", desc: "Publicação das listas de ampla concorrência, PcD, pessoas pretas e pardas, indígenas e quilombolas." },
    { date: "2027-01-08", start: "2027-01-07", label: "07 e 08/01/2027", title: "Recurso contra indeferimento da inscrição", desc: "Janela recursal: 00h de 07/01 a 23h59 de 08/01." },
    { date: "2027-01-15", label: "15/01/2027", title: "Deferimento das inscrições pós-recurso", desc: "Resultado após análise dos recursos." },
    { date: "2027-01-22", label: "22/01/2027", title: "Horário e local da prova", desc: "A banca publica edital com turno e local; o horário da prova ainda não está especificado no edital de abertura." },
    { date: "2027-02-09", label: "09/02/2027", title: "Cartão de Informação do Candidato", desc: "Emitir o cartão com o local de prova." },
    { date: "2027-02-14", label: "14/02/2027", title: "Prova objetiva", desc: "50 questões, 4 horas; prova eliminatória e classificatória.", exam: true },
    { date: "2027-02-15", label: "15/02/2027", title: "Gabarito preliminar e cadernos de questões", desc: "Publicação prevista no Anexo I." },
    { date: "2027-02-17", start: "2027-02-16", label: "16 e 17/02/2027", title: "Recurso contra gabarito preliminar", desc: "Janela recursal: 00h de 16/02 a 23h59 de 17/02." },
    { date: "2027-03-24", label: "24/03/2027", title: "Gabarito pós-recursos e resultado preliminar da prova", desc: "Inclui pareceres de recursos deferidos e folhas de resposta. Recurso contra o resultado em 25 e 26/03." },
    { date: "2027-03-26", start: "2027-03-25", label: "25 e 26/03/2027", title: "Recurso contra resultado preliminar da prova objetiva", desc: "Janela recursal: 00h de 25/03 a 23h59 de 26/03." },
    { date: "2027-04-07", label: "07/04/2027", title: "Resultado da objetiva pós-recursos e convocações PcD/PPIQ", desc: "Publicação do gabarito definitivo e convocações para avaliação biopsicossocial e procedimentos de confirmação." },
    { date: "2027-04-12", label: "12/04/2027", title: "Cartão de informação PcD/PPIQ", desc: "Conferir local e horário das etapas presenciais." },
    { date: "2027-04-18", start: "2027-04-17", label: "17 e 18/04/2027", title: "Avaliação biopsicossocial e confirmação PPIQ", desc: "Etapas presenciais previstas em Goiânia/GO." },
    { date: "2027-04-28", label: "28/04/2027", title: "Resultados preliminares PcD e PPIQ", desc: "Recursos contra ambos os resultados: 29 e 30/04." },
    { date: "2027-04-30", start: "2027-04-29", label: "29 e 30/04/2027", title: "Recursos contra resultados PcD e PPIQ", desc: "Janela recursal: 00h de 29/04 a 23h59 de 30/04." },
    { date: "2027-05-04", label: "04/05/2027", title: "Resultado PcD pós-recurso", desc: "Parecer dos recursos e resultado definitivo da avaliação biopsicossocial." },
    { date: "2027-05-07", label: "07/05/2027", title: "Resultado PPIQ pós-recurso", desc: "Parecer dos recursos e resultado definitivo do procedimento de confirmação." },
    { date: "2027-05-12", label: "12/05/2027", title: "Resultado preliminar e classificação", desc: "Resultado preliminar final do concurso; recursos em 13 e 14/05." },
    { date: "2027-05-14", start: "2027-05-13", label: "13 e 14/05/2027", title: "Recurso contra resultado e classificação", desc: "Janela recursal: 00h de 13/05 a 23h59 de 14/05." },
    { date: "2027-05-19", label: "19/05/2027", title: "Resultado final e homologação", desc: "Data prevista para publicação pós-recurso e homologação." }
  ],
  notices: [
    { title: "Requisito de formação: Analista de TI, código 401", text: "A tabela do edital exige exatamente “Curso Superior em Informática”, devidamente registrado e fornecido por instituição reconhecida pelo MEC. O requisito não cita Sistemas de Informação nominalmente. Para confirmar o enquadramento do seu diploma, consulte candidato@institutoaocp.org.br ou o IFG antes de contar com a vaga. Carga horária: 40h; lotação: Reitoria, Goiânia; vencimento básico: R$ 5.215,39." },
    { title: "Vagas e modalidade reservada", text: "O quadro do código 401 oferta 2 vagas totais na Reitoria, ambas na coluna PPP (pessoas pretas e pardas), sem vaga inicial em ampla concorrência, PcD, indígenas ou quilombolas. O edital diz que a distribuição das reservas decorreu de sorteio público em 15/10/2026 (item 2.1)." },
    { title: "Habilitação e pontuação", text: "Prova objetiva de 50 itens, cinco alternativas, 4 horas. Específicos de TI: 20 questões, peso 3, máximo 60 pontos, mínimo 39. Português: 10, peso 2, máximo 20, mínimo 12. Legislação: 10, peso 1, máximo 10, mínimo 5. Raciocínio Lógico e Matemática: 5, peso 1, máximo 5, mínimo 2. Informática: 5, peso 1, máximo 5, mínimo 2. Exige ao menos 60 pontos totais e mínimos de todas as disciplinas; nota final é a nota objetiva. O edital não prevê discursiva nem títulos." },
    { title: "Desempate", text: "Ordem do item 14.3: (1) idade ≥60 anos; (2) maior nota em específicos; (3) Português; (4) Legislação; (5) Informática; (6) Raciocínio Lógico e Matemática; (7) jurado; (8) maior idade, com data e hora do nascimento se preciso; (9) inscrição registrada primeiro, com data e hora." },
    { title: "Listas e limite de aprovados", text: "O resultado é publicado em cinco listas: geral, PcD, pessoas pretas e pardas, indígenas e quilombolas. Para um cargo/câmpus com 2 vagas, o limite é de até 9 aprovados por lista, aplicado autonomamente à ampla concorrência e a cada lista reservada; candidatos fora do limite são reprovados mesmo se atingirem a nota mínima, ressalvado empate na última posição. A nomeação depende do provimento das vagas." },
    { title: "Remanejamento e reversão das reservas", text: "Na fase de provimento após homologação, vaga PPIQ não provida segue a ordem quilombola → indígena; indígena → quilombola; vaga indígena/quilombola → pessoas pretas e pardas; se não houver candidatos PPIQ, reverte à ampla concorrência; se não houver ampla concorrência, reverte a PPIQ (item 8.4.1). A reversão ocorre só para provimento e não altera listas nem limite de aprovados. Para PcD, se não houver candidato aprovado na lista PcD para a vaga reservada, a vaga reverte à ampla concorrência (item 7.15)." },
    { title: "Horário de prova ainda pendente", text: "O edital de abertura informa data, duração e cidades possíveis, mas não o turno. O edital de horário e local está previsto para 22/01/2027; conferir também o Cartão de Informação em 09/02/2027. A banca pode usar cidade vizinha caso exceda a capacidade local." }

  ]
};
