# AI_USAGE

Registro do uso de Inteligência Artificial no projeto **Hermes — Currency Exchange App**.

> **Importante:** este arquivo registra o uso de IA que **realmente** ocorreu no projeto. Os registros 1 e 2 descrevem o uso na elaboração da documentação; o registro 3 descreve a investigação da API no Postman; o registro 4 descreve a definição do Design System e das especificações responsivas; os registros 5 e 6 descrevem a implementação e a revisão da interface; o registro 7 registra a atualização da documentação técnica; o registro 8 registra a auditoria e as correções finais.

## 1. Ferramentas utilizadas

| Ferramenta | Modelo | Finalidade geral |
| --- | --- | --- |
| Claude (Anthropic) | Claude Sonnet 5.5 | Apoio na redação e estruturação da documentação do projeto e na criação da collection e dos testes de API no Postman. |
| OpenCode | DeepSeek V4.1 Flash Free | Implementação e revisão da interface, verificação responsiva no navegador, atualização da documentação e build do projeto. |
| ChatGPT (OpenAI) | GPT-6 | Definição da identidade visual, do Design System e das especificações responsivas (mobile, tablet e desktop). |

## 2. Princípios adotados

- A IA foi usada como **apoio**, e não como substituta do aprendizado: o conteúdo gerado foi lido e conferido antes de entrar no repositório e, quando necessário, ajustado.
- Os conceitos obrigatórios do projeto (props, `useState`, `useEffect`, custom hooks, `fetch` + `async/await`, filtros, ordenação, CSV) devem ser implementados e **explicáveis** pelo autor, conforme exige o enunciado.
- Toda sugestão da IA que envolva comportamento da API Frankfurter deve ser **validada no Postman** antes de ser tratada como fato.
- Nenhum dado pessoal ou credencial foi enviado à IA: o material compartilhado foi apenas o conteúdo do projeto (enunciado, documentação, código e resultados de execução das APIs).

## 3. Registro de usos

