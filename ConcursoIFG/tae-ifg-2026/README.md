# Painel de estudos IFG

Dashboard para **Analista de Tecnologia da Informação, cód. 401**, do IFG, Edital 001/2026. A prova objetiva está prevista para **14/02/2027**.

## Executar

Requer Node.js 20.19+ na série 20 ou Node.js 22.12+ e Python 3.10+.

```powershell
cd E:\Concursos\ConcursoIFG\tae-ifg-2026
npm install
npm run dev
```

Abra o endereço `Local` que o Vite imprimir, normalmente **http://127.0.0.1:5173**. O comando inicia o React/Vite e a API Python local. Use `Ctrl+C` para encerrar. O Python usa a biblioteca padrão para HTTP e SQLite.

Use `npm run build` para gerar o frontend em `frontend/dist` e `npm run preview` para conferir a versão compilada com a mesma API.

## Progresso e backup

- No Windows, o painel usa `%LOCALAPPDATA%\PainelIFG\estudos.db` por padrão, o mesmo caminho do atalho anterior. Em outros sistemas, usa `~/.local/share/ifg-2026/estudos.db`.
- Na primeira execução, o servidor restaura `dados/estudos-backup.db` se houver uma cópia. Esse arquivo também recebe os backups automáticos seguintes.
- Se o progresso estava salvo no navegador ao abrir o HTML anterior, exporte o JSON em **Timer e erros** naquela versão e importe no React. O navegador mantém o armazenamento separado por endereço.
- As variáveis `IFG_PYTHON`, `IFG_PORT`, `IFG_DB_PATH` e `IFG_BACKUP_PATH` configuram o executável, a porta da API e os arquivos de dados. Sem configuração, o Vite encaminha `/api/` e `/materiais/` para a porta 8765.

## Usar o plano

1. Em **Agenda de estudos**, escolha um dia e clique em **Registrar** para guardar minutos, questões e acertos. **Detalhes e reagendamento** permite mover uma sessão.
2. Em **Ajustar metas semanais**, escolha a carga de 8 a 10 horas. A base é uma hora de domingo a sexta e duas horas no sábado, com 30 questões de treino por semana.
3. **Visão das 12 semanas** abre com o diagnóstico de 2 horas no sábado, 28/11/2026. A rotina regular começa em 29/11. Há um meio simulado em 19/12 e dois completos em 16/01 e 06/02, com 4 horas cada. A última semana prevê 6 horas e descanso na véspera.
4. Use **Edital verticalizado** para registrar teoria e revisões por assunto. Use **Desempenho e nota** para calcular a nota ponderada. A biblioteca reúne provas, gabaritos, leis e PDFs locais.

## Código

- `frontend/src/` contém os componentes React, o calendário, as referências e a sincronização com a API.
- `backend/server.py` mantém a API, o SQLite e o acesso aos PDFs locais.
- `scripts/run.mjs` inicia os serviços usados pelo Vite.
- `painel-aprovacao-ifg-2026.html` é a versão anterior e segue disponível para acessar o progresso antigo ou exportar um backup JSON.

## Fontes

- [Página do certame no Instituto AOCP](https://www.institutoaocp.org.br/concursos/724)
- [Comunicado de inscrições do IFG](https://www.ifg.edu.br/component/content/article/161-ifg/campus/goiania/noticias-campus-goiania/48699-concurso-tae-26)
- Edital de abertura em PDF, com o calendário no Anexo I e os conteúdos no Anexo III.

O calendário reflete a conferência de 25/11/2026. O edital exige Curso Superior em Informática e o quadro do cód. 401 prevê duas vagas imediatas para PPP. A aceitação do diploma de Sistemas de Informação ainda precisa de confirmação do IFG ou da AOCP.

