# REQUIREMENTS

> **Projeto:** Hermes — Currency Exchange App
**Tipo:** Projeto individual · React + JavaScript · SPA · API REST (Frankfurter)
**Entrega final:** 27/10/2026
> 

> **Status da implementação (27/10/2026):** a interface, os estados e as interações estão implementados em React com dados mock em `src/App.jsx`. A camada de serviço (`services/frankfurterApi.js`) e os hooks de consulta existem, mas a integração com a API Frankfurter ainda não está ativa. Este documento descreve o comportamento-alvo do produto; as diferenças em relação ao código atual estão registradas em `COMPONENTS.md`.

### Contexto

Você foi contratado como desenvolvedor front-end por uma empresa de tecnologia financeira. A empresa deseja disponibilizar uma ferramenta para consultar taxas de câmbio, converter valores e analisar o comportamento histórico de moedas.

Hoje, os usuários consultam diferentes sites, realizam conversões manualmente e copiam informações para planilhas. A proposta é centralizar esse processo em uma **Single Page Application desenvolvida em React**.

### Público-alvo

A aplicação é voltada a pessoas que precisam consultar e comparar cotações com rapidez e clareza, sem conhecimento técnico de mercado financeiro:

| Perfil | Necessidade principal |
| --- | --- |
| Viajantes e estudantes no exterior | Converter um valor pontual e saber qual taxa foi usada. |
| Profissionais autônomos e pequenos empresários (importação, exportação, freelancers que recebem em moeda estrangeira) | Acompanhar a variação de um par de moedas ao longo do tempo para decidir o melhor momento de converter. |
| Analistas e profissionais de finanças/contabilidade | Filtrar o histórico, ordenar e exportar os dados em CSV para usar em planilhas e relatórios. |

Características comuns: uso em desktop e celular, interface em português (BR), inglês ou espanhol, e nenhuma necessidade de cadastro ou login.

### Objetivo

Disponibilizar uma SPA em React que centralize, em uma única tela, a **conversão de moedas**, a **consulta ao histórico de cotações** (gráfico e tabela), a **filtragem e ordenação dos registros** e a **exportação dos dados filtrados em CSV**, utilizando dados reais da API pública Frankfurter e eliminando a necessidade de consultar vários sites e copiar dados manualmente para planilhas.

**Objetivos específicos**

- Converter um valor entre duas moedas exibindo a taxa e a data efetiva da cotação.
- Permitir acompanhar a evolução de um par de moedas em oito períodos (7 dias a 10 anos).
- Permitir análise detalhada dos dados por meio de tabela com filtros combináveis e ordenação.
- Permitir levar os dados analisados para fora da aplicação por meio de CSV.
- Aplicar, de forma incremental e versionada, os conceitos estudados: componentização, props, `useState`, `useEffect`, custom hooks, `fetch` + `async/await` e CSS Modules.

### Escopo

### Conversor de moedas

- selecionar moeda de origem e destino;
- informar um valor;
- apresentar o valor convertido;
- exibir taxa e data efetiva da cotação;
- inverter as moedas;
- validar entradas inválidas.

### Histórico e gráfico

Disponibilizar os períodos:

- 7 dias;
- 15 dias;
- 30 dias;
- 3 meses;
- 6 meses;
- 1 ano;
- 5 anos;
- 10 anos.

O gráfico deverá atualizar quando o usuário alterar o par de moedas ou o período.

### Tabela de dados

Mostrar, no mínimo:

- data;
- moeda de origem;
- moeda de destino;
- cotação.

A tabela deverá permitir:

- filtro por intervalo de datas;
- filtro por cotação mínima e máxima;
- combinação de filtros;
- limpeza dos filtros;
- ordenação por data;
- ordenação por cotação;
- exibição da quantidade de registros encontrados.

### Exportação CSV

- exportar apenas os registros resultantes dos filtros;
- incluir cabeçalhos;
- gerar o arquivo no navegador;
- impedir exportação vazia;
- utilizar um nome de arquivo identificável.

### Fora do escopo

Não é necessário implementar:

