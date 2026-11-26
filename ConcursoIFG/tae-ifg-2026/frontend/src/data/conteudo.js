export const DISC_META = {
  TI: { name: "Conhecimentos Específicos (TI)", short: "Específicos TI", badge: "b-green", weightLabel: "20q × Peso 3 = 60 pts (Mín 39)" },
  PORT: { name: "Língua Portuguesa", short: "Português", badge: "b-blue", weightLabel: "10q × Peso 2 = 20 pts (Mín 12)" },
  LEG: { name: "Legislação", short: "Legislação", badge: "b-purple", weightLabel: "10q × Peso 1 = 10 pts (Mín 5)" },
  RLM: { name: "Raciocínio Lógico e Matemática", short: "RLM", badge: "b-amber", weightLabel: "5q × Peso 1 = 5 pts (Mín 2)" },
  INF: { name: "Informática", short: "Informática", badge: "b-muted", weightLabel: "5q × Peso 1 = 5 pts (Mín 2)" }
};

export const ADMIN_CHECKLIST = [
  { id: "adm1", text: "24/11 a 25/11 (16h): Verificar se tem direito à isenção (CadÚnico ou REDOME) e protocolar + enviar docs até 17h." },
  { id: "adm2", text: "Até 23/12 às 23h59: Fazer a inscrição para Analista de TI, cód. 401, escolher a cidade da prova e guardar o comprovante." },
  { id: "adm3", text: "Até 23/12: Enviar laudo médico se concorrer PcD ou precisar de condição especial (PDF sem senha, últimos 12 meses salvo permanente)." },
  { id: "adm4", text: "Até 24/12: Pagar boleto de R$ 180,00 (com antecedência para compensação) e guardar comprovante." },
  { id: "adm5", text: "06/01/2027: Conferir edital de deferimento das inscrições (recurso só 07–08/01)." },
  { id: "adm6", text: "22/01/2027: Conferir horário oficial e cidade/local de prova." },
  { id: "adm7", text: "09/02/2027: Baixar e imprimir o Cartão de Informação do Candidato." }
];

export const DIAD_CHECKLIST = [
  { id: "dd1", text: "Chegar com antecedência MÍNIMA de 45 minutos do fechamento dos portões (item 12.5)." },
  { id: "dd2", text: "Levar Cartão de Informação do Candidato IMPRESSO (item 12.5)." },
  { id: "dd3", text: "Levar caneta esferográfica de corpo TRANSPARENTE com tinta azul ou preta (leve 3 unidades testadas)." },
  { id: "dd4", text: "Documento oficial ORIGINAL com foto, filiação e assinatura (ou app oficial RG/CNH/E-título — PROIBIDO print, cópia autenticada ou QR Code impresso! Itens 12.5.1–12.5.3.2)." },
  { id: "dd5", text: "Água e lanche SOMENTE em recipientes TRANSPARENTES e sem rótulos (item 12.9.2)." },
  { id: "dd6", text: "DESLIGAR totalmente celular e desativar TODOS os alarmes (ou deixar fora). Qualquer som ou vibração mesmo dentro do envelope lacrado ELIMINA (item 15.1.5!)." },
  { id: "dd7", text: "NÃO usar relógio de qualquer tipo, óculos escuros, boné/chapéu/gorro ou smartwatch (item 15.1.4 'c')." },
  { id: "dd8", text: "Permanência mínima: 60 min para sair; para levar o Caderno de Questões é obrigatório ficar até o fim das 4 horas (item 12.19)." },
  { id: "dd9", text: "Atenção extrema na Folha de Respostas: não há substituição por erro do candidato; preencher todo o alvéolo sem rasurar (item 12.15)." }
];

export const CYCLE_BLOCKS = [
  { id: 1, disc: "TI", hours: 1.5, label: "TI — Banco de Dados & SQL" },
  { id: 2, disc: "PORT", hours: 1.5, label: "Português — Interpretação & Gramática" },
  { id: 3, disc: "TI", hours: 1.5, label: "TI — Eng. Software, Padrões & Ágil" },
  { id: 4, disc: "LEG", hours: 1.0, label: "Legislação — Lei Seca + Questões" },
  { id: 5, disc: "TI", hours: 1.5, label: "TI — Contêineres, Linux & Cloud" },
  { id: 6, disc: "RLM", hours: 1.0, label: "RLM — Lógica & Matemática" },
  { id: 7, disc: "TI", hours: 1.5, label: "TI — Linguagens (Java/Python/PHP) & Web" },
  { id: 8, disc: "PORT", hours: 1.5, label: "Português — Sintaxe, Crase & Pontuação" },
  { id: 9, disc: "TI", hours: 1.5, label: "TI — Redes, Windows Server/AD & Virtualização" },
  { id: 10, disc: "LEG", hours: 1.0, label: "Legislação — Administrativo & Licitações" },
  { id: 11, disc: "TI", hours: 1.5, label: "TI — Requisitos, Testes/TDD & Git" },
  { id: 12, disc: "INF", hours: 1.0, label: "Informática — LibreOffice 7, Office & Seg." },
  { id: 13, disc: "TI", hours: 1.5, label: "TI — Transações, SGBDs & BI/DW/OLAP" },
  { id: 14, disc: "PORT", hours: 1.0, label: "Português — Bateria 100% Questões AOCP" },
  { id: 15, disc: "LEG", hours: 1.0, label: "Legislação — LDB, IFs (11.892), PCCTAE & LGPD" },
  { id: 16, disc: "TI", hours: 1.5, label: "TI — Mensageria, XML/JSON, IA/ML & Apache/NGINX" },
  { id: 17, disc: "RLM", hours: 1.0, label: "RLM / Inf — Revisão Espaçada & Questões" },
  { id: 18, disc: "TI", hours: 2.0, label: "TI — Bateria Mista AOCP + Caderno de Erros" }
];

export const TOPICS_DATA = [
  // ======================== CONHECIMENTOS ESPECÍFICOS: TI (Pág. 37) ========================
  {
    id: "ti-01", disc: "TI", sub: "TI-4 Infraestrutura & Hardware", prio: "media", week: "S6",
    title: "1. Conceitos básicos de Hardware: Placa-mãe, memórias, CPU e periféricos",
    resumo: "Arquitetura de Von Neumann (UC, ULA, registradores, memória principal e E/S). Barramentos (dados, endereço e controle), Chipset (Northbridge/memória/PCIe x Southbridge/E/S — hoje integrados em CPU/PCH). Hierarquia de memórias (Registradores > Cache L1/L2/L3 > RAM DDR4/DDR5 > SSD NVMe/SATA > HDD). Memórias voláteis (SRAM = cache; DRAM = RAM principal) vs não voláteis (ROM, EEPROM, Flash NAND). Interfaces: PCIe, SATA, NVMe, USB, HDMI/DisplayPort; periféricos de entrada, saída e mistos.",
    aocp: "Troca SRAM por DRAM (cache usa SRAM, mais rápida e cara; RAM principal usa DRAM), confunde barramento de endereço (unidirecional) com barramento de dados (bidirecional) e cobra diferenças entre NVMe (via PCIe) e SATA."
  },
  {
    id: "ti-02", disc: "TI", sub: "TI-1 Eng. de Software & Processos", prio: "alta", week: "S1",
    title: "2. Engenharia de Software: processos sistemáticos, métodos, práticas, operação e manutenção",
    resumo: "Ciclo de vida e modelos de processo: Cascata (sequencial, requisitos estáveis), Incremental, Espiral (Boehm — focado em análise de riscos em 4 quadrantes), Prototipação e V-Model (liga cada fase a um nível de teste). Manutenção de software (4 tipos clássicos): Corretiva (corrige falhas), Adaptativa (adapta a novo ambiente/SO/legislação), Perfectiva/Evolutiva (melhora performance/novas funcionalidades — a mais custosa historicamente) e Preventiva (reengenharia/refatoração para facilitar manutenção futura).",
    aocp: "Clássico absoluto: pedir os 4 tipos de manutenção! Cuidado para não confundir Adaptativa (mudança externa/ambiente/lei) com Perfectiva (melhoria solicitada pelo usuário ou desempenho) e Preventiva (reduzir riscos futuros/dívida técnica)."
  },
  {
    id: "ti-03a", disc: "TI", sub: "TI-1 Eng. de Software & Processos", prio: "critica", week: "S2",
    title: "3a. Padrões de Projetos (Design Patterns GoF) e Arquiteturas (Multicamadas, Cliente-Servidor, Microsserviços)",
    resumo: "GoF (23 padrões em 3 categorias): (1) Criacionais: Singleton (instância única), Factory Method, Abstract Factory, Builder, Prototype; (2) Estruturais: Adapter (converte interface incompatível), Bridge, Composite (árvore), Decorator (adiciona responsabilidade dinamicamente), Facade (interface simplificada para subsistema), Flyweight, Proxy (substituto/controle de acesso); (3) Comportamentais: Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer (pub-sub/notificação), State, Strategy (algoritmos intercambiáveis), Template Method, Visitor. Arquiteturas: 2/3/N-camadas (Apresentação, Negócio, Dados), Cliente-Servidor, Microsserviços (serviços autônomos, banco por serviço, comunicação leve REST/mensageria, deploy independente, escalabilidade granular vs complexidade distribuída).",
    aocp: "Dá um cenário e pede qual padrão GoF resolve (ex.: 'simplificar subsistema complexo' = Facade; 'compatibilizar interfaces' = Adapter; 'notificar dependentes' = Observer; 'trocar algoritmo em tempo de execução' = Strategy). Em microsserviços, destaca isolamento de dados e falhas parciais."
  },
  {
    id: "ti-03b", disc: "TI", sub: "TI-1 Eng. de Software & Processos", prio: "alta", week: "S5",
    title: "3b. Processos de Desenvolvimento: CMMI-DEV, MPS.BR SW, DevOps e DevSecOps",
    resumo: "CMMI-DEV: 5 níveis de maturidade (1 Inicial/Ad hoc, 2 Gerenciado, 3 Definido, 4 Gerenciado Quantitativamente, 5 Em Otimização) e representação contínua (níveis de capacidade 0 a 3/5). MPS.BR (Software): 7 níveis crescentes de G a A (G Parcialmente Gerenciado, F Gerenciado, E Parcialmente Definido, D Largamente Definido, C Definido, B Gerenciado Quantitativamente, A Em Otimização) — compatível com CMMI e ISO/IEC 12207/15504. DevOps: cultura + automação unindo Dev e Ops (CI = integração contínua; CD = entrega/implantação contínua; IaC, observabilidade, feedback rápido). DevSecOps: integra segurança desde o início (Shift-Left Security), SAST (estático/código), DAST (dinâmico/execução), SCA (dependências).",
    aocp: "Cobra a ordem exata dos níveis CMMI (1→5) e MPS.BR (G→A, onde G é o menor e A é o maior — muita gente inverte!) e diferencia Entrega Contínua (deploy em produção exige aprovação manual) de Implantação Contínua (deploy automático)."
  },
  {
    id: "ti-03c", disc: "TI", sub: "TI-1 Eng. de Software & Processos", prio: "critica", week: "S3",
    title: "3c. UML 2.5 e Metodologias Ágeis (SCRUM e XP)",
    resumo: "UML 2.5 (14 diagramas): Estruturais (Classes, Objetos, Componentes, Implantação/Deployment, Pacotes, Estrutura Composta, Perfil) vs Comportamentais (Casos de Uso, Atividades, Máquina de Estados, e os 4 de Interação: Sequência, Comunicação, Visão Geral de Interação, Temporização). Relações no Diagrama de Classes: Associação, Agregação (losango vazio — parte existe sem o todo), Composição (losango preenchido — parte morre com o todo), Generalização/Herança, Dependência (seta tracejada). Casos de Uso: <<include>> (obrigatório) vs <<extend>> (opcional/condicional). SCRUM (Guia 2020): 3 Responsabilidades (PO, Scrum Master, Developers), 5 Eventos (Sprint ≤1 mês, Sprint Planning, Daily 15min, Sprint Review, Sprint Retrospective), 3 Artefatos + Compromissos (Product Backlog → Meta do Produto; Sprint Backlog → Meta da Sprint; Incremento → Definição de Pronto/DoD). XP (Extreme Programming): 5 valores (Comunicação, Simplicidade, Feedback, Coragem, Respeito) e 12 práticas (Pair Programming, TDD, Integração Contínua, Refatoração, Propriedade Coletiva, Releases Curtas, Cliente Presente, Jogo do Planejamento).",
    aocp: "Campeão em TI! Diferencia Agregação x Composição, <<include>> x <<extend>>, papéis do PO vs SM (SM não manda no time nem prioriza backlog!), e na Daily Scrum apenas os Developers participam obrigatoriamente (duração máx 15 min)."
  },
  {
    id: "ti-04", disc: "TI", sub: "TI-1 Eng. de Software & Processos", prio: "alta", week: "S3",
    title: "4. Engenharia de Requisitos: levantamento, documentação, análise e validação",
    resumo: "Tipos de requisitos: Funcionais (o que o sistema faz), Não Funcionais (como faz: desempenho, segurança, usabilidade, disponibilidade, portabilidade — ISO/IEC 25010) e Regras de Negócio. Fases: Elicitação/Levantamento (entrevistas, JAD, brainstorming, questionários, observação/etnografia, análise documental, prototipagem, histórias de usuário INVEST + critérios de aceitação), Documentação/Especificação (ERS / IEEE 830 / SRS), Análise/Verificação ('estamos construindo o produto certo de acordo com a especificação?' — consistência, completude, ausência de ambiguidade, priorização MoSCoW) e Validação ('construímos o produto certo para o cliente?' — revisões, walkthroughs, inspeções, protótipos). Rastreabilidade (bidirecional: frente e trás).",
    aocp: "Clássico da engenharia: Verificação ('construir o produto corretamente' / conformidade técnica) vs Validação ('construir o produto certo' / atende ao cliente), e classificar cenários entre Requisito Funcional e Não Funcional."
  },
  {
    id: "ti-05", disc: "TI", sub: "TI-1 Eng. de Software & Processos", prio: "critica", week: "S4",
    title: "5. Metodologias de Testes: TDD, refatoração, tipos e estratégias de testes",
    resumo: "TDD (Test-Driven Development): ciclo Red (escreve teste que falha) → Green (código mínimo para passar) → Refactor (melhora código mantendo testes verdes sem mudar comportamento externo). Níveis de Teste: Unitário/Unidade, Integração (Big Bang, Top-Down com Stubs, Bottom-Up com Drivers), Sistema e Aceitação (Alfa = ambiente desenvolvedor; Beta = usuários reais). Técnicas: Caixa-Branca/Estrutural (conhece código: cobertura de comandos, ramos/decisões, condições, caminhos — complexidade ciclomática de McCabe), Caixa-Preta/Funcional (baseada em entradas/saídas: particionamento de equivalência, análise de valor limite, tabela de decisão, transição de estados), Caixa-Cinza. Outros: Regressão (garantir que mudança não quebrou o existente), Smoke, Sanity, Carga/Estresse/Desempenho, Usabilidade, Segurança. Erro (humano) vs Defeito/Bug (no código) vs Falha (desvio observável na execução).",
    aocp: "Troca Stub (usado em Top-Down para simular módulo inferior) por Driver (usado em Bottom-Up para chamar módulo inferior), cobra ordem Red-Green-Refactor do TDD e diferenças entre Caixa-Branca x Caixa-Preta (partição de equivalência e valor limite)."
  },
  {
    id: "ti-06", disc: "TI", sub: "TI-2 Dev, Mensageria, Formatos & IA", prio: "alta", week: "S7",
    title: "6. Mensageria: Message Broker, RabbitMQ, Evento Negocial, Webhook e APIs reversas",
    resumo: "Comunicação assíncrona desacoplada via Message Broker (intermediário que recebe, roteia, armazena e entrega mensagens). RabbitMQ (protocolo AMQP): Producer → Exchange → Binding (routing key) → Queue → Consumer. Tipos de Exchange: Direct (routing key exata), Fanout (broadcast p/ todas filas ligadas), Topic (curingas * 1 palavra e # 0+ palavras), Headers. Conceitos: ACK/NACK, Dead Letter Queue (DLQ), persistência, entrega At-most-once / At-least-once / Exactly-once. Evento Negocial: fato relevante ocorrido no domínio (ex: 'MatriculaConfirmada') publicado em barramento de eventos (EDA). Webhook / API reversa: comunicação orientada a eventos via HTTP POST em que o servidor provedor notifica proativamente uma URL cadastrada pelo consumidor quando o evento ocorre (evita polling contínuo), exigindo verificação de assinatura HMAC, idempotência e retry com backoff.",
    aocp: "Cobra os 4 tipos de Exchange do RabbitMQ (especialmente Fanout vs Topic com * e #), papel do ACK/DLQ e diferença entre Polling (cliente pergunta sempre) vs Webhook/API reversa (servidor envia HTTP callback ao cliente)."
  },
  {
    id: "ti-07", disc: "TI", sub: "TI-1 Eng. de Software & Processos", prio: "critica", week: "S1",
    title: "7. Ferramenta de versionamento Git",
    resumo: "VCS distribuído (cada clone tem histórico completo). 3 áreas: Working Directory → Staging Area (Index) → Local Repository (.git). Comandos essenciais: git init/clone, status, add, commit, log, diff, branch, checkout / switch, merge (fast-forward vs 3-way merge) vs rebase (reescreve histórico linearmente — nunca fazer em branch pública compartilhada!), fetch (baixa sem mesclar) vs pull (fetch + merge/rebase), push, stash (guarda alterações temporariamente), reset (--soft, --mixed, --hard) vs revert (cria novo commit desfazendo outro com segurança), cherry-pick, tag. Fluxos: GitFlow (main, develop, feature, release, hotfix) e Trunk-Based.",
    aocp: "Cobra exatamente a diferença entre git fetch e git pull, merge vs rebase, reset (--soft/--mixed/--hard) vs revert, e git stash."
  },
  {
    id: "ti-08", disc: "TI", sub: "TI-4 Infra, Contêineres & Cloud", prio: "critica", week: "S3",
    title: "8. Ambiente de contêineres: Docker, Kubernetes e Rancher",
    resumo: "Contêineres compartilham o kernel do SO host (isolamento por namespaces e cgroups — mais leves que VMs com hypervisor). Docker: Imagem (template imutável em camadas) vs Contêiner (instância em execução). Dockerfile: FROM, RUN (build time), COPY/ADD, WORKDIR, ENV, EXPOSE, CMD/ENTRYPOINT (runtime). Comandos: docker build, run (-d, -p, -v, --name), ps, images, pull, exec, logs, stop/rm, compose. Volumes (persistência fora da camada gravável) e redes (bridge, host, none, overlay). Kubernetes (K8s): Control Plane (kube-apiserver, etcd chave-valor, kube-scheduler, kube-controller-manager) e Worker Nodes (kubelet, kube-proxy, container runtime). Objetos: Pod (menor unidade implantável, 1+ containers compartilhando IP/volumes), ReplicaSet, Deployment (rolling update/rollback), Service (ClusterIP interno, NodePort porta do nó, LoadBalancer), Ingress (roteamento HTTP/HTTPS), ConfigMap e Secret (Base64 — não criptografado por padrão!), Namespace, StatefulSet, DaemonSet, PV/PVC. Rancher: plataforma empresarial open-source de gerenciamento multi-cluster Kubernetes (RBAC centralizado, catálogo Helm, provisionamento RKE/K3s).",
    aocp: "Campeão em provas recentes! Diferença Imagem vs Contêiner, CMD vs RUN no Dockerfile, tipos de Service K8s (ClusterIP, NodePort, LoadBalancer), papel do etcd/kubelet/Pod e o que é o Rancher (gestão multi-cluster K8s)."
  },
  {
    id: "ti-09", disc: "TI", sub: "TI-2 Dev, Mensageria, Formatos & IA", prio: "media", week: "S5",
    title: "9. Desenvolvimento de aplicações Web e mobile: linguagens, tecnologias, bibliotecas e frameworks",
    resumo: "Web: HTTP/HTTPS (verbos idempotentes GET/PUT/DELETE vs POST; códigos 2xx, 3xx, 4xx, 5xx), HTML5 semântico, CSS3, JavaScript/TypeScript, DOM, AJAX/Fetch, CORS, Cookies/JWT/OAuth2/OIDC. Arquiteturas: SSR vs SPA (React, Angular, Vue) vs PWA (Service Workers, offline-first, Manifest). APIs REST (stateless, recursos via URI, representação JSON/XML, HATEOAS) vs GraphQL vs gRPC. Mobile: Nativo (Swift/Kotlin), Híbrido (WebView/Ionic), Multiplataforma compilado/nativo (Flutter/Dart, React Native). Boas práticas OWASP Top 10 (SQL Injection, XSS, CSRF, Broken Access Control).",
    aocp: "Cobra métodos HTTP (quais são seguros e idempotentes!), diferença REST stateless vs sessões stateful, CORS e vulnerabilidades clássicas OWASP (SQLi, XSS, CSRF)."
  },
  {
    id: "ti-10a", disc: "TI", sub: "TI-2 Dev, Mensageria, Formatos & IA", prio: "alta", week: "S5",
    title: "10a. Linguagem de programação: PHP",
    resumo: "Linguagem server-side dinamicamente tipada (com type hints/union types no PHP 8+). Tags <?php ?>; variáveis com $; escopo (global, static); arrays associativos; comparação frouxa (==) vs estrita (===); superglobais ($_GET, $_POST, $_SESSION, $_COOKIE, $_SERVER). OO em PHP: class, interface, abstract, trait (reuso horizontal), namespace, __construct, visibilidade (public/protected/private), :: (resolução de escopo), -> (objeto). Acesso a BD via PDO (Prepared Statements contra SQL Injection). Frameworks comuns em órgãos públicos: Laravel e Symfony; Composer (gerenciador de pacotes).",
    aocp: "Cobra == vs ===, comportamento de traits, superglobais, diferenças include vs require (_once) e leitura de pequenos trechos de código PHP com arrays associativos ou OO."
  },
  {
    id: "ti-10b", disc: "TI", sub: "TI-2 Dev, Mensageria, Formatos & IA", prio: "critica", week: "S4",
    title: "10b. Linguagem de programação: Java",
    resumo: "Compilada para bytecode executado na JVM (WORA — JDK > JRE > JVM). Tipos primitivos vs wrappers (autoboxing/unboxing); String imutável (StringBuilder mutável). OO: Encapsulamento, Herança (extends, única p/ classes), Polimorfismo (sobrescrita/@Override vs sobrecarga), Abstração (abstract class vs interface — default/static methods no Java 8+). Modificadores: public, protected, package-private (default), private; static, final (classe não herdável, método não sobrescritível, variável constante). Exceções: Throwable → Error e Exception (Checked exige try/catch ou throws; RuntimeException = Unchecked). Collections: List (ArrayList, LinkedList — ordenadas, aceitam duplicados), Set (HashSet, TreeSet — sem duplicados), Map (HashMap, TreeMap — chave/valor). Java 8+: Lambdas, Streams (map, filter, reduce, collect), Optional. Ecossistema: Maven/Gradle, Spring Boot, JPA/Hibernate.",
    aocp: "Muito cobrado! Modificadores de acesso (especialmente protected vs default), Checked vs Unchecked exceptions, diferença entre ArrayList/HashSet/HashMap e resultado de trechos de código com herança/polimorfismo/final."
  },
  {
    id: "ti-10c", disc: "TI", sub: "TI-2 Dev, Mensageria, Formatos & IA", prio: "critica", week: "S4",
    title: "10c. Linguagem de programação: Python",
    resumo: "Interpretada, tipagem dinâmica e FORTE, indentação obrigatória. Estruturas nativas e MUTABILIDADE: list [ ] (ordenada, mutável), tuple ( ) (ordenada, IMUTÁVEL), dict {k:v} (chave única imutável, mutável), set { } (não ordenado, sem duplicados, mutável) e str (IMUTÁVEL). Slicing [inicio:fim:passo] (fim exclusivo!). Funções: def, parâmetros default, *args (tupla) e **kwargs (dicionário), lambda, decorators, geradores (yield). List comprehensions [x*2 for x in lista if x>0]. OO: __init__(self), herança múltipla (MRO), dunder methods. Exceções: try / except / else (roda se não deu erro) / finally (sempre roda). Gerenciamento: pip, venv, Frameworks web (Django, Flask, FastAPI).",
    aocp: "Clássicos da AOCP em Python: mutabilidade de tupla vs lista, saída exata de slicing negativo/passo, list comprehension, *args/**kwargs e bloco try/except/else/finally."
  },
  {
    id: "ti-11", disc: "TI", sub: "TI-2 Dev, Mensageria, Formatos & IA", prio: "media", week: "S7",
    title: "11. XML, XML Schema (XSD) e JSON",
    resumo: "XML (Extensible Markup Language): formato textual hierárquico extensível, case-sensitive, tags de abertura/fechamento obrigatórias, exatamente 1 elemento raiz, atributos entre aspas. Documento bem-formado (segue sintaxe XML) vs Documento válido (obedece a um DTD ou XSD). XML Schema (XSD): define estrutura, tipos de dados (xs:string, xs:integer, xs:date), cardinalidade (minOccurs, maxOccurs), simpleType e complexType — escrito em XML (superior ao DTD por suportar tipos e namespaces). JSON (JavaScript Object Notation): leve, baseado em pares chave:valor (chaves sempre em aspas duplas) e arrays [ ]; tipos suportados: string, number, boolean, null, object, array (NÃO suporta comentários nem tipo Date nativo). Comparação: JSON é menos verboso e mais rápido de parsear em APIs REST; XML tem namespaces, XPath/XSLT e validação XSD nativa (ex.: NF-e, SOAP).",
    aocp: "Diferencia XML bem-formado x válido, cobra atributos XSD (minOccurs/maxOccurs), tipos válidos em JSON e regras sintáticas (ex.: aspas duplas obrigatórias nas chaves JSON)."
  },
  {
    id: "ti-12", disc: "TI", sub: "TI-2 Dev, Mensageria, Formatos & IA", prio: "alta", week: "S9",
    title: "12. Inteligência Artificial e Aprendizado de Máquina",
    resumo: "Pré-processamento: (a) Dados estruturados: tratamento de valores ausentes/missing (imputação média/mediana/moda, remoção), outliers, codificação categórica (One-Hot Encoding, Label Encoding), normalização (Min-Max [0,1]) vs padronização (Z-score média 0, dp 1), redução de dimensionalidade (PCA) e balanceamento (SMOTE, undersampling); (b) Dados não estruturados (texto/NLP, imagem): tokenização, remoção de stopwords, stemming vs lemmatização, Bag-of-Words, TF-IDF, embeddings. Modelos Preditivos (Aprendizado Supervisionado — tem rótulo y): Classificação (Regressão Logística, Árvores de Decisão, Random Forest, SVM, KNN, Naive Bayes, Redes Neurais) e Regressão (Linear, Ridge/Lasso). Modelos Descritivos (Não Supervisionado — sem rótulo): Clusterização/Agrupamento (K-Means, DBSCAN, Hierárquico) e Regras de Associação (Apriori: suporte, confiança, lift). Overfitting (alta variância, decora treino) vs Underfitting (alto viés). Validação cruzada (k-fold) e métricas (Acurácia, Precisão, Recall, F1-Score, ROC-AUC, RMSE).",
    aocp: "Diferencia aprendizagem supervisionada (classificação e regressão) vs não supervisionada (clustering e associação), overfitting vs underfitting, normalização vs padronização e etapas de NLP (stemming vs lematização)."
  },
  {
    id: "ti-13a", disc: "TI", sub: "TI-3 Banco de Dados, SQL & BI", prio: "critica", week: "S1",
    title: "13a. Bancos de Dados: Linguagem e comandos SQL",
    resumo: "Subconjuntos SQL: DDL (CREATE, ALTER, DROP, TRUNCATE — altera estrutura. O comportamento transacional varia por SGBD, por exemplo PostgreSQL e MySQL); DML (SELECT, INSERT, UPDATE, DELETE — manipula dados); DCL (GRANT, REVOKE); TCL (COMMIT, ROLLBACK, SAVEPOINT). Consultas e ordem lógica de execução: FROM/JOIN → WHERE (filtra linhas antes de agrupar) → GROUP BY → HAVING (filtra grupos/funções agregadas COUNT/SUM/AVG/MIN/MAX) → SELECT (DISTINCT) → ORDER BY → LIMIT. JOINs: INNER JOIN (interseção), LEFT/RIGHT OUTER JOIN (preserva um lado e preenche NULL no outro), FULL OUTER JOIN, CROSS JOIN (produto cartesiano). Subconsultas (IN, EXISTS, ANY, ALL), CTEs (WITH), UNION (remove duplicados) vs UNION ALL (mantém duplicados), Views, Índices (B-Tree, Hash) e Normalização (1FN atômica, 2FN sem dep. parcial, 3FN sem dep. transitiva, BCNF).",
    aocp: "Cobra MUITO: WHERE vs HAVING, DELETE vs TRUNCATE vs DROP, LEFT JOIN retornando NULLs, UNION vs UNION ALL e leitura de consulta SQL indicando qual saída retorna!"
  },
  {
    id: "ti-13b", disc: "TI", sub: "TI-3 Banco de Dados, SQL & BI", prio: "critica", week: "S2",
    title: "13b. Processamento de transações, controle de concorrência e recuperação",
    resumo: "Propriedades ACID: Atomicidade (tudo ou nada — Gerenciador de Transações/Recuperação), Consistência (integridade preservada — SGBD + app), Isolamento (execução concorrente sem interferência — Controle de Concorrência) e Durabilidade (após COMMIT persiste mesmo após queda — Recuperação/Logs). Anomalias de concorrência: Leitura Suja (Dirty Read), Leitura Não-Repetível e Leitura Fantasma. Níveis de Isolamento SQL-92 (do menor p/ maior): Read Uncommitted → Read Committed → Repeatable Read → Serializable. Controle de concorrência: Bloqueios (Shared/Leitura vs Exclusive/Escrita), 2PL (Two-Phase Locking: fase de crescimento e de encolhimento; Strict 2PL evita cascata de rollbacks), Timestamp, MVCC (Multi-Version Concurrency Control — leitores não bloqueiam escritores!). Deadlock (prevenção wait-die/wound-wait ou detecção via grafo de espera). Recuperação: WAL (Write-Ahead Logging), Checkpoint, UNDO (desfaz não-confirmadas) e REDO (refaz confirmadas não gravadas em disco).",
    aocp: "Clássico: ligar cada anomalia (Dirty Read, Phantom) ao nível de isolamento que a evita, definir cada letra de ACID, explicar 2PL e diferenciar UNDO x REDO na recuperação por log."
  },
  {
    id: "ti-13c", disc: "TI", sub: "TI-3 Banco de Dados, SQL & BI", prio: "alta", week: "S5",
    title: "13c. SGBDs: conceitos, arquiteturas e fundamentos de MySQL e PostgreSQL",
    resumo: "PostgreSQL: SGBD objeto-relacional, arquitetura baseada em processos (postmaster cria processo servidor por conexão), MVCC nativo criando novas tuplas (exige VACUUM / Autovacuum para limpar dead tuples e evitar transaction ID wraparound), WAL em pg_wal, suporte robusto a JSONB, CTEs, Window Functions, extensões (PostGIS), backup lógico pg_dump/pg_restore e físico pg_basebackup. MySQL: arquitetura multi-threaded em camadas (conexão, SQL/otimizador, Storage Engines plugáveis). Engines principais: InnoDB (padrão desde 5.5 — suporta ACID, transações, FK, bloqueio em nível de linha e MVCC) vs MyISAM (sem transações/FK, bloqueio de tabela, leitura rápida). Backup: mysqldump. Replicação primário-réplica (binlog).",
    aocp: "Cobra InnoDB vs MyISAM (só InnoDB suporta transações ACID e chave estrangeira!), função do VACUUM no PostgreSQL e utilitários de backup (mysqldump vs pg_dump)."
  },
  {
    id: "ti-13d", disc: "TI", sub: "TI-3 Banco de Dados, SQL & BI", prio: "alta", week: "S8",
    title: "13d. Data Warehouse, OLAP, ETL, Data Mining e BI (Business Intelligence)",
    resumo: "OLTP (sistemas transacionais do dia a dia, normalizados 3FN, muitas escritas curtas) vs OLAP (Data Warehouse — orientado a assunto, integrado, variante no tempo e não-volátil segundo Inmon; leituras analíticas complexas). ETL (Extract, Transform, Load — staging area) vs ELT (carrega bruto e transforma no destino, comum em Data Lakes/Cloud). Modelagem Dimensional (Kimball): Tabela Fato (métricas/fatos numéricos + FKs p/ dimensões, alta granularidade) e Tabelas Dimensão (contexto: tempo, produto, campus — desnormalizadas). Esquemas: Star Schema (Estrela — dimensões ligadas direto ao fato, consultas mais rápidas) vs Snowflake (Floco de Neve — dimensões normalizadas em subdimensões, economiza espaço mas gera mais JOINs). Operações OLAP: Roll-up (sobe hierarquia/agrega), Drill-down (desce detalhe), Slice (fatia 1 dimensão), Dice (recorta subcubo com várias dimensões), Pivot/Rotate (rotaciona eixos). Data Mining (CRISP-DM/KDD): descoberta de padrões não óbvios.",
    aocp: "Cobra as 4 características de DW de Inmon (Orientado a Assunto, Integrado, Não-Volátil, Variante no Tempo), Star Schema vs Snowflake e as operações OLAP (Roll-up x Drill-down, Slice x Dice)."
  },
  {
    id: "ti-14a", disc: "TI", sub: "TI-4 Infra, SOs, Contêineres & Cloud", prio: "alta", week: "S2",
    title: "14a. Sistemas Operacionais: processos, memória, E/S e sistemas de arquivos",
    resumo: "Kernel (monolítico vs microkernel vs híbrido), chamadas de sistema (syscalls), modo usuário vs modo núcleo. Processos (PCB, espaço de endereço isolado) vs Threads (compartilham código/dados/arquivos, têm registradores e pilha próprios — troca de contexto mais leve). Estados do processo: Novo → Pronto ↔ Executando → Bloqueado/Espera → Terminado. Escalonamento: preemptivo (Round-Robin com quantum, SRTF) vs não-preemptivo (FCFS/FIFO, SJF); inversão de prioridade e starvation. Memória Virtual: Paginação (páginas lógicas × quadros/frames físicos — resolve fragmentação externa, pode gerar interna) vs Segmentação; Page Fault, TLB (cache de tabela de páginas), Thrashing (excesso de paginação/swapping), algoritmos LRU/FIFO/Relógio. Sistemas de arquivos: Inodes, journaling (ext4, NTFS, XFS — evita corrupção em quedas), alocação contígua/encadeada/indexada.",
    aocp: "Diferencia Processo x Thread (o que compartilham!), escalonamento preemptivo vs não-preemptivo, fragmentação interna (paginação) vs externa (segmentação) e conceito de Thrashing."
  },
  {
    id: "ti-14b", disc: "TI", sub: "TI-4 Infra, SOs, Contêineres & Cloud", prio: "alta", week: "S6",
    title: "14b. Microsoft Windows Server e Active Directory (sites, domínios, florestas, usuários/grupos)",
    resumo: "Active Directory Domain Services (AD DS): hierarquia lógica = Floresta (limite de segurança e esquema único) → Árvore (domínios com namespace DNS contíguo) → Domínio (limite administrativo e de replicação) → Unidade Organizacional/OU (contêiner p/ delegar administração e vincular GPOs). Topologia física: Sites (sub-redes conectadas por links rápidos; controla replicação e logon) e Controladores de Domínio (DCs — armazenam banco NTDS.dit; Global Catalog facilita buscas na floresta; 5 mestres FSMO). Protocolos: LDAP (porta 389 / LDAPS 636), Kerberos (autenticação por tickets, porta 88), DNS (vital para localizar DCs via registros SRV!). GPO (Group Policy Objects): precedência LSDOU (Local → Site → Domínio → OU — a última vence, salvo Enforced/No Override ou Block Inheritance). Grupos (AGDLP): escopos Domain Local, Global e Universal.",
    aocp: "Cobra a ordem hierárquica Floresta > Árvore > Domínio > OU, diferença entre estrutura lógica (Domínio/OU) e física (Site/Sub-rede), protocolo Kerberos/LDAP e precedência de GPO (LSDOU)."
  },
  {
    id: "ti-14c", disc: "TI", sub: "TI-4 Infra, SOs, Contêineres & Cloud", prio: "critica", week: "S3",
    title: "14c. Linux: administração de usuários, sistemas de arquivos e gerenciamento de pacotes",
    resumo: "FHS (Filesystem Hierarchy Standard): /bin, /sbin, /etc (configs), /home, /var (logs/spool), /tmp, /usr, /dev, /proc (virtual). Usuários/Grupos: /etc/passwd, /etc/shadow (senhas hash, só root lê), /etc/group; comandos useradd/usermod/userdel, passwd, groupadd, su/sudo. Permissões: r(4) w(2) x(1) para u(dono)/g(grupo)/o(outros) via chmod (ex: 755 = rwxr-xr-x, 644 = rw-r--r--), chown (dono:grupo); bits especiais SUID (4xxx), SGID (2xxx) e Sticky Bit (1xxx — ex: /tmp só dono apaga). Sistemas de arquivos: ext4, XFS, Btrfs; mount/umount, /etc/fstab, df -h, du -sh, ln (-s p/ symlink vs hard link). Gerenciamento de pacotes: família Debian/Ubuntu (dpkg baixo nível; apt/apt-get alto nível com resolução de dependências) vs família Red Hat/Fedora/Rocky (rpm baixo nível; dnf/yum alto nível). Systemd: systemctl start/enable/status, journalctl.",
    aocp: "Cobra permissões octais (chmod 750/644, Sticky Bit em /tmp), diretórios (/etc vs /var), arquivos /etc/passwd x /etc/shadow e distinção apt/dpkg (Debian) vs dnf/yum/rpm (Red Hat)."
  },
  {
    id: "ti-15", disc: "TI", sub: "TI-4 Infra, Contêineres & Cloud", prio: "alta", week: "S8",
    title: "15. Clusterização de servidores (HA/Load Balancing) e Orquestração/Automação com Ansible",
    resumo: "Clusterização: Tipos = Alta Disponibilidade/HA (Failover Ativo-Passivo ou Ativo-Ativo; heartbeat, quorum, STONITH contra split-brain), Balanceamento de Carga/NLB (Round-Robin, Least Connections, IP Hash, health checks; L4 TCP vs L7 HTTP/HTTPS) e Alto Desempenho/HPC (Beowulf). Disponibilidade em noves (99,9% = ~8h45min/ano indisponível; 99,99% = ~52min/ano). Ansible: ferramenta de automação e gerenciamento de configuração agentless (sem agente nos alvos — usa SSH no Linux e WinRM no Windows + Python). Conceitos: Control Node, Managed Nodes, Inventory (INI/YAML com grupos), Modules (ex.: apt, copy, service, template), Tasks, Handlers (rodados só quando há notify), Roles e Playbooks (escritos em YAML e idempotentes — rodar N vezes produz o mesmo estado final).",
    aocp: "Em Ansible, foca em 3 fatos: é agentless (usa SSH/WinRM, sem daemon agente), escrito em YAML e idempotente! Em clusters, diferencia cluster HA (tolerância a falhas) de Load Balancing e problema de split-brain."
  },
  {
    id: "ti-16", disc: "TI", sub: "TI-4 Infra, Contêineres & Cloud", prio: "media", week: "S8",
    title: "16. Servidores de aplicação: Apache HTTP Server e NGINX",
    resumo: "Apache HTTP Server (httpd): modular, usa MPMs (Multi-Processing Modules: prefork = processo por conexão; worker = multi-processo/multi-thread; event = assíncrono keep-alive). Config principal: httpd.conf / apache2.conf, diretivas <VirtualHost>, <Directory>, .htaccess (sobrescrita por diretório — exige AllowOverride e reduz performance), mod_proxy, mod_ssl, mod_rewrite. NGINX: arquitetura orientada a eventos (event-driven), assíncrona e não-bloqueante (1 master + poucos worker processes com milhares de conexões — altíssimo desempenho para estáticos e problema C10K). Muito usado como Reverse Proxy, Load Balancer, API Gateway e terminação SSL/TLS. Config principal: nginx.conf (blocos http, server, location, upstream; NÃO usa .htaccess).",
    aocp: "Diferencia arquitetura baseada em processos/threads do Apache (MPMs prefork/worker/event) da arquitetura orientada a eventos assíncrona do NGINX, além de .htaccess (só Apache) e blocos server/upstream (NGINX)."
  },
  {
    id: "ti-17", disc: "TI", sub: "TI-4 Infra, Contêineres & Cloud", prio: "critica", week: "S4",
    title: "17. Computação em Nuvem: fundamentos, modelos de serviço e modelos de implantação",
    resumo: "Definição oficial NIST (SP 800-145): 5 Características Essenciais (Autoatendimento sob demanda, Amplo acesso à rede, Pooling de recursos/multilocação, Elasticidade rápida, Serviço mensurado). 3 Modelos de Serviço (e matriz de responsabilidade compartilhada): IaaS (provedor gerencia hardware/rede/virtualização; cliente gerencia SO, runtime, dados — ex: EC2, Azure VM), PaaS (provedor gerencia até runtime/SO; cliente gerencia aplicação e dados — ex: App Engine, Heroku, RDS) e SaaS (provedor gerencia tudo, cliente só usa e configura — ex: M365, Google Workspace). 4 Modelos de Implantação: Nuvem Pública, Nuvem Privada, Nuvem Comunitária (organizações com interesses/requisitos comuns) e Nuvem Híbrida (2+ nuvens distintas ligadas por tecnologia padronizada p/ portabilidade).",
    aocp: "Cobra rigorosamente a definição do NIST: diferenciar as 5 características, o que o cliente controla em IaaS vs PaaS vs SaaS e definir Nuvem Comunitária vs Híbrida."
  },
  {
    id: "ti-18a", disc: "TI", sub: "TI-4 Infra, Contêineres & Cloud", prio: "critica", week: "S6",
    title: "18a. Armazenamento (SAN, NAS, DAS, SDS) e Políticas de Backup (Completo, Incremental, Diferencial)",
    resumo: "Storage: DAS (Direct Attached Storage — ligado direto ao servidor, sem rede; ex: SATA/SAS/NVMe internos), NAS (Network Attached Storage — acesso em nível de ARQUIVO via rede IP usando SMB/CIFS ou NFS), SAN (Storage Area Network — rede dedicada de alta velocidade com acesso em nível de BLOCO via Fibre Channel ou iSCSI; visto pelo SO como disco local), SDS (Software-Defined Storage — abstrai armazenamento do hardware físico, escalabilidade em servidores comuns; ex: Ceph, vSAN). Backup: Completo/Full (copia tudo, limpa bit de arquivo; backup lento, restauração mais rápida: apenas 1 mídia), Incremental (copia apenas alterações desde o último backup QUALQUER — Full ou Incremental; limpa bit; backup rápido/menor espaço, restauração lenta: Full + TODOS incrementais em ordem), Diferencial (copia tudo alterado desde o último FULL; NÃO limpa bit de arquivo; backup cresce a cada dia, restauração precisa só do Full + ÚLTIMO diferencial). RPO (perda máx aceitável de dados) vs RTO (tempo máx de parada); regra 3-2-1.",
    aocp: "Campeão absoluto de prova! NAS = nível de arquivo (SMB/NFS) vs SAN = nível de bloco (FC/iSCSI). E na tabela de backup: Incremental limpa bit e exige Full + todos os incrementais no restore; Diferencial NÃO limpa bit e exige só Full + último diferencial!"
  },
  {
    id: "ti-18b", disc: "TI", sub: "TI-4 Infra, Contêineres & Cloud", prio: "alta", week: "S7",
    title: "18b. Virtualização VMware (fundamentos, administração, HA) e Remote Desktop Services (RDS)",
    resumo: "Hypervisor Tipo 1 / Bare-Metal (roda direto no hardware: VMware ESXi, Hyper-V, KVM) vs Tipo 2 / Hosted (sobre SO host: VirtualBox, VMware Workstation). Ecossistema VMware vSphere: ESXi (hypervisor), vCenter Server (gerenciamento centralizado), Datastore/VMFS. Recursos-chave: vMotion (migração a quente de VM em execução entre hosts sem downtime), Storage vMotion (migra discos a quente), vSphere HA (High Availability — reinicia VMs automaticamente em outro host se um servidor físico cair!), vSphere DRS (Distributed Resource Scheduler — balanceia carga CPU/RAM movendo VMs via vMotion), Fault Tolerance/FT (lockstep sem perda de estado), Snapshots (NÃO são backup!). RDS (Remote Desktop Services — Windows Server): entrega desktops virtuais ou aplicativos remotos (RemoteApp) via protocolo RDP (porta 3389); papéis: RD Session Host, RD Connection Broker, RD Web Access, RD Gateway, RD Licensing.",
    aocp: "Troca vMotion (migração planejada sem parada) com vSphere HA (reinicia VM após falha de host) e DRS (balanceamento automático). Cobra diferença Hypervisor Tipo 1 vs Tipo 2 e porta padrão RDP (3389)."
  },

  // ======================== LÍNGUA PORTUGUESA (Pág. 31) ========================
  {
    id: "port-01", disc: "PORT", sub: "Português • Texto & Discurso", prio: "critica", week: "S1",
    title: "1, 2, 13, 21. Compreensão e interpretação de texto; Tipologia e gêneros textuais; Elementos de comunicação; Variação linguística",
    resumo: "Compreensão (o que está explícito no texto: 'segundo o texto...') vs Interpretação (inferência válida a partir do texto: 'infere-se que...'). Cuidado com extrapolação, redução e contradição! Tipologias (5): Narrativa (enredo, tempo, personagens), Descritiva (retrato estático, adjetivos), Dissertativa (expositiva = informa vs argumentativa = defende tese), Injuntiva/Instrucional (verbos no imperativo/orientações) e Dialogal. Gêneros textuais (infinitos, função social: crônica, artigo de opinião, edital, e-mail). Elementos da comunicação (Jakobson): Emissor (emotiva), Receptor (conativa/apelativa), Mensagem (poética), Código (metalinguística), Canal (fática), Referente (referencial). Variação linguística: diatópica (regional), diastrática (social/gírias/jargões), diafásica (registro formal vs informal), diacrônica (histórica).",
    aocp: "Sempre inicia a prova com 2 a 4 questões de interpretação + identificação de tipologia predominante ou função da linguagem. Leia as alternativas eliminando palavras extremas ('sempre', 'nunca', 'exclusivamente') ausentes do texto."
  },
  {
    id: "port-02", disc: "PORT", sub: "Português • Semântica & Estilística", prio: "alta", week: "S6",
    title: "3, 4, 5, 20. Figuras de linguagem; Significação de palavras; Sinonímia/antonímia; Função textual dos vocábulos",
    resumo: "Figuras de linguagem mais cobradas: Metáfora (comparação implícita) vs Comparação (com conectivo 'como', 'tal qual'), Metonímia (parte pelo todo, autor pela obra), Ironia (dizer o oposto), Eufemismo (suavizar), Hipérbole (exagero), Antítese (ideias opostas próximas), Paradoxo/Oxímoro (contradição lógica), Prosopopeia/Personificação, Catacrese, Pleonasmo e Elipse/Zeugma. Semântica: Denotação (sentido literal) vs Conotação (figurado); Sinônimos, Antônimos, Homônimos (perfeitos, homógrafos, homófonos), Parônimos (parecidos: ratificar=confirmar vs retificar=corrigir; eminente vs iminente; mandado vs mandato; descrição vs discrição), Polissemia e Ambiguidade.",
    aocp: "Pede para substituir uma palavra destacada por outra mantendo o sentido original no contexto (sinonímia contextual) e diferencia Metáfora x Metonímia x Antítese x Eufemismo."
  },
  {
    id: "port-03", disc: "PORT", sub: "Português • Fonologia & Morfologia Básica", prio: "media", week: "S6",
    title: "6, 7, 12. Ortografia; Acentuação gráfica; Formação de palavras",
    resumo: "Acentuação (Novo Acordo Ortográfico): Proparoxítonas (TODAS acentuadas); Paroxítonas terminadas em L, I(s), N, U(s), R, X, PS, Ã(s), ÃO(s), UM/UNS, ON(s) e ditongos crescentes; Oxítonas terminadas em A(s), E(s), O(s), EM/ENS; Monossílabos tônicos em A(s), E(s), O(s). Hiatos: I e U tônicos sozinhos na sílaba (sa-í-da, ba-ú), exceto antes de NH ou após ditongo em paroxítonas (fei-u-ra). Sem trema; sem acento em ditongos abertos ÉI/ÓI de paroxítonas (ideia, heroico), mantido em oxítonas/monossílabos (herói, papéis). Diferencial: pôde/pode, pôr/por, têm/tem, vêm/vem. Ortografia: por que / porque / por quê / porquê; mal vs mau; há vs a; onde vs aonde; X/CH, S/Z/SS/Ç/SC; hífen (vogais/consoantes iguais separam: micro-ondas, anti-inflamatório; diferentes juntam: autoatendimento; prefixos terminados em vogal + R/S dobram: minissaia). Formação: Derivação (prefixal, sufixal, parassintética, regressiva, imprópria) vs Composição (justaposição vs aglutinação) e Hibridismo.",
    aocp: "Cobra identificação de justificativa idêntica para o acento de duas palavras (ex.: 'história' e 'série' = paroxítonas terminadas em ditongo) e uso dos 'porquês' ou 'onde/aonde'."
  },
  {
    id: "port-04", disc: "PORT", sub: "Português • Morfossintaxe", prio: "critica", week: "S2",
    title: "9, 10, 11. Morfologia (classes variáveis e invariáveis); Locuções verbais; Funções do 'que' e do 'se'",
    resumo: "10 classes: 6 variáveis (Substantivo, Adjetivo, Artigo, Numeral, Pronome, Verbo) e 4 invariáveis (Advérbio, Preposição, Conjunção, Interjeição). Atenção a tempos/modos verbais (Pretérito Imperfeito vs Mais-que-perfeito; Futuro do Pretérito; Subjuntivo) e Vozes Verbais (Ativa, Passiva Analítica [ser+particípio], Passiva Sintética [VTD+'se'], Reflexiva). Locuções verbais (verbo auxiliar conjugado + principal no infinitivo, gerúndio ou particípio). Funções do 'QUE': Pronome Relativo (troca por o qual/a qual — introduz oração adjetiva!), Conjunção Integrante (troca oração por 'ISSO' — introduz substantiva!), Conjunção Explicativa/Causal/Consecutiva, Partícula Expletiva. Funções do 'SE': Pronome Apassivador (com VTD/VTDI; sujeito paciente concorda com verbo: 'Vendem-se casas'), Índice de Indeterminação do Sujeito (com VI/VTI/VL; verbo fica SEMPRE na 3ª p. singular: 'Precisa-se de analistas'), Conjunção Subordinativa Condicional/Integrante, Pronome Reflexivo, Parte Integrante do Verbo.",
    aocp: "Clássico número 1 da AOCP: sublinhar um 'QUE' ou um 'SE' no texto e perguntar sua classificação/função, além de conversão da voz ativa para a passiva mantendo o tempo verbal!"
  },
  {
    id: "port-05", disc: "PORT", sub: "Português • Sintaxe & Coesão", prio: "critica", week: "S3",
    title: "14, 19. Sintaxe (período simples e composto por coordenação e subordinação); Elementos de coesão",
    resumo: "Período simples: Sujeito (simples, composto, oculto, indeterminado, inexistente — 'haver' no sentido de existir e 'fazer' indicando tempo!), Predicado, Complementos (OD, OI), Adjunto Adnominal vs Complemento Nominal (alvo paciente de substantivo abstrato/adjetivo/advérbio!), Aposto, Vocativo, Agente da Passiva. Período composto: (1) Coordenadas: Aditivas, Adversativas (mas, porém, contudo, entretanto, todavia, no entanto — cuidado: 'conquanto' é concessiva!), Alternativas, Conclusivas (logo, portanto, pois posposto ao verbo), Explicativas; (2) Subordinadas Substantivas (equivalem a 'ISSO': subjetiva, OD, OI, CN, predicativa, apositiva), Adjetivas (Restritivas SEM vírgula vs Explicativas COM vírgula!) e Adverbiais (Causais, Comparativas, Concessivas [embora, conquanto, ainda que, apesar de], Condicionais, Conformativas, Consecutivas [tão... que], Finais, Proporcionais, Temporais). Coesão referencial (anáfora/catáfora via pronomes) e sequencial (conectivos/conjunções).",
    aocp: "Cobra muito valor semântico de conjunções e substituição sem alteração de sentido (ex.: 'contudo' ↔ 'entretanto'; 'conquanto' ↔ 'embora' — NUNCA por 'portanto'!), além da diferença semântica entre oração adjetiva restritiva e explicativa."
  },
  {
    id: "port-06", disc: "PORT", sub: "Português • Normas Obrigatórias", prio: "critica", week: "S4",
    title: "8, 15, 16. Uso da crase; Concordância verbal e nominal; Regência verbal e nominal",
    resumo: "Crase (a + a(s)): Proibida antes de masculino, verbo, pronome pessoal/tratamento (exceto senhora/senhorita/dona), singular antes de plural ('a pessoas'), palavras repetidas. Obrigatória em locuções femininas adverbiais/prepositivas/conjuntivas ('à medida que', 'às vezes'), antes de 'moda de', horas exatas. Facultativa: pronome possessivo feminino singular, nome próprio feminino, depois de 'até'. Macete p/ lugares: 'Volto DA = crase HÁ; Volto DE = crase PRA QUÊ'. Regência verbal clássica: assistir (ver = VTI 'a'; ajudar = VTD), visar (almejar = VTI 'a'), aspirar (cheirar = VTD; desejar = VTI 'a'), obedecer/desobedecer (VTI 'a'), preferir (preferir X a Y, sem 'mais/do que'), implicar (acarretar = VTD sem 'em'), esquecer/lembrar (sem pronome = VTD; com pronome se/me = VTI 'de'), chegar/ir (pedem 'a', não 'em'). Concordância Verbal: sujeito composto anteposto (plural) vs posposto (plural ou mais próximo); verbos impessoais (haver = existir, fazer = tempo) ficam no singular!; porcentagem (concorda com número ou especificador); partitivos ('a maioria dos alunos foi/foram').",
    aocp: "Garantido em toda prova! 'Haver' impessoal com locução verbal ('Deve haver soluções' — NUNCA 'Devem haver'), 'assistir ao' vs 'preferir X a Y', e casos clássicos de crase obrigatória/proibida."
  },
  {
    id: "port-07", disc: "PORT", sub: "Português • Pontuação & Pronomes", prio: "critica", week: "S5",
    title: "17, 18. Colocação pronominal e Emprego dos sinais de pontuação",
    resumo: "Colocação pronominal (o/a/os/as, lhe/lhes, me/te/se/nos): (1) Próclise obrigatória com palavras atrativas = negativas (não, nunca), advérbios sem vírgula, pronomes relativos/indefinidos/interrogativos/demonstrativos, conjunções subordinativas, orações exclamativas/optativas ('Deus te abençoe'); (2) Mesóclise (futuro do presente ou do pretérito SEM palavra atrativa); (3) Ênclise (início de frase — nunca começar com pronome oblíquo átono! —, após vírgula, imperativo afirmativo). Pontuação: NUNCA separar sujeito de verbo, nem verbo de complemento com vírgula única! Vírgula obrigatória: isolar vocativo, aposto explicativo, adjunto adverbial deslocado (extenso ≥3 palavras obrigatório; curto facultativo), orações intercaladas, adjetiva explicativa e zeugma (omissão de verbo). Ponto e vírgula, dois-pontos e travessão.",
    aocp: "Pede para identificar frase correta quanto à colocação pronominal ou pontuada corretamente, testando exatamente: palavra atrativa exigindo próclise, proibição de vírgula entre sujeito e verbo, e uso de vírgulas em orações intercaladas/adjetivas."
  },

  // ======================== LEGISLAÇÃO (Pág. 31) ========================
  {
    id: "leg-01", disc: "LEG", sub: "Legislação Constitucional", prio: "critica", week: "S1",
    title: "1. Constituição Federal 1988: Administração Pública (Arts. 37–41) e Educação/Cultura/C&T (Arts. 205–219-B)",
    resumo: "Art. 37: Princípios LIMPE (Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência); acesso aos cargos (brasileiros e estrangeiros na forma da lei); concurso validade até 2 anos prorrogável uma vez por igual período; acumulação remunerada proibida, SALVO compatibilidade de horários p/: 2 cargos professor; 1 cargo de professor + outro de qualquer natureza (EC 138/2025); 2 cargos/empregos privativos de saúde com profissões regulamentadas (respeitado teto); responsabilidade objetiva do Estado (art. 37 §6º — risco administrativo, regresso contra agente por dolo/culpa). Art. 41: Estabilidade após 3 anos de efetivo exercício + avaliação especial de desempenho (perde por sentença transitada, PAD ou insuficiência de desempenho). Educação (arts. 205–214): dever do Estado e família; princípios (gratuidade ensino público, gestão democrática, piso salarial, garantia de padrão de qualidade); autonomia universitária (art. 207 — didático-científica, administrativa e de gestão financeira/patrimonial; indissociabilidade ensino-pesquisa-extensão); aplicação mínima anual (União ≥18%, Estados/DF/Municípios ≥25%). Ciência, Tecnologia e Inovação (arts. 218–219-B): Estado promove pesquisa básica e tecnológica, Sistema Nacional de CT&I.",
    aocp: "Cobra hipóteses taxativas de acumulação de cargos (Art. 37 XVI), prazo de estabilidade (3 anos vs estágio probatório!), princípios LIMPE e art. 207 (autonomia universitária e indissociabilidade ensino-pesquisa-extensão)."
  },
  {
    id: "leg-02", disc: "LEG", sub: "Legislação Estatutária", prio: "critica", week: "S1",
    title: "2. Lei Federal nº 8.112/1990 (Regime Jurídico dos Servidores Públicos Civis da União)",
    resumo: "Formas de Provimento (7): Nomeação, Promoção, Readaptação, Reversão, Aproveitamento, Reintegração, Recondução (NÃO existe mais ascensão/transferência!). Vacância: exoneração (não é pena!), demissão (pena), promoção, readaptação, aposentadoria, posse em outro inacumulável, falecimento. Prazos vitais: Posse = 30 dias da publicação (assinada por procuração pode; exercício é personalíssimo!); Exercício = 15 dias da posse; Estágio probatório: o art. 20 da Lei 8.112 traz 24 meses em sua redação literal. Para o Sipec, o Decreto 12.374/2025 estabelece 36 meses, em linha com o prazo para estabilidade do art. 41 da CF. Remoção (mesmo quadro, com/sem mudança de sede) vs Redistribuição (deslocamento de cargo de um órgão para outro). Direitos/Vantagens: Férias (30 dias, 1º período após 12 meses); Licenças (doença família, afastamento cônjuge, serviço militar, atividade política, capacitação a cada 5 anos por até 3 meses, interesse particular até 3 anos). Regime Disciplinar: Deveres (art. 116), Proibições (art. 117), Penalidades (art. 127: Advertência [prescreve 180d], Suspensão até 90d [2 anos], Demissão/Cassação/Destituição [5 anos]). Sindicância: até 30d + 30d (pode gerar advertência ou suspensão ≤30d). PAD: até 60d + 60d (comissão de 3 servidores estáveis).",
    aocp: "LEI MAIS COBRADA DA PROVA! Decore: 30d posse / 15d exercício, formas de provimento (diferença entre Reintegração [demissão invalidada], Recondução [inabilitação em estágio ou volta do anterior] e Reversão [aposentado]), e tabela de penalidades + prazos de prescrição (180d / 2 anos / 5 anos)."
  },
  {
    id: "leg-03", disc: "LEG", sub: "Ética Pública", prio: "alta", week: "S2",
    title: "3. Decreto Federal nº 1.171/1994 (Código de Ética Profissional do Servidor Público Federal)",
    resumo: "Regras Deontológicas (Cap. I): dignidade, decoro, zelo, eficácia; função pública se integra à vida particular (fatos da vida privada podem acrescer ou diminuir seu bom conceito); moralidade não se limita a distinguir bem/mal, mas buscar sempre o bem comum; publicidade dos atos (salvo segurança nacional, investigações ou interesse superior); cortesia, boa vontade; deixar de usar o cargo para obter facilidades; toda ausência injustificada ao trabalho é fator de desmoralização. Vedações expressas (item XV): prejudicar reputação, ser conivente com erro/infração, pleitear/solicitar/receber propinas/presentes de qualquer valor, alterar/deturpar teor de documentos, iludir/enganar usuário, apresentar-se embriagado habitualmente. Comissão de Ética (Cap. II): composta por 3 servidores, aplica APENAS a penalidade de CENSURA (fundamentada e assinada pelos integrantes, com ciência do faltoso) — NÃO aplica advertência nem suspensão!",
    aocp: "Clássico absoluto da AOCP: a única pena aplicável pela Comissão de Ética do Decreto 1.171/1994 é a CENSURA (nunca advertência ou demissão!). Também cobra condutas da vida privada afetando o conceito funcional e vedações do item XV."
  },
  {
    id: "leg-04", disc: "LEG", sub: "Legislação Educacional", prio: "alta", week: "S3",
    title: "4. Lei Federal nº 9.394/1996 (LDB — Lei de Diretrizes e Bases da Educação Nacional)",
    resumo: "Níveis da Educação Escolar (2): Educação Básica (Infantil, Fundamental e Médio) e Educação Superior. Modalidades: EJA, Educação Especial (transversal a todos os níveis), Educação Profissional e Tecnológica (formação inicial/continuada, técnica de nível médio e tecnológica graduação/pós), Educação a Distância e Educação Bilíngue de Surdos. Educação Profissional Técnica de Nível Médio (arts. 36-A a 36-D): articulada (integrada = 1 matrícula só no mesmo IF; concomitante = matrículas distintas) ou subsequente (quem já concluiu Médio). Educação Superior (arts. 43–57): cursos sequenciais, graduação, pós-graduação, extensão; na pública, carga horária mínima de docente = 8h semanais (art. 57) e 200 dias letivos efetivos. Dever do Estado e princípios do art. 3º.",
    aocp: "Foca nos arts. 36-A a 42 (formas integrada, concomitante e subsequente da Educação Profissional) e nos 2 níveis escolares (Básica e Superior — não confundir Educação Infantil/Médio como 'níveis' separados!)."
  },
  {
    id: "leg-05", disc: "LEG", sub: "Legislação da Rede Federal", prio: "critica", week: "S3",
    title: "5. Lei Federal nº 11.892/2008 (Rede Federal de Educação Profissional e Institutos Federais)",
    resumo: "Cria a Rede Federal (IFs, CEFETs RJ/MG, Escolas Técnicas vinculadas às UF, UTFPR, Colégio Pedro II). Natureza jurídica dos IFs: Autarquia federal detentora de autonomia administrativa, patrimonial, financeira, didático-pedagógica e disciplinar; equiparados às universidades federais para regulação, avaliação e supervisão. Organização multicampi; Reitoria como órgão executivo. Objetivos/Mínimos obrigatórios (art. 8º): mínimo de 50% das vagas para educação profissional técnica de nível médio (prioritariamente integrada) e mínimo de 20% das vagas para cursos de licenciatura (e programas especiais de formação pedagógica). Dirigentes: Reitor (mandato 4 anos, 1 recondução; nomeado pelo Presidente da República dentre docentes com doutorado ou +5 anos exercício na Rede Federal) e Diretores-Gerais de Campus. Órgãos superiores: Colégio de Dirigentes (consultivo) e Conselho Superior — CONSUP (deliberativo e consultivo).",
    aocp: "Cobra quase sempre os percentuais do art. 8º (mínimo 50% técnico de nível médio / mínimo 20% licenciaturas!), a natureza jurídica (autarquia equiparada a universidade) e composição/mandato do Reitor (4 anos + 1 recondução) e órgãos superiores (Colégio de Dirigentes vs CONSUP)."
  },
  {
    id: "leg-06", disc: "LEG", sub: "Carreira TAE", prio: "critica", week: "S3",
    title: "6. Lei Federal nº 11.091/2005 (PCCTAE — Plano de Carreira dos Cargos TAE)",
    resumo: "Estrutura os cargos Técnico-Administrativos em Educação das IFEs (Níveis de Classificação A, B, C, D e E — Analista de TI é Nível E!). Conceitos do art. 5º: Cargo, Plano de Carreira, Nível de Classificação, Nível de Capacitação, Padrão de Vencimento, Ambiente Organizacional. Desenvolvimento na carreira: Progressão por Capacitação Profissional (mudança de nível de capacitação dentro do mesmo cargo mediante cursos) e Progressão por Mérito Profissional (mudança de padrão de vencimento por avaliação de desempenho). Incentivo à Qualificação — IQ (art. 11 e Anexo IV — atenção à redação vigente na data de publicação 16/11/2026!): pago por educação formal superior ao requisito do cargo (Edital pág. 5 traz percentuais exatos: Especialização 30%, Mestrado 52%, Doutorado 75% sobre vencimento básico — verifique se há relação direta/indireta conforme texto legal vigente em 16/11/2026). Comissão Interna de Supervisão (CIS).",
    aocp: "Cobra a diferença entre Progressão por Capacitação (cursos) vs Progressão por Mérito (avaliação de desempenho), definições do art. 5º e regras do Incentivo à Qualificação (IQ)."
  },
  {
    id: "leg-07", disc: "LEG", sub: "Transparência & Dados", prio: "alta", week: "S4",
    title: "7. Lei Federal nº 12.527/2011 (LAI — Lei de Acesso à Informação)",
    resumo: "Regra geral: publicidade é o preceito geral e sigilo é a exceção! Transparência Ativa (divulgação espontânea na internet — municípios até 10 mil hab. dispensados de divulgar em site, salvo contas) vs Transparência Passiva (pedido do cidadão sem necessidade de motivação!). Prazos de resposta: imediata; não sendo possível, prazo máximo de 20 dias, prorrogável por +10 dias mediante justificativa. Recurso contra negativa: 10 dias. Classificação de sigilo (art. 24): Ultrassecreta = até 25 anos (renovável uma única vez pela CMRI nos termos do art. 35 §1º III), Secreta = até 15 anos, Reservada = até 5 anos; informações pessoais relativas à intimidade, vida privada, honra e imagem = acesso restrito pelo prazo máximo de 100 anos (art. 31 §1º I).",
    aocp: "Cobra os prazos exatos: 20 + 10 dias para resposta, 10 dias para recurso, e a escadinha de sigilo: Reservada (5 anos), Secreta (15 anos), Ultrassecreta (25 anos) e Pessoais (100 anos), além da vedação de exigir justificativa/motivo do solicitante."
  },
  {
    id: "leg-08", disc: "LEG", sub: "Transparência & Dados • Sinergia TI", prio: "critica", week: "S4",
    title: "8. Lei Federal nº 13.709/2018 (LGPD — Lei Geral de Proteção de Dados Pessoais)",
    resumo: "Aplica-se a tratamento de dados pessoais (pessoa natural identificada ou identificável), salvo fins exclusivamente particulares, jornalísticos/artísticos/acadêmicos, segurança pública/defesa nacional. Dados Pessoais Sensíveis (art. 5º II): origem racial/étnica, convicção religiosa, opinião política, filiação sindical/religiosa, saúde, vida sexual, genético ou biométrico. 10 Princípios (art. 6º): finalidade, adequação, necessidade (minimização), livre acesso, qualidade, transparência, segurança, prevenção, não discriminação, responsabilização/prestação de contas. Bases legais (art. 7º — 10 hipóteses: consentimento, obrigação legal, execução de políticas públicas pelo Poder Público, estudos por órgão de pesquisa, execução de contrato, exercício regular de direitos, proteção à vida, tutela da saúde, legítimo interesse [não vale para dados sensíveis!], proteção ao crédito). Agentes: Controlador (decide), Operador (trata em nome do controlador) e Encarregado/DPO (canal com titulares e ANPD). Direitos do titular (art. 18). Sanções (art. 52 — multa até 2% do faturamento limitada a R$ 50 milhões; Administração Pública não sofre multa pecuniária, mas advertência, publicização, bloqueio/eliminação!).",
    aocp: "Altíssima probabilidade de cair em Legislação E/OU TI! Cobram o rol de dados sensíveis, quem é Controlador vs Operador vs Encarregado (DPO), que Poder Público não leva multa em dinheiro (art. 52 §3º) e os princípios/bases legais."
  },
  {
    id: "leg-09", disc: "LEG", sub: "Licitações & Contratos", prio: "critica", week: "S6",
    title: "9. Lei Federal nº 14.133/2021 (Nova Lei de Licitações e Contratos Administrativos)",
    resumo: "Revogou 8.666/93, 10.520/02 (Pregão) e RDC. 22 Princípios (art. 5º — inclui segregação de funções, planejamento, transparência, desenvolvimento nacional sustentável). Fases da licitação (art. 17 — rito ordinário): (1) Preparatória (ETP, TR) → (2) Divulgação do edital → (3) Propostas e lances → (4) Julgamento → (5) Habilitação → (6) Recursal → (7) Homologação (habilitação após julgamento é a regra; inversão só motivada!). 5 Modalidades (art. 28): Pregão (obrigatório p/ bens e serviços comuns), Concorrência (obras/serviços especiais, TI especial!), Concurso, Leilão e Diálogo Competitivo (inovação/soluções complexas — NÃO existe mais Tomada de Preços nem Convite!). Critérios de julgamento (6): menor preço, maior desconto, melhor técnica ou conteúdo artístico, técnica e preço, maior lance (leilão), maior retorno econômico. Contratação direta: Inexigibilidade (inviabilidade de competição, rol exemplificativo — notória especialização, artista consagrado, fornecedor exclusivo) vs Dispensa (rol taxativo do art. 75 — limites de valor em obras/serviços eng. e outros serviços/compras, emergência/calamidade máx 1 ano improrrogável). Contratos: cláusulas exorbitantes, prorrogação serviços contínuos até 10 anos, sanções (advertência, multa, impedimento até 3a, inidoneidade 3 a 6 anos).",
    aocp: "Cobra muito: quais são as 5 modalidades atuais (pegadinha colocando Convite/Tomada de Preços!), ordem das fases (julgamento antes da habilitação), Inexigibilidade (exemplificativo/impossível competir) vs Dispensa (taxativo/viável competir) e Diálogo Competitivo."
  },
  {
    id: "leg-10", disc: "LEG", sub: "Processo Administrativo", prio: "alta", week: "S5",
    title: "10. Lei Federal nº 9.784/1999 (Processo Administrativo no âmbito da Administração Pública Federal)",
    resumo: "Princípios (art. 2º): legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público, eficiência; vedada cobrança de despesas processuais salvo previsão legal. Direitos e deveres do administrado (arts. 3º–4º). Competência: irrenunciável; pode ser delegada (salvo edição de atos normativos, decisão de recursos administrativos e competência exclusiva!) e avocada (temporariamente, para órgão hierarquicamente inferior, por motivos relevantes). Impedimento (objetivo — ex.: interesse direto/indireto, atuou como perito/testemunha, cônjuge/parente até 3º grau — dever de comunicar!) vs Suspeição (subjetivo — amizade íntima ou inimizade notória). Prazos: emissão de parecer = 15 dias; decisão após instrução = 30 dias (+30 motivado); recurso administrativo = 10 dias (tramita no máx por 3 instâncias!). Anulação (ato ilegal — pode ser pela própria Adm. ou Judiciário) vs Revogação (conveniência e oportunidade — só Adm.); Decadência para anular atos favoráveis ao administrado de boa-fé = 5 anos (art. 54).",
    aocp: "Clássicos da AOCP: os 3 casos que NÃO podem ser delegados (art. 13: ato normativo, decisão de recurso e competência exclusiva), diferença Impedimento x Suspeição, prazo de 10 dias p/ recurso e decadência de 5 anos (art. 54)."
  },
  {
    id: "leg-11", disc: "LEG", sub: "Improbidade", prio: "alta", week: "S8",
    title: "11. Lei Federal nº 8.429/1992 (Improbidade Administrativa — com alterações da Lei nº 14.230/2021)",
    resumo: "ATENÇÃO À REFORMA DE 2021 (Lei 14.230/2021)! Mudança radical: NÃO existe mais improbidade culposa — exige-se DOLO específico (vontade livre e consciente de alcançar o resultado ilícito)! Só 3 tipos de atos: (1) Enriquecimento ilícito (art. 9º — rol exemplificativo; suspensão direitos políticos até 14 anos, multa equivalente ao acréscimo, proibição contratar até 14 anos); (2) Prejuízo ao erário (art. 10 — rol exemplificativo, exige perda patrimonial efetiva; suspensão até 12 anos, multa equivalente ao dano, proibição até 12 anos); (3) Violação aos princípios da Adm. Pública (art. 11 — rol TAXATIVO após 2021! Sem suspensão de direitos políticos! Multa até 24x remuneração e proibição contratar até 4 anos). Legitimidade ativa: Ministério Público na redação da Lei 14.230/2021 (observada também a legitimidade concorrente da pessoa jurídica interessada conforme jurisprudência do STF nas ADIs 7042 e 7043). Prescrição: 8 anos contados da ocorrência do fato (ou dia em que cessou infração permanente), com marcos interruptivos de 4 anos pela metade.",
    aocp: "Cobra diretamente as mudanças da Lei 14.230/2021: fim da modalidade culposa (só DOLO), art. 11 passou a ser taxativo e NÃO gera mais suspensão de direitos políticos, e prazo prescricional de 8 anos (não mais 5 após fim do mandato!)."
  },

  // ======================== RACIOCÍNIO LÓGICO E MATEMÁTICA (Pág. 31) ========================
  {
    id: "rlm-01", disc: "RLM", sub: "RLM • Lógica Pura", prio: "critica", week: "S1",
    title: "1. Raciocínio dedutivo e Lógica Aristotélica Clássica: proposições, conectivos, quantificadores, dedução, falácias",
    resumo: "Proposições (sentenças declarativas com valor V ou F; excluir interrogativas, exclamativas, imperativas e sentenças abertas). 5 Conectivos e Tabelas-Verdade: Negação (~p), Conjunção (p ∧ q — só V se ambos V), Disjunção Inclusiva (p ∨ q — só F se ambos F), Disjunção Exclusiva (p ⊻ q — V quando diferentes), Condicional (p → q — só F na 'Vera Fischer': V → F = F!), Bicondicional (p ↔ q — V quando iguais). Equivalências da Condicional: Contrapositiva (~q → ~p) e Disjuntiva (~p ∨ q). Negações (De Morgan + Condicional): ~(p ∧ q) = ~p ∨ ~q; ~(p ∨ q) = ~p ∧ ~q; ~(p → q) = p ∧ ~q ('MANÉ': MAntém a 1ª E NEga a 2ª!). Quantificadores Aristotélicos: Todo A é B (negação: Algum A não é B); Nenhum A é B (negação: Algum A é B). Silogismos (Diagramas de Venn para 'Todo/Algum/Nenhum'), Regras de Dedução (Modus Ponens, Modus Tollens) e Falácias formais (afirmação do consequente, negação do antecedente).",
    aocp: "Cobra em TODA prova: negação do 'se... então' (MANÉ), equivalência contrapositiva (~q → ~p), negação de 'Todo/Nenhum/Algum' e validade de silogismo usando círculos de conjuntos!"
  },
  {
    id: "rlm-02", disc: "RLM", sub: "RLM • Contagem & Acaso", prio: "alta", week: "S4",
    title: "2. Análise combinatória e probabilidades em espaços amostrais finitos",
    resumo: "Princípio Fundamental da Contagem (PFC / Multiplicativo): multiplica etapas independentes ('e') e soma casos excludentes ('ou'). A ordem IMPORTA? Sim = Arranjo A(n,p) = n!/(n-p)! ou Permutação Simples P(n) = n! (Permutação com repetição = n!/(a!b!...); Circular = (n-1)!). Ordem NÃO importa? Combinação C(n,p) = n! / [p!(n-p)!] (formação de comissões, equipes, subconjuntos). Probabilidade clássica: P(A) = casos favoráveis / casos possíveis (0 ≤ P ≤ 1). Complementar: P(não A) = 1 - P(A) ('pelo menos um'). União: P(A∪B) = P(A)+P(B)-P(A∩B). Condicional e eventos independentes.",
    aocp: "Questões diretas de formação de comissões/senhas (anagramas com repetição ou restrição) e probabilidade básica com dados, urnas ou baralho (muita atenção à palavra 'ao menos um' → use o complementar!)."
  },
  {
    id: "rlm-03", disc: "RLM", sub: "RLM • Matemática Aplicada", prio: "alta", week: "S6",
    title: "3. Aritmética: operações elementares, razões e proporções, regra de três simples e composta",
    resumo: "Operações com frações e decimais, porcentagem (aumentos e descontos sucessivos: 1,10 × 0,90 = 0,99 → queda de 1%, nunca 0%!). Razão (a/b) e Proporção (a/b = c/d; divisão diretamente e inversamente proporcional!). Regra de três simples (identificar grandezas diretas vs inversas: mais trabalhadores = menos dias!). Regra de três composta: método do Processo/Produto (separe Causa × Efeito/Obra; ex.: funcionários × dias × horas/dia = produção) ou setas de proporcionalidade comparando cada coluna à coluna da incógnita X.",
    aocp: "Contextualiza situações de trabalho (servidores, máquinas, computadores processando relatórios em X dias) com regra de três inversa ou composta e descontos sucessivos."
  },
  {
    id: "rlm-04", disc: "RLM", sub: "RLM • Conjuntos", prio: "alta", week: "S7",
    title: "4. Teoria dos conjuntos: reuniões, interseções, complementos e cardinalidade",
    resumo: "Relações de pertinência (∈, ∉ entre elemento e conjunto) vs inclusão (⊂, ⊄ entre subconjunto e conjunto); Conjunto das Partes (2ⁿ subconjuntos). Operações: União (A∪B), Interseção (A∩B), Diferença (A-B: está em A e não em B), Complementar. Cardinalidade: 2 conjuntos: n(A∪B) = n(A) + n(B) - n(A∩B). 3 conjuntos: SEMPRE preencha o Diagrama de Venn de DENTRO PARA FORA (primeiro a interseção dos 3: A∩B∩C; depois as interseções de 2 subtraindo a dos 3; depois os individuais; por fim o lado de fora = nenhum).",
    aocp: "Problema clássico de pesquisa com 2 ou 3 grupos (ex.: servidores que usam Python, Java e PHP) pedindo quantos usam exatamente 1 ou nenhum. Preencher de dentro para fora evita 100% dos erros."
  },
  {
    id: "rlm-05", disc: "RLM", sub: "RLM • Geometria", prio: "media", week: "S7",
    title: "5. Geometria: problemas básicos envolvendo perímetro, área e volume",
    resumo: "Perímetro (soma de todos os lados externos; circunferência C = 2πr). Áreas planas: Quadrado (l²), Retângulo (b×h), Paralelogramo (b×h), Triângulo (b×h/2), Trapézio ((B+b)×h/2), Losango (D×d/2), Círculo (πr²). Teorema de Pitágoras (a² = b² + c²; triângulos 3-4-5 e 5-12-13). Volumes de sólidos: Cubo (a³), Paralelepípedo (a×b×c), Prisma/Cilindro (Área da base × altura = πr²h), Cone/Pirâmide (1/3 × Ab × h), Esfera (4/3 πr³). Conversão vital de unidades: 1 m³ = 1.000 litros; 1 dm³ = 1 litro; 1 m² = 10.000 cm².",
    aocp: "Cobra problemas práticos de sala/tanque/caixa d'água combinando área/volume com conversão para litros (1 m³ = 1.000 L) ou Pitágoras para achar um lado faltante antes da área."
  },

  // ======================== INFORMÁTICA BÁSICA (Pág. 31) ========================
  {
    id: "inf-01", disc: "INF", sub: "Informática • Fundamentos", prio: "media", week: "S1",
    title: "1 e 2. Conceitos básicos de Hardware e Principais softwares utilitários",
    resumo: "Hardware: Placa-mãe, CPU (UC/ULA/Registradores, clock, núcleos), memórias (RAM/ROM/Cache), periféricos (leitor código de barras = entrada; impressora/monitor = saída; tela touch/multifuncional/pendrive = E/S). Softwares utilitários: Compactadores (WinRAR, 7-Zip, WinZip — .zip/.rar/.7z), clientes de e-mail (Thunderbird, Outlook — protocolos envio SMTP vs recebimento POP3/IMAP), chat/videoconferência, reprodutores de vídeo (VLC), visualizadores de imagem e antivírus (Windows Defender).",
    aocp: "Como profissional de TI você domina o conceito, mas atenção às definições básicas escolares (ex: classificar periféricos mistos e protocolos de e-mail SMTP/POP3/IMAP)."
  },
  {
    id: "inf-02", disc: "INF", sub: "Informática • Windows", prio: "alta", week: "S1",
    title: "3. Ambientes operacionais: Windows 10 e Windows 11 (em português)",
    resumo: "Atalhos de ouro do Windows (em PT-BR): Win+E (Explorador de Arquivos), Win+D (Área de Trabalho), Win+L (Bloquear), Win+V (Histórico da Área de Transferência), Win+Tab (Visão de Tarefas / Áreas de Trabalho Virtuais), Win+Shift+S (Ferramenta de Captura), Alt+Tab (alternar janelas), Ctrl+Shift+Esc (Gerenciador de Tarefas direto!), F2 (renomear), Shift+Del (excluir permanentemente sem Lixeira). Nomes proibidos para arquivos: \\ / : * ? \" < > |. Diferenças Windows 11: Menu Iniciar centralizado por padrão, Snap Layouts (Win+Z), Widgets (Win+W), Microsoft Teams/Copilot, exigência TPM 2.0 e Secure Boot.",
    aocp: "Adora cobrar atalhos em português (Ctrl+Shift+Esc vs Ctrl+Alt+Del, Win+Shift+S, Win+V) e nomes exatos de pastas/ferramentas (Gerenciador de Tarefas, Explorador de Arquivos, Painel de Controle vs Configurações)."
  },
  {
    id: "inf-03", disc: "INF", sub: "Informática • Microsoft 365", prio: "alta", week: "S3",
    title: "4. Pacote Microsoft Office 365 (Word, Excel e PowerPoint — versão 365 em português)",
    resumo: "Extensões padrão: .docx, .xlsx, .pptx (com macro: .docm/.xlsm). Word 365 (guia Página Inicial, Inserir, Layout, Referências, Revisão, Exibir): atalhos PT-BR (Ctrl+N negrito, Ctrl+I itálico, Ctrl+S sublinhado, Ctrl+Z desfazer, Ctrl+R refazer!, Ctrl+B salvar!, Ctrl+P imprimir, Ctrl+L localizar, Ctrl+U substituir, Ctrl+T selecionar tudo!). Excel 365: referências relativas (A1) vs absolutas ($A$1 — F4 trava!), intervalo (A1:A10 dois-pontos = até) vs união (A1;A10 ponto-e-vírgula = e). Funções em PT-BR: SOMA, MÉDIA, MÁXIMO, MÍNIMO, MAIOR(intervalo;k), MENOR, CONT.SE, SOMASE, SOMASES, SE(teste;V;F), E, OU, PROCV, PROCH, PROCX, CONCATENAR. PowerPoint 365: F5 (inicia do 1º slide) vs Shift+F5 (inicia do slide atual), Slide Mestre (guia Exibir).",
    aocp: "ATENÇÃO AO PORTUGUÊS DO OFFICE! Ctrl+B salva (não Ctrl+S, que sublinha!), Ctrl+T seleciona tudo, Ctrl+U substitui! No Excel, cobra fórmulas SE/SOMASES/CONT.SE/MAIOR e diferença entre ':' e ';'."
  },
  {
    id: "inf-04", disc: "INF", sub: "Informática • Ponto Cego de Devs!", prio: "critica", week: "S5",
    title: "5. Pacote LibreOffice 7 (Writer, Calc e Impress — em português)",
    resumo: "PERIGO MÁXIMO PARA QUEM É DE TI: o LibreOffice 7 NÃO tem os mesmos atalhos nem as mesmas guias do MS Office! Extensões OpenDocument: .odt (Writer), .ods (Calc), .odp (Impress). Atalhos LibreOffice PT-BR: Ctrl+S SALVA (diferente do MS Office PT-BR que usa Ctrl+B!), Ctrl+N cria NOVO documento, Ctrl+O abre arquivo, Ctrl+B aplica NEGRITO, Ctrl+I itálico, Ctrl+U sublinhado, Ctrl+H localizar e substituir, F5 Navegador, F4 / Shift+F4 alterna referência relativa/absoluta no Calc. Menus principais: Arquivo, Editar, Exibir, Inserir, Formatar, Estilos, Tabela (no Writer!), Formulário, Ferramentas, Janela, Ajuda. No Calc: funções em português similares ao Excel (SOMA, MÉDIA, SE, PROCV, CONT.SE), Exportar diretamente como PDF (ícone na barra padrão), Pincel de Formatação = Clonar Formatação. Impress: Slide Mestre.",
    aocp: "Pegadinha clássica da AOCP: mistura menus/extensões do LibreOffice 7 com MS Office (ex: perguntar em qual menu fica a Mala Direta / Assistente de Mala Direta no Writer → menu Ferramentas, ou extensões .odt/.ods/.odp, ou diferenças entre Calc e Excel)."
  },
  {
    id: "inf-05", disc: "INF", sub: "Informática • Web & Segurança", prio: "alta", week: "S8",
    title: "6, 7 e 8. Internet, Busca na Web, Navegadores (Edge, Firefox, Chrome) e Segurança/Malwares",
    resumo: "Busca na Web (operadores Google): \"frase exata\", -excluir, site:ifg.edu.br, filetype:pdf, OR. Navegadores: Navegação Anônima/InPrivate (Ctrl+Shift+N no Chrome e Edge; Ctrl+Shift+P no Firefox! Não salva histórico/cookies localmente após fechar, MAS o provedor/empresa/site ainda vê o tráfego!). Histórico (Ctrl+H), Downloads (Ctrl+J), Favoritos (Ctrl+D), Limpar dados (Ctrl+Shift+Del), Recarregar ignorando cache (Ctrl+F5). Segurança e Malwares (Cartilha CERT.br — referência das bancas!): Vírus (precisa de hospedeiro e execução), Worm (autorreplicável pela rede sem hospedeiro!), Trojan/Cavalo de Troia (disfarçado de útil), Ransomware (sequestra/criptografa dados e exige resgate), Spyware (Keylogger/Screenlogger/Adware), Bot/Botnet/Zumbi, Backdoor, Rootkit (se esconde no sistema). Golpes: Phishing (e-mail/site falso), Pharming (envenena DNS/hosts), Engenharia Social, Brute Force, DDoS. Proteção: Firewall, IDS/IPS, Antivírus, Autenticação 2FA, HTTPS/TLS.",
    aocp: "Cobra o atalho da janela privada no Firefox (Ctrl+Shift+P) vs Chrome/Edge (Ctrl+Shift+N), diferença exata entre Vírus x Worm x Trojan x Ransomware x Rootkit (conforme Cartilha CERT.br) e Phishing x Pharming."
  }
];
// ======================== STATE & RENDERING ENGINE ========================
export const DEFAULT_STATE = {
  theme: "light",
  agenda: { weeklyHours: 8, weeklyQuestions: 30, sessions: {} },
  topics: {},
  weeks: {},
  adminChk: {},
  diadChk: {},
  cycle: { currentIndex: 0, laps: 0, hours: 0 },
  errors: [
    {
      id: "ex-1",
      disc: "TI",
      topic: "Backup Incremental vs Diferencial",
      mistake: "Confundir quais conjuntos de backup são necessários na restauração.",
      rule: "Incremental: backup completo e incrementais seguintes. Diferencial: backup completo e último diferencial. O uso do bit de arquivo depende da ferramenta.",
      mastered: false
    },
    {
      id: "ex-2",
      disc: "LEG",
      topic: "Lei 8.112/90 — Posse e Exercício",
      mistake: "Inverter os prazos de 15 e 30 dias.",
      rule: "Posse = 30 dias da publicação (admite procuração); Exercício = 15 dias da posse (ato personalíssimo).",
      mastered: false
    }
  ],
  sim: { esp: 16, port: 8, leg: 8, rlm: 4, inf: 5 },
  iq: { pct: "0", pre: false },
  expandAll: true
};