| # | Data | Ferramenta | Etapa do projeto | O que foi pedido | O que a IA produziu | O que foi revisado/alterado pelo autor |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 27/10/2026 | Claude | Etapa 1 do board: entender o problema e definir requisitos | Completar o `REQUIREMENTS.md`, que já havia sido iniciado, a partir do enunciado do projeto, do board e do wireframe/Design Guide. | Texto de público-alvo e objetivo; requisitos funcionais e não funcionais numerados; regras de negócio; critérios de aceite em formato Dado/Quando/Então; lista de pontos a validar na API. | Sem revisões relevantes: o escopo do projeto já estava bem definido e o conteúdo foi incorporado como proposto. |
| 2 | 27/10/2026 | Claude | Planejamento da arquitetura de componentes | Gerar o rascunho do `COMPONENTS.md` (componentes, responsabilidades, arquivos, props, estados e relações) e deste `AI_USAGE.md`. | Árvore de componentes, tabelas por componente, hooks, utilitários, fluxo de dados e este modelo de registro. | Sem revisões relevantes: a proposta foi adotada como base do documento. |
| 3 | 27/10/2026 | Claude | Etapa 7 do board: investigar a API no Postman | Guiar a investigação da API Frankfurter no Postman e criar os testes de API (collection e `API_TESTS.md`), a partir do enunciado, do board e dos resultados enviados pelo autor. | Roteiro de investigação; collection do Postman com 28 requests em 6 pastas e testes `pm.test`; modelo do `API_TESTS.md`, depois preenchido com os resultados reais da execução e decisões para o app. | Collection importada e executada no Postman (28 requests, 122 testes aprovados, 0 falhas); resultado da execução e response bodies copiados do Postman e enviados à IA; a resposta real do sábado contradisse uma suposição da IA e o documento foi corrigido; versão final do `API_TESTS.md` sem campos pendentes. |
| 4 | 27/10/2026 | ChatGPT (GPT-6) | Definição do Design System e especificações responsivas no Figma | Criar uma identidade visual própria para o Hermes, tomando o Design Guide de referência do professor como inspiração estrutural, mas desenvolvendo uma proposta visual diferente e mais próxima de um internet banking/fintech. Em seguida, definir medidas e comportamentos para mobile, tablet e desktop. | Direção visual Modern Fintech/Digital Banking; paleta de cores com azul-marinho, azul, ciano e cores semânticas; tipografia Manrope; escala tipográfica; espaçamentos; bordas e raios; especificações de botões, inputs, seletores, componentes de conversão, gráficos e tabelas; breakpoints, grids, medidas e adaptações responsivas. | Sem revisões relevantes: o escopo do projeto já estava bem definido e a direção visual e as especificações foram incorporadas aos frames e ao Design System como propostas. |
| 5 | 27/10/2026 | OpenCode (DeepSeek V4.1 Flash Free) | Implementação da interface | Refatorar toda a UI conforme `documentation/New Styles/` (spec, tokens e frames), mantendo a estrutura de atomic design e a separação entre JSX e CSS Modules. | Tokens em `src/styles/tokens.css`, mapeamento com `@theme inline`, reescrita dos componentes, layout responsivo, i18n PT/EN/ES, gráfico SVG, estados de tabela, validação do par e exportação CSV. | Medições no navegador em 390/768/1024/1440 px e testes das interações; lint e build sem erros; sem ajustes adicionais, pois o escopo já estava bem definido. |
| 6 | 27/10/2026 | OpenCode (DeepSeek V4.1 Flash Free) | Revisão responsiva e validação final | Conferir espaçamentos, alturas e comportamentos nos três breakpoints, corrigir divergências em relação aos frames e validar as interações e o build. | Correções de ritmo e espaçamento, mensagem única de erro do par, estado vazio compacto, skeletons, placeholders localizados, `lang` e título da página, além da verificação final. | Conferência visual e funcional no navegador; `npm run lint` e `vite build` aprovados; commit `5687c5d` publicado no GitHub; sem revisões adicionais. |
| 7 | 27/10/2026 | OpenCode (DeepSeek V4.1 Flash Free) | Atualização da documentação técnica | Atualizar `COMPONENTS.md`, `REQUIREMENTS.md` e `FIGMA.md` para refletir a estrutura em atomic design, os tokens do New Styles, o gráfico SVG, os textos PT/EN/ES e o estado atual da integração com a API. | `COMPONENTS.md` reescrito com a árvore real, props, hooks, utilitários e fluxo de dados; `REQUIREMENTS.md` alinhado a estilo, responsividade, versionamento, CSV e gráfico próprio; `FIGMA.md` atualizado com tokens, medidas de controles, breakpoints, layout e uma seção de implementação. | Revisão contra o código em `src/` e a spec `documentation/New Styles/HERMES_UI_SPEC.md`, sem alterações adicionais. |
| 8 | 03/11/2026 | OpenCode (DeepSeek V4.1 Flash Free) | Auditoria e correções finais | Comparar a implementação com os requisitos, corrigir problemas funcionais e criar testes automatizados antes da entrega | Validação de filtros (faixas invertidas), parse de data por idioma, botão "Converter" com ação de confirmação, estados de carregamento/erro da lista de moedas, correção de fuso na formatação de datas, BOM na geração do CSV, 81 testes com Vitest e atualização de `README.md`, `COMPONENTS.md`, `API_TESTS.md`, `FIGMA.md`, `REQUIREMENTS.md` e `FUNCTION_TESTS.md` | Sem revisões adicionais: as correções foram validadas por `npm run test` (81 testes), `npm run lint` e `npm run build`, e a conferência final no navegador foi feita pelo autor. |

> **Observação:** a linha 4 registra a definição do Design System e das especificações responsivas, anterior à implementação no OpenCode.

## 4. Detalhamento (opcional, um bloco por uso relevante)

### Uso 1 — Requisitos

- **Contexto:** o `REQUIREMENTS.md` tinha as seções de contexto, escopo, requisitos funcionais e tecnologias preenchidas. Faltavam público-alvo, objetivo, requisitos não funcionais, regras de negócio e critérios de aceite.
- **Material fornecido à IA:** o texto do projeto exportado do Notion, o board de desenvolvimento, o rascunho de `REQUIREMENTS.md`, o wireframe de baixa fidelidade e o Design Guide.
- **Resultado:** documento completo com IDs rastreáveis (RF, RNF, RN, CA).
- **Limitação identificada:** a IA não conseguiu acessar a API Frankfurter; por isso o comportamento real da API (formato das respostas, erros, limites, fins de semana) foi deixado como **ponto a confirmar no Postman**.
- **Decisões que não vieram do enunciado e foram assumidas na proposta:** perfis de público-alvo, período padrão (30D), par padrão (USD → BRL), reinício dos filtros ao trocar par/período, inclusão do seletor de idioma PT/EN/ES (vindo do wireframe e do Design Guide). Todas foram mantidas na versão final do documento, sem necessidade de alteração.

### Uso 2 — Componentes