- autenticação;
- cadastro de usuários;
- back-end próprio;
- banco de dados;
- pagamentos;
- compra ou venda real de moedas.

### Requisitos funcionais

A aplicação deverá permitir que o usuário:

- selecione duas moedas;
- informe um valor e realize a conversão;
- consulte a taxa utilizada e a data da cotação;
- acompanhe a evolução histórica do par de moedas;
- altere o período de análise;
- visualize os dados em gráfico e tabela;
- filtre e ordene os registros;
- exporte os dados filtrados em CSV.

Detalhamento rastreável (cada item é referenciado nos critérios de aceite):

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF-01 | Carregar a lista de moedas disponíveis na API e exibi-la nos seletores de origem e destino. | Alta |
| RF-02 | Permitir escolher a moeda de origem e a moeda de destino. | Alta |
| RF-03 | Permitir informar o valor a ser convertido. | Alta |
| RF-04 | Exibir o valor convertido, calculado pela aplicação a partir da taxa obtida da API. | Alta |
| RF-05 | Exibir a taxa utilizada e a data efetiva da cotação. | Alta |
| RF-06 | Inverter origem e destino com um único clique ("Trocar"), recalculando o resultado. | Alta |
| RF-07 | Validar entradas inválidas (valor vazio, não numérico, zero, negativo, moedas iguais) com mensagem clara ao usuário. | Alta |
| RF-08 | Exibir o histórico do par selecionado em um gráfico. | Alta |
| RF-09 | Disponibilizar os períodos 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A e permitir trocar entre eles. | Alta |
| RF-10 | Atualizar gráfico e tabela automaticamente quando o par de moedas ou o período mudar. | Alta |
| RF-11 | Exibir tabela com data, moeda de origem, moeda de destino e cotação. | Alta |
| RF-12 | Filtrar a tabela por intervalo de datas (inicial e/ou final). | Alta |
| RF-13 | Filtrar a tabela por cotação mínima e/ou máxima. | Alta |
| RF-14 | Combinar todos os filtros simultaneamente. | Alta |
| RF-15 | Limpar todos os filtros com uma única ação. | Alta |
| RF-16 | Ordenar a tabela por data e por cotação, em ordem crescente e decrescente. | Alta |
| RF-17 | Exibir a quantidade de registros encontrados após filtros. | Alta |
| RF-18 | Exportar em CSV exatamente os registros resultantes dos filtros (respeitando a ordenação atual), com cabeçalhos. | Alta |
| RF-19 | Impedir a exportação quando não houver registros, informando o motivo. | Alta |
| RF-20 | Gerar o CSV no navegador, com nome de arquivo identificável (par). | Alta |
| RF-21 | Exibir estados de **loading**, **erro** e **ausência de dados** nas áreas que dependem da API. | Alta |
| RF-22 | Permitir trocar o idioma da interface entre Português (BR), English e Español (seletor PT/EN/ES, conforme wireframe). | Média |

### Requisitos não funcionais

| ID | Categoria | Requisito |
| --- | --- | --- |
| RNF-01 | Tecnologia | Aplicação construída como SPA com **React + JSX** (componentes funcionais) e criada/buildada com **Vite**. |
| RNF-02 | Arquitetura | Código organizado em `components/` (atoms, molecules e organisms), `hooks/`, `services/`, `utils/`, `constants/` e `styles/`, com responsabilidades claras; lógica de negócio fora dos componentes de UI. |
| RNF-03 | Estado e efeitos | Uso de `useState` para o estado da interface e `useEffect` para consultas à API, com dependências corretas (sem requisições desnecessárias ou em loop). |
| RNF-04 | Reutilização | Pelo menos um **custom hook** para consulta ou processamento de dados (ex.: histórico de cotações). |
| RNF-05 | Integração | Consumo da API **Frankfurter** (v2) com `fetch` + `async/await`, isolado em uma camada de serviço. |
| RNF-06 | Estilo | Estilos organizados com **CSS Modules** (Tailwind v4 aplicado via `@apply`/`@reference`) e tokens de `src/styles/tokens.css`, seguindo `documentation/New Styles/`: paleta navy/blue/canvas/surface/border/muted, tipografia **Manrope** 400/600/700, escala de 8 px, raio 10 px nos controles e 14 px nos cards, borda 1 px, controles de 48 px, foco `2px solid #2563EB` com offset 2 px; sem gradientes, glassmorphism ou sombras; cards apenas nas três seções. |
| RNF-07 | Responsividade | Interface utilizável em desktop (≥1024 px), tablet (768–1023 px) e mobile (<768 px), sem rolagem horizontal da página inteira; o seletor de períodos e a tabela podem rolar internamente. |
| RNF-08 | Usabilidade | Fluxo visível em uma única página: conversor → gráfico → filtros/tabela → CSV. Rótulos claros, foco visível e ação primária destacada. |
| RNF-09 | Acessibilidade | Campos com `label`, contraste adequado entre texto e fundo, navegação por teclado nos controles, foco visível (`outline` de 2 px azul com offset de 2 px) e mensagens de erro associadas aos campos. |
| RNF-10 | Desempenho | Consultas disparadas apenas quando as dependências mudam; a troca de período/par deve exibir loading e não travar a interface, inclusive no período de 10 anos (grande volume de pontos). |
| RNF-11 | Confiabilidade | Falhas de rede ou da API não podem quebrar a aplicação: exibir mensagem de erro e permitir tentar novamente. Respostas obsoletas (de requisições anteriores) não podem sobrescrever a mais recente. |
| RNF-12 | Internacionalização | Idioma da interface em PT-BR, EN e ES, traduzindo rótulos, datas, formatação numérica, estados e cabeçalhos do CSV; códigos de moeda preservados no padrão ISO 4217 (ex.: EUR, USD). |
| RNF-13 | Privacidade | Sem autenticação, sem armazenamento de dados pessoais e sem back-end próprio; todo o processamento (inclusive CSV) ocorre no navegador. |
| RNF-14 | Versionamento | Repositório público no GitHub, branch principal `master`, com commits pequenos e semânticos (`feat:`, `refactor:`, `docs:`...) que mostrem a evolução incremental. |
| RNF-15 | Documentação | Repositório contendo README, REQUIREMENTS, COMPONENTS, FIGMA, API_TESTS e AI_USAGE e, quando aplicável, Collection do Postman exportada em JSON. |
| RNF-16 | Portabilidade | Projeto instalável e executável a partir do README (`npm install` e `npm run dev`), sem configuração manual além do descrito. |
| RNF-17 | Compatibilidade | Funcionamento nas versões atuais dos principais navegadores (Chrome, Edge, Firefox e Safari). |

## Tecnologias e conceitos obrigatórios

| Recurso | Uso no projeto |
| --- | --- |
| React + JSX | Construção da SPA com componentes funcionais. |
| Vite | Criação, desenvolvimento e build do projeto. |
| Props | Comunicação e configuração dos componentes. |
| useState | Controle de moedas, valores, períodos, filtros e estados da interface. |
| useEffect | Sincronização de efeitos e consultas à API. |
| Custom Hooks | Extração de lógica reutilizável relacionada às consultas ou processamento. |
| Fetch + async/await | Consumo da API Frankfurter. |
| CSS Modules | Organização e isolamento dos estilos. |
| Tailwind CSS | Utilitários aplicados dentro dos CSS Modules (`@apply`), com os tokens mapeados via `@theme inline`. |
| Visualização de dados | Gráfico de linha em SVG próprio, responsivo com `ResizeObserver` (sem biblioteca de gráficos). |
| Postman | Investigação e validação dos endpoints. |
| Git + GitHub | Versionamento e evidência da evolução incremental do projeto. |

### Bibliotecas permitidas

Você pode utilizar bibliotecas para apoiar a interface e funcionalidades específicas, por exemplo:

- **Lucide React** (usada para os ícones);
- Recharts ou Chart.js, date-fns e Papa Parse são permitidas pelo enunciado, mas não foram necessárias: o gráfico é um SVG próprio, as datas são formatadas com `Intl` e o CSV é gerado manualmente.

> Bibliotecas não substituem os conceitos trabalhados em aula. Deve ser possível explicar a lógica de conversão, os estados, os efeitos, os filtros, a ordenação, o consumo da API e a exportação dos dados.
> 

### Regras de negócio

**Conversão**

| ID | Regra |
| --- | --- |
| RN-01 | O valor convertido é calculado **pela aplicação**: `valor convertido = valor informado × taxa` (taxa do par origem → destino obtida da API). A API não realiza a conversão do valor. |
| RN-02 | A moeda de origem e a de destino devem ser **diferentes**. Se forem iguais, a conversão não é realizada e o usuário é avisado. |
| RN-03 | O valor informado deve ser um número **maior que zero**. São inválidos: campo vazio, texto, zero e valores negativos. O campo deve aceitar vírgula ou ponto como separador decimal. |
| RN-04 | A taxa e a **data efetiva** exibidas são as retornadas pela API. Como não há cotação publicada em todos os dias (ex.: fins de semana e feriados), a data efetiva pode ser anterior à data atual e deve ser sempre mostrada ao usuário. |
| RN-05 | O valor convertido é exibido com até 2 casas decimais (valores monetários) e a taxa com precisão maior (ex.: 4 a 6 casas), formatados conforme o idioma selecionado. |
| RN-06 | Ao **inverter** as moedas, origem e destino trocam de lugar, o valor digitado é mantido e a taxa/conversão e o histórico são recalculados para o novo par. |

**Histórico e período**

| ID | Regra |
| --- | --- |
| RN-07 | Períodos disponíveis: 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A, contados **retroativamente a partir da data atual** até hoje. |
| RN-08 | Período padrão ao abrir a aplicação: **30D**. Par padrão: **USD → BRL** (suportado pela API). |
| RN-09 | Gráfico e tabela exibem **os mesmos dados**: a tabela é derivada do histórico carregado e o gráfico acompanha o par e o período selecionados. |
| RN-10 | A tabela tem **uma linha por data com cotação publicada**. Datas sem cotação não são inventadas nem interpoladas. |
| RN-11 | Trocar o par ou o período dispara nova consulta e **reinicia os filtros** da tabela (para evitar filtros de um período antigo aplicados a dados novos). |
| RN-12 | Em caso de erro da API ou ausência de dados, a aplicação exibe mensagem específica e não mostra gráfico/tabela com dados antigos como se fossem atuais. |

**Filtros e ordenação**

| ID | Regra |
| --- | --- |
| RN-13 | Os filtros atuam **somente sobre os dados já carregados** (período selecionado); não geram novas consultas à API. |
| RN-14 | Filtro de datas: a data inicial não pode ser posterior à data final. Os limites são **inclusivos**. Pode-se informar apenas um dos limites. |
| RN-15 | Filtro de cotação: o mínimo não pode ser maior que o máximo. Os limites são **inclusivos**. Pode-se informar apenas um dos limites. |
| RN-16 | Filtros preenchidos são combinados com **E (AND)**: o registro precisa atender a todos. |
| RN-17 | "Limpar filtros" remove todos os filtros e restaura a lista completa do período. Não altera o par nem o período. |
| RN-18 | Ordenação padrão: **data decrescente** (mais recente primeiro). Clicar novamente no mesmo critério alterna entre crescente e decrescente. Apenas um critério de ordenação (data **ou** cotação) é aplicado por vez. |
| RN-19 | A quantidade de registros exibida reflete **o resultado após os filtros** (ex.: "42 de 250 registros"). |

**Exportação CSV**

| ID | Regra |
| --- | --- |
| RN-20 | O CSV contém **somente os registros resultantes dos filtros**, na ordenação atual da tabela. |
| RN-21 | O CSV inclui linha de cabeçalho com: data, moeda de origem, moeda de destino e cotação (cabeçalhos traduzidos conforme o idioma; códigos de moeda em ISO 4217). |
| RN-22 | Com **zero registros**, a exportação é bloqueada (botão desabilitado e/ou mensagem informando o motivo); nenhum arquivo vazio é gerado. |
| RN-23 | O arquivo é gerado **no navegador**, em UTF-8 com BOM, usando `;` como separador e `\r\n` entre linhas, sem enviar dados a nenhum servidor. |
| RN-24 | O nome do arquivo é identificável e inclui o par; o intervalo de datas pode ser incluído quando disponível. Exemplo: `hermes-USD-BRL.csv`. |

### Critérios de aceite.

Cada critério segue o formato **Dado / Quando / Então** e é validado manualmente (e, quando aplicável, por teste das funções) antes da entrega.

| ID | Cobre | Critério |
| --- | --- | --- |
| CA-01 | RF-01, RF-02 | **Dado** que a aplicação abriu, **quando** a lista de moedas é carregada, **então** os dois seletores exibem as moedas retornadas pela API e já há um par padrão selecionado. |
| CA-02 | RF-03, RF-04, RF-05, RN-01 | **Dado** USD → BRL e valor 100, **quando** a conversão é realizada, **então** é exibido o valor `100 × taxa`, junto com a taxa usada e a data da cotação. |
| CA-03 | RF-06, RN-06 | **Dado** um par e um valor preenchidos, **quando** o usuário clica em "Trocar", **então** origem e destino se invertem, o valor é mantido e conversão, taxa, gráfico e tabela são atualizados para o par invertido. |
| CA-04 | RF-07, RN-03 | **Dado** o campo de valor vazio, com texto, `0` ou negativo, **quando** o usuário tenta converter, **então** nenhuma conversão é exibida e aparece uma mensagem de erro explicando o problema. |
| CA-05 | RF-07, RN-02 | **Dado** origem igual ao destino, **quando** o usuário tenta converter, **então** a aplicação avisa que as moedas devem ser diferentes. |
| CA-06 | RF-09, RF-10, RN-07 | **Dado** um par selecionado, **quando** o usuário escolhe cada um dos oito períodos (7D, 15D, 30D, 3M, 6M, 1A, 5A, 10A), **então** gráfico e tabela são atualizados com dados reais cobrindo aquele intervalo, e o período ativo fica visualmente destacado. |
| CA-07 | RF-08, RF-10 | **Dado** um período selecionado, **quando** o usuário muda o par de moedas, **então** o gráfico é atualizado para o novo par sem recarregar a página. |
| CA-08 | RF-11, RN-09, RN-10 | **Dado** o histórico carregado, **quando** a tabela é exibida, **então** cada linha mostra data, moeda de origem, moeda de destino e cotação, e os valores coincidem com os pontos do gráfico. |
| CA-09 | RF-12, RN-14 | **Dado** a tabela com dados, **quando** o usuário informa um intervalo de datas, **então** só aparecem registros dentro do intervalo (limites inclusivos); se data inicial > final, é exibida mensagem de erro e os dados não são filtrados de forma incorreta. |
| CA-10 | RF-13, RN-15 | **Dado** a tabela com dados, **quando** o usuário informa cotação mínima e/ou máxima, **então** só aparecem registros dentro da faixa (limites inclusivos); se mínimo > máximo, é exibida mensagem de erro. |
| CA-11 | RF-14, RN-16 | **Dado** filtros de data e de cotação preenchidos juntos, **quando** aplicados, **então** só aparecem registros que atendem a **todos** os filtros. |
| CA-12 | RF-15, RN-17 | **Dado** filtros aplicados, **quando** o usuário clica em "Limpar filtros", **então** todos os campos são esvaziados e a tabela volta a exibir todos os registros do período. |
| CA-13 | RF-16, RN-18 | **Dado** a tabela, **quando** o usuário ordena por data ou por cotação, **então** as linhas são reordenadas corretamente (crescente/decrescente) e o critério ativo é indicado na interface. |
| CA-14 | RF-17, RN-19 | **Dado** qualquer combinação de filtros, **quando** a tabela é atualizada, **então** a quantidade de registros exibida é igual ao número de linhas resultantes. |
| CA-15 | RF-18, RN-20, RN-21 | **Dado** filtros aplicados, **quando** o usuário exporta, **então** o CSV baixado possui cabeçalho e contém exatamente as linhas visíveis na tabela, na mesma ordem. |
| CA-16 | RF-19, RN-22 | **Dado** filtros que resultam em zero registros, **quando** o usuário tenta exportar, **então** nenhum arquivo é gerado e o usuário é informado do motivo. |
| CA-17 | RF-20, RN-24 | **Dado** uma exportação válida, **quando** o download é concluído, **então** o nome do arquivo identifica o par exportado. |
| CA-18 | RF-21, RNF-11 | **Dado** que a API está indisponível ou retorna erro, **quando** a aplicação tenta carregar moedas, taxa ou histórico, **então** é exibida mensagem de erro com opção de tentar novamente, sem tela em branco ou quebra da aplicação. |
| CA-19 | RF-21 | **Dado** uma consulta em andamento, **quando** a resposta ainda não chegou, **então** é exibido indicador de loading na área afetada. |
| CA-20 | RF-21, RN-12 | **Dado** uma consulta que retorna sem dados, **quando** o resultado é renderizado, **então** é exibida mensagem de ausência de dados em vez de gráfico/tabela vazios. |
| CA-21 | RF-22, RNF-12 | **Dado** que o usuário seleciona PT, EN ou ES, **quando** o idioma muda, **então** rótulos, mensagens, formatação de datas/números e cabeçalhos do CSV passam para o idioma escolhido, mantendo os códigos ISO 4217. |
| CA-22 | RNF-07 | **Dado** uma tela de celular (~375 px de largura), **quando** a aplicação é usada, **então** todas as funcionalidades continuam acessíveis, sem rolagem horizontal da página. |
| CA-23 | RNF-03, RNF-10 | **Dado** que o usuário alterou apenas o valor digitado, **quando** a conversão é recalculada, **então** não é feita nova chamada à API para o histórico. |
| CA-24 | RNF-16 | **Dado** um computador com Node.js instalado, **quando** alguém segue o README (`npm install` e `npm run dev`), **então** a aplicação executa sem ajustes adicionais. |
| CA-25 | RNF-14, RNF-15 | **Dado** o repositório público, **quando** avaliado, **então** contém a documentação obrigatória, a Collection do Postman e um histórico de commits semânticos que evidencia a evolução incremental. |

### Entregar

- link do repositório público no GitHub;
- aplicação executável;
- documentação completa;
- link do Figma;
- Collection do Postman;
- evidências e imagens da aplicação;
- histórico de commits compatível com a evolução do projeto.

### Resultado esperado

Uma SPA em React capaz de converter moedas, consultar dados históricos, visualizar gráfico e tabela, aplicar filtros e exportar os dados selecionados em CSV.

---

### Pontos a confirmar durante a investigação da API (Postman)

Estes itens dependem do comportamento real da Frankfurter e devem ser validados em `API_TESTS.md`; se a API se comportar diferente, ajuste as regras acima:

- Formato exato da resposta de `/v2/rates` e de `/v2/rate/{from}/{to}` e como o par é identificado.
- Se há limite de intervalo ou agrupamento automático em consultas longas (5 e 10 anos), e como isso afeta a quantidade de linhas da tabela (RN-10).
- Resposta de erro para moeda inválida, intervalo inválido e datas futuras.
- Se todas as moedas listadas possuem histórico para os 10 anos (algumas podem ter começado a ser cotadas depois).
- Se o par padrão (USD → BRL) é suportado.

[COMPONENTS](https://app.notion.com/p/COMPONENTS-406f51667c7c8078af57c457bb0d3b2f?pvs=21)

[FIGMA](https://app.notion.com/p/FIGMA-406f51667c7c80ae94d0dad25285c14b?pvs=21)

[API_TESTS — Investigação da API Frankfurter com Postman](https://app.notion.com/p/API_TESTS-Investiga-o-da-API-Frankfurter-com-Postman-406f51667c7c80d7b92ae6ca8b22579e?pvs=21)