export function StudyMethod({ openLibrary }) {
  return (
    <>
      <h1 className="page-title">Método de estudo</h1>
      <p className="section-desc">A carga é de 8 a 10 horas por semana. Reserve 1 hora de domingo a sexta e 2 horas no sábado como ponto de partida. A agenda distribui os tópicos e as metas até a prova.</p>
      <div className="grid grid-2">
        <article className="card">
          <h2 className="section-title">Como usar uma sessão</h2>
          <ol className="week-list">
            <li><strong>10 min de recuperação ativa.</strong> Explique o tópico anterior de memória. Confira depois e corrija só o que esqueceu.</li>
            <li><strong>25 min de estudo dirigido.</strong> Leia o trecho da lei ou da documentação e produza um exemplo ou quadro comparativo.</li>
            <li><strong>20 min de questões.</strong> Resolva sem consulta. Justifique por que a alternativa certa está correta e por que sua escolha errada parecia plausível.</li>
            <li><strong>5 min de registro.</strong> Guarde uma regra curta no caderno de erros. Programe retornos em 24 h, 7 e 30 dias quando couberem antes da prova.</li>
          </ol>
          <p className="section-desc">Os intervalos são uma rotina inicial. A evidência favorece testes de prática e estudo distribuído. <a href="https://www.aft.org/sites/default/files/dunlosky_0.pdf" target="_blank" rel="noopener">Revisão de Dunlosky e colegas</a></p>
        </article>
        <article className="card">
          <h2 className="section-title">Como priorizar</h2>
          <ul className="week-list">
            <li>Específicos valem 60 pontos e exigem 13 acertos em 20 questões. Português vale 20 e exige 6 em 10. Preserve tempo para os mínimos de Legislação (5/10), RLM (2/5) e Informática (2/5).</li>
            <li>Use Python, Django e PostgreSQL para encurtar a teoria de temas familiares. Verifique com questões de transações, testes, arquitetura e sintaxe e transfira o tempo ganho para o assunto com mais erros.</li>
            <li>Aos sábados, revise acertos por disciplina e refaça as questões erradas. Se uma disciplina ficou abaixo do mínimo, use a próxima sessão para atacar os dois padrões de erro mais recorrentes.</li>
            <li>Marque os assuntos estudados no edital verticalizado. Os registros de tempo e de questões pertencem à agenda e os totais por assunto podem ser lançados no edital verticalizado.</li>
          </ul>
        </article>
        <article className="card">
          <h2 className="section-title">Treino com a AOCP</h2>
          <ul className="week-list">
            <li>Use o IF-PB 2025 para conhecer a banca e as provas do IFG de 2018 e 2022 para complementar a prática por assunto. O IFG 2022 foi aplicado pelo Instituto Verbena/UFG.</li>
            <li>Use questões inéditas para você em 19/12 (25 questões em 2 h), 16/01 e 06/02 (50 questões em até 4 h). Os dois simulados integrais substituem o bloco do sábado e elevam a semana a 10 h.</li>
            <li>Num simulado completo, conte os acertos nas cinco disciplinas e transfira ao simulador de nota. Na correção, separe lacunas de conteúdo, interpretação, distração e gestão de tempo.</li>
            <li>Reserve tempo para passar o gabarito a limpo. Na semana final, refaça os erros de maior impacto e confira cartão, rota e documentos.</li>
          </ul>
          <button type="button" className="text-link" onClick={openLibrary}>Consultar provas e gabaritos</button>
        </article>
        <article className="card">
          <h2 className="section-title">Materiais por disciplina</h2>
          <ul className="week-list">
            <li><strong>Português.</strong> Use os PDFs locais para interpretação, coesão e gêneros. Treine ortografia, regência, crase e sintaxe com questões comentadas.</li>
            <li><strong>Legislação.</strong> Leia a letra da lei vigente em 16/11/2026 antes da aula. Destaque prazos, exceções, competências e as condições para a regra valer.</li>
            <li><strong>RLM e Informática.</strong> Faça baterias curtas e frequentes. Reproduza aplicações e atalhos nas versões citadas no edital e resolva os cálculos no papel.</li>
            <li><strong>TI.</strong> Alterne engenharia de software, desenvolvimento, dados e infraestrutura. Use as referências da biblioteca para conferir comandos e definições.</li>
          </ul>
        </article>
      </div>
    </>
  );
}