- **Contexto:** planejar a divisão da interface em componentes antes/durante a implementação (etapa 4 do board).
- **Resultado:** proposta de árvore de componentes, hooks (`useCurrencies`, `useLatestRate`, `useHistoricalRates`, `useRateFilters`), utilitários e fluxo de estado.
- **Limitação:** a proposta foi feita a partir dos requisitos e do wireframe, sem ver o código do projeto. O `COMPONENTS.md` foi posteriormente conferido contra o código real (Usos 7 e 8).

### Uso 3 — Investigação da API no Postman

- **Contexto:** etapa 7 do board ("Investigar a API no Postman"). O enunciado pede investigar os endpoints da API Frankfurter e entregar a Collection do Postman e o `API_TESTS.md`. A conversa ocorreu em 27/10/2026, dia da entrega, antes da implementação no OpenCode.
- **Material fornecido à IA:** o export do Notion (enunciado, board, wireframe e Design Guide); depois o JSON com o resultado da execução da collection no Postman; depois os response bodies copiados do Postman (lista de moedas, detalhe de uma moeda, EUR → USD, consulta num sábado e erro 422).
- **Resultado:** a collection `Currency-Exchange-Frankfurter.postman_collection.json`, com 28 requests em 6 pastas (moedas, cotação atual, cotação em data específica, histórico por período, erros e casos de borda, CSV), testes automatizados e datas dos períodos calculadas por script; um modelo de `API_TESTS.md`; e a versão final preenchida com a execução (28 requests, 122 testes aprovados, 0 falhas), as estruturas reais das respostas, os erros 422 e 404 e as decisões para o app (validar `EUR → EUR` e `from > to` antes de chamar a API, tratar 404 como "sem dados", considerar filtrar criptomoedas e metais do seletor e traduzir os nomes das moedas).
- **Validação:** feita pelo autor no Postman. A IA não conseguiu chamar a API a partir do seu ambiente (rede bloqueada); o que consta no `API_TESTS.md` sobre o comportamento real da API vem da execução e dos bodies enviados pelo autor.
- **Erro da IA identificado e corrigido:** a primeira versão do `API_TESTS.md` afirmava que, num sábado, a API devolveria a cotação do último dia publicado (suposição feita a partir da documentação). O body real de `date=2024-05-04` devolveu a própria data pedida, e o documento foi corrigido.
- **Limitação identificada:** o resultado do Runner não inclui o corpo das respostas, então a quantidade de registros e o tamanho de cada período não foram registrados (só os tempos de resposta). Os casos `EUR → EUR` e `from > to` foram documentados apenas como "retorna 200, a API não rejeita", sem o corpo. O nome do teste do sábado na collection ("usa último dia publicado") ficou impreciso depois da correção.

### Uso 4 — Design System e responsividade

- **Contexto:** o projeto precisava de uma identidade visual própria para orientar a construção da interface no Figma. Havia um Design Guide de referência fornecido pelo professor, mas a intenção era desenvolver uma proposta visual diferente, mais moderna e alinhada à estética de aplicações financeiras e internet banking.
- **Material fornecido à IA:** documentação do projeto Hermes — Currency Exchange App, incluindo seus objetivos, requisitos e funcionalidades; imagem do Design Guide utilizado como referência pelo professor; e informações discutidas durante a elaboração da interface e do planejamento visual.
- **Resultado:** definição de uma direção visual baseada no conceito Modern Fintech/Digital Banking, com uma paleta própria de cores, utilizando azul-marinho como cor institucional, azul e ciano como cores de ação e destaque, além de verde e vermelho para estados semânticos. Foi proposta a utilização da tipografia Manrope, uma escala tipográfica, sistema de espaçamento baseado em múltiplos de 8 px, padrões de bordas, raios e dimensões de controles. Também foram especificados componentes importantes da aplicação, como botões, campos de entrada, seletores de moeda, resultado da conversão, seletor de períodos, gráfico, tabela e filtros.

  Posteriormente, foram acrescentadas especificações responsivas para três categorias de dispositivos:

  - **Mobile:** 0–767 px, com layout em coluna única, espaçamento lateral de 16 px e componentes adaptados para telas menores.
  - **Tablet:** 768–1023 px, com grid de 8 colunas, espaçamento lateral de 24 px e reorganização dos componentes.
  - **Desktop:** a partir de 1024 px, com grid de 12 colunas, espaçamento lateral de 32 px e largura máxima de conteúdo de 1200 px.

  Também foram definidos comportamentos específicos para dispositivos móveis, como empilhamento dos controles de conversão, rolagem horizontal interna do seletor de períodos e da tabela, redução de alturas tipográficas e adaptação de botões e campos para ocupar a largura disponível.
- **Limitação identificada:** as especificações foram elaboradas como orientação para a construção do Design System e dos frames no Figma. As medidas e comportamentos propostos precisavam ser conferidos durante a montagem dos layouts e posteriormente validados na implementação real, especialmente em relação à legibilidade, acessibilidade, contraste e adaptação dos componentes em diferentes resoluções.

### Uso 5 — Implementação da interface

- **Contexto:** o projeto já estava organizado em atomic design (`atoms`, `molecules`, `organisms`), mas a interface ainda não seguia o novo design system. Era necessário aplicar `documentation/New Styles/` em toda a tela, nos breakpoints de desktop (≥1024 px), tablet (768–1023 px) e mobile (<768 px).
- **Material fornecido à IA:** `HERMES_UI_SPEC.md`, `tokens.css`/`tokens.json`, os frames (desktop, tablet, mobile, estados e componentes), os HTML de referência (`Main`, `Tablet`, `Mobile`, `States` e `Components`) e o código atual em `src/`.
- **Resultado:** `src/styles/tokens.css` como fonte única dos tokens; mapeamento via `@theme inline` em `src/index.css`; reescrita de átomos, moléculas e organismos com CSS Modules mobile-first; layout sem rolagem horizontal; i18n PT/EN/ES ampliado em `constants/i18n.js`, com `document.documentElement.lang` sincronizado; validação do par de moedas; gráfico de histórico em SVG sem dependências, medido por `ResizeObserver`; estados de carregamento, vazio e erro; exportação CSV; ícones `lucide-react`.
- **Decisões tomadas durante a implementação:** tokens em arquivo sem `@layer` para prevalecerem sobre o tema do Tailwind; `md:` e `lg:` usados como tablet e desktop; alturas do gráfico de 280/320/360 px; eixos do gráfico gerados a partir dos dados; placeholders de data e valor localizados; estado vazio compacto; conversão calculada em tempo real com a taxa mock, mantendo o botão Converter como elemento visual. Essa última decisão foi revista no Uso 8, quando a API passou a ser a fonte da taxa e o botão ganhou uma ação de confirmação.
- **Limitação identificada:** os frames mostram 6 linhas na tabela e eixos fixos no gráfico, enquanto o app usa os 21 registros mock e eixos calculados; a fidelidade foi mantida no layout, não nos dados. A conferência visual foi feita por medições no navegador, não por comparação pixel a pixel automatizada.

### Uso 6 — Revisão responsiva e validação

- **Contexto:** após a refatoração, era preciso conferir espaçamentos, alturas e comportamentos nos três breakpoints, corrigir divergências em relação aos frames e validar as interações.
- **Material fornecido à IA:** a spec, os frames e a aplicação rodando localmente.
- **Resultado:** correções de espaçamento (par de moedas no mobile, resultado no tablet, ritmo da tabela), mensagem única de erro do par, estado vazio compacto, nota de exportação inline, skeletons conforme os frames, placeholders localizados e `lang`/título da página atualizados. Verificação em 390/768/1024/1440 px e testes de validação, filtros, ordenação, limpeza, períodos, troca de idioma, CSV e estados vazios.
- **Validação técnica:** `npm run lint` e `vite build` sem erros; console do navegador sem erros; commit `5687c5d` (`feat: align UI with New Styles design system`) publicado no repositório.
- **Limitação identificada:** as medições foram feitas com o navegador a 125% de zoom (bordas de 0,8 px e outlines de 2,4 px), então os valores foram normalizados para CSS px; a comparação com os frames foi manual.

### Uso 7 — Atualização da documentação

- **Contexto:** depois da refatoração, `COMPONENTS.md`, `REQUIREMENTS.md` e `FIGMA.md` ainda descreviam a estrutura antiga (componentes fora do atomic design, Design Guide com Inter, biblioteca de gráficos e fluxo `main` + `dev`), enquanto o código já usava tokens do New Styles, Manrope, SVG próprio e branch `master`.
- **Material fornecido à IA:** o código em `src/`, a spec `documentation/New Styles/HERMES_UI_SPEC.md`, os tokens, os frames e os três documentos existentes.
- **Resultado:** `COMPONENTS.md` reescrito com a árvore de atoms/molecules/organisms, props reais, hooks, utilitários, fluxo de dados e pendências de integração; `REQUIREMENTS.md` atualizado em estilo, arquitetura, responsividade, acessibilidade, versionamento, documentação, CSV e escolha do gráfico; `FIGMA.md` alinhado aos tokens, medidas de controles, breakpoints, layout real e uma seção de implementação.
- **Decisões documentadas:** naquele momento a implementação usava dados mock; os hooks e o serviço da API existiam, mas a integração ainda não estava ativa. A integração foi concluída depois, nos commits `f2bcdc2` e `d51e4fd`. O gráfico é SVG próprio; o CSV usa `;`, BOM e o nome `hermes-<par>.csv`.
- **Limitação identificada:** a atualização foi feita por leitura do código e da spec, sem alterar comportamento. Também ficou registrada uma inconsistência: no idioma EN, o placeholder de data mostrava `mm/dd/yyyy`, mas o parser aceitava `dd/mm/aaaa` e ISO. Essa inconsistência foi resolvida no Uso 8, com um formato de data por idioma.

### Uso 8 — Auditoria e correções finais

- **Contexto:** antes da entrega, era necessário confirmar a implementação real contra os requisitos, corrigir problemas funcionais pendentes e criar uma verificação automatizada das regras de negócio.
- **Material fornecido à IA:** `AGENTS.md`, `documentation/REQUIREMENTS.md`, `documentation/COMPONENTS.md`, `documentation/New Styles/HERMES_UI_SPEC.md`, o plano de implementação e o código em `src/`.
- **Resultado:** a validação de filtros passou a recusar faixas invertidas sem esvaziar a tabela; o parse de data agora segue o idioma da interface (PT/ES `dd/mm/aaaa`, EN `mm/dd/yyyy`, ISO sempre); o botão "Converter" confirma o valor digitado sem nova consulta de taxa; a lista de moedas tem estado de carregamento e erro com nova tentativa; a formatação de datas usa UTC; o CSV ganhou BOM no próprio gerador; foram adicionados 81 testes com Vitest; e a documentação técnica (README, componentes, API, design e requisitos) foi atualizada.
- **Decisões tomadas:** manter a conversão dependente da taxa já carregada (nenhuma requisição extra); suspender a filtragem quando a faixa é inválida; não vincular protótipo externo, usando os frames de `documentation/New Styles/` como referência visual.
- **Validação técnica executada pela IA:** `npm run test` (8 arquivos, 81 testes aprovados), `npm run lint` e `npm run build`, todos sem erro.
- **Validação do autor:** a conferência visual no navegador (responsividade em desktop, tablet e mobile, navegação por teclado e os três idiomas) e o download do arquivo CSV foram verificados diretamente na aplicação antes da entrega.

## 5. O que foi feito sem IA

Nenhuma etapa relevante do projeto foi conduzida sem apoio de IA. A documentação (requisitos, componentes, Design System, investigação da API e este registro), a collection do Postman, a implementação da interface, os testes automatizados e a revisão final foram produzidos com o auxílio das ferramentas listadas na seção 1.

O papel do autor foi o de direcionar o trabalho: definir o escopo, escolher o que seria aproveitado, executar as validações que dependiam do ambiente local (Postman, navegador e build) e decidir quando cada entrega estava concluída. Mesmo essas etapas partiram de material gerado ou revisado com IA — não houve uma frente do projeto desenvolvida de forma independente das ferramentas.

## 6. Reflexão

O maior aprendizado do projeto não foi sobre React ou sobre a API Frankfurter, mas sobre como trabalhar com uma IA no ambiente local de desenvolvimento. Diferente de usar um chat isolado, a IA integrada ao projeto lê os arquivos, executa comandos, altera o código e roda lint, testes e build — o que acelera muito o trabalho, mas exige que o autor mantenha o controle do que está sendo alterado.

Na prática, isso significou aprender a dar contexto: manter o `AGENTS.md` e a pasta `documentation/` atualizados teve efeito direto na qualidade das respostas. Também ficou claro que a IA precisa ser tratada como uma colaboradora que erra. Em um dos usos, ela afirmou, a partir da documentação, que a API devolveria em um sábado a cotação do último dia publicado; a execução real no Postman mostrou outro resultado e o documento foi corrigido. Sem essa verificação, o erro teria entrado na entrega.

O processo que funcionou foi iterativo e verificável: pedir uma mudança pequena, ler o diff, rodar `npm run lint`, `npm run test` e `npm run build`, conferir no navegador e só então seguir. Os testes automatizados criados no final passaram a funcionar como rede de segurança para as regras de negócio (conversão, filtros, ordenação e CSV), permitindo alterar o código com mais confiança.

A conclusão é que a IA acelerou a execução e ajudou a organizar o projeto, mas não substituiu o entendimento: as decisões de arquitetura, a validação dos dados e a responsabilidade pelo que foi entregue continuaram sendo do autor.

## 7. Pendências de preenchimento

Nenhuma: todos os registros, colunas e seções deste documento foram preenchidos.