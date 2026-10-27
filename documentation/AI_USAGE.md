# AI_USAGE

Registro do uso de Inteligência Artificial no projeto **Hermes — Currency Exchange App**.

> **Importante:** este arquivo precisa refletir o que **realmente** aconteceu no seu projeto. Os registros 1 e 2 descrevem o uso na elaboração da documentação; os registros 3 e 4 estão reservados para os usos anteriores à implementação no OpenCode; os registros 5 e 6 descrevem a implementação e a revisão da interface; o registro 7 registra a atualização da documentação técnica. Se você usou IA em outras etapas (código, testes, CSS, dúvidas, etc.), adicione uma linha na tabela da seção 3 e, se quiser, uma ficha na seção 4. Itens entre `[colchetes]` são para você preencher ou conferir.

## 1. Ferramentas utilizadas

| Ferramenta | Modelo | Finalidade geral |
| --- | --- | --- |
| Claude (Anthropic) | Claude Sonnet 5.5 | Apoio na redação e estruturação da documentação do projeto. |
| OpenCode | DeepSeek V4.1 Flash Free | Implementação e revisão da interface, verificação responsiva no navegador, atualização da documentação e build do projeto. |
| `[outra ferramenta, se houver]` | `[modelo]` | `[finalidade]` |

## 2. Princípios adotados

- A IA foi usada como **apoio**, e não como substituta do aprendizado: o conteúdo gerado foi lido, revisado e ajustado antes de entrar no repositório.
- Os conceitos obrigatórios do projeto (props, `useState`, `useEffect`, custom hooks, `fetch` + `async/await`, filtros, ordenação, CSV) devem ser implementados e **explicáveis** pelo autor, conforme exige o enunciado.
- Toda sugestão da IA que envolva comportamento da API Frankfurter deve ser **validada no Postman** antes de ser tratada como fato.
- Nenhum dado pessoal ou credencial foi enviado à IA. `[confirme]`

## 3. Registro de usos

| # | Data | Ferramenta | Etapa do projeto | O que foi pedido | O que a IA produziu | O que foi revisado/alterado pelo autor |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 27/10/2026 | Claude | Etapa 1 do board: entender o problema e definir requisitos | Completar o `REQUIREMENTS.md`, que já havia sido iniciado, a partir do enunciado do projeto, do board e do wireframe/Design Guide. | Texto de público-alvo e objetivo; requisitos funcionais e não funcionais numerados; regras de negócio; critérios de aceite em formato Dado/Quando/Então; lista de pontos a validar na API. | `[descreva: o que você mudou, removeu ou confirmou, p. ex. par e período padrão, itens de idioma PT/EN/ES, perfis de público]` |
| 2 | 27/10/2026 | Claude | Planejamento da arquitetura de componentes | Gerar o rascunho do `COMPONENTS.md` (componentes, responsabilidades, arquivos, props, estados e relações) e deste `AI_USAGE.md`. | Árvore de componentes, tabelas por componente, hooks, utilitários, fluxo de dados e este modelo de registro. | `[descreva: ajustes de nomes, props e estados conforme o código real do seu projeto]` |
| 3 | `[dd/mm/aaaa]` | `[ferramenta]` | `[etapa anterior à implementação]` | `[pedido]` | `[resultado]` | `[revisão]` |
| 4 | `[dd/mm/aaaa]` | `[ferramenta]` | `[etapa anterior à implementação]` | `[pedido]` | `[resultado]` | `[revisão]` |
| 5 | 27/10/2026 | OpenCode (DeepSeek V4.1 Flash Free) | Implementação da interface | Refatorar toda a UI conforme `documentation/New Styles/` (spec, tokens e frames), mantendo a estrutura de atomic design e a separação entre JSX e CSS Modules. | Tokens em `src/styles/tokens.css`, mapeamento com `@theme inline`, reescrita dos componentes, layout responsivo, i18n PT/EN/ES, gráfico SVG, estados de tabela, validação do par e exportação CSV. | Medições no navegador em 390/768/1024/1440 px e testes das interações; lint e build sem erros. `[descreva o que você conferiu ou ajustou depois]` |
| 6 | 27/10/2026 | OpenCode (DeepSeek V4.1 Flash Free) | Revisão responsiva e validação final | Conferir espaçamentos, alturas e comportamentos nos três breakpoints, corrigir divergências em relação aos frames e validar as interações e o build. | Correções de ritmo e espaçamento, mensagem única de erro do par, estado vazio compacto, skeletons, placeholders localizados, `lang` e título da página, além da verificação final. | Conferência visual e funcional no navegador; `npm run lint` e `vite build` aprovados; commit `5687c5d` publicado no GitHub. `[acrescente o que você revisou]` |
| 7 | 27/10/2026 | OpenCode (DeepSeek V4.1 Flash Free) | Atualização da documentação técnica | Atualizar `COMPONENTS.md`, `REQUIREMENTS.md` e `FIGMA.md` para refletir a estrutura em atomic design, os tokens do New Styles, o gráfico SVG, os textos PT/EN/ES e o estado atual da integração com a API. | `COMPONENTS.md` reescrito com a árvore real, props, hooks, utilitários e fluxo de dados; `REQUIREMENTS.md` alinhado a estilo, responsividade, versionamento, CSV e gráfico próprio; `FIGMA.md` atualizado com tokens, medidas de controles, breakpoints, layout e uma seção de implementação. | Revisão contra o código em `src/` e a spec `documentation/New Styles/HERMES_UI_SPEC.md`. `[confirme o que você revisou ou ajustou]` |

> **Espaço reservado:** as linhas 3 e 4 são para os usos anteriores à implementação no OpenCode; duplique-as se precisar de mais registros e renumere as seguintes. Adicione uma linha por uso relevante (código, correção de bug, explicação de conceito, CSS, testes, textos do README, etc.).

## 4. Detalhamento (opcional, um bloco por uso relevante)

### Uso 1 — Requisitos

- **Contexto:** o `REQUIREMENTS.md` tinha as seções de contexto, escopo, requisitos funcionais e tecnologias preenchidas. Faltavam público-alvo, objetivo, requisitos não funcionais, regras de negócio e critérios de aceite.
- **Material fornecido à IA:** o texto do projeto exportado do Notion, o board de desenvolvimento, o rascunho de `REQUIREMENTS.md`, o wireframe de baixa fidelidade e o Design Guide.
- **Resultado:** documento completo com IDs rastreáveis (RF, RNF, RN, CA).
- **Limitação identificada:** a IA não conseguiu acessar a API Frankfurter; por isso o comportamento real da API (formato das respostas, erros, limites, fins de semana) foi deixado como **ponto a confirmar no Postman**.
- **Decisões que não vieram do enunciado e foram assumidas na proposta:** perfis de público-alvo, período padrão (30D), par padrão (USD → BRL), reinício dos filtros ao trocar par/período, inclusão do seletor de idioma PT/EN/ES (vindo do wireframe e do Design Guide). `[confirme se aceitou, alterou ou removeu cada uma]`

### Uso 2 — Componentes

- **Contexto:** planejar a divisão da interface em componentes antes/durante a implementação (etapa 4 do board).
- **Resultado:** proposta de árvore de componentes, hooks (`useCurrencies`, `useLatestRate`, `useHistoricalRates`, `useRateFilters`), utilitários e fluxo de estado.
- **Limitação:** a proposta foi feita a partir dos requisitos e do wireframe, sem ver o código do projeto. `[atualize o COMPONENTS.md se o código final divergir]`

### Uso 3 — `[preencha: uso anterior à implementação]`

- **Contexto:** `[contexto]`
- **Material fornecido à IA:** `[material]`
- **Resultado:** `[resultado]`
- **Limitação identificada:** `[limitação]`

### Uso 4 — `[preencha: uso anterior à implementação]`

- **Contexto:** `[contexto]`
- **Material fornecido à IA:** `[material]`
- **Resultado:** `[resultado]`
- **Limitação identificada:** `[limitação]`

### Uso 5 — Implementação da interface

- **Contexto:** o projeto já estava organizado em atomic design (`atoms`, `molecules`, `organisms`), mas a interface ainda não seguia o novo design system. Era necessário aplicar `documentation/New Styles/` em toda a tela, nos breakpoints de desktop (≥1024 px), tablet (768–1023 px) e mobile (<768 px).
- **Material fornecido à IA:** `HERMES_UI_SPEC.md`, `tokens.css`/`tokens.json`, os frames (desktop, tablet, mobile, estados e componentes), os HTML de referência (`Main`, `Tablet`, `Mobile`, `States` e `Components`) e o código atual em `src/`.
- **Resultado:** `src/styles/tokens.css` como fonte única dos tokens; mapeamento via `@theme inline` em `src/index.css`; reescrita de átomos, moléculas e organismos com CSS Modules mobile-first; layout sem rolagem horizontal; i18n PT/EN/ES ampliado em `constants/i18n.js`, com `document.documentElement.lang` sincronizado; validação do par de moedas; gráfico de histórico em SVG sem dependências, medido por `ResizeObserver`; estados de carregamento, vazio e erro; exportação CSV; ícones `lucide-react`.
- **Decisões tomadas durante a implementação:** tokens em arquivo sem `@layer` para prevalecerem sobre o tema do Tailwind; `md:` e `lg:` usados como tablet e desktop; alturas do gráfico de 280/320/360 px; eixos do gráfico gerados a partir dos dados; placeholders de data e valor localizados; estado vazio compacto; conversão calculada em tempo real com a taxa mock, mantendo o botão Converter como elemento visual.
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
- **Decisões documentadas:** a implementação atual usa dados mock; os hooks e o serviço da API existem, mas a integração ainda não está ativa; o gráfico é SVG próprio; o CSV usa `;`, BOM e o nome `hermes-<par>.csv`; os filtros podem ser reiniciados ao trocar par/período quando a API for ligada.
- **Limitação identificada:** a atualização foi feita por leitura do código e da spec, sem alterar comportamento. Também ficou registrada uma inconsistência a corrigir: no idioma EN, o placeholder de data mostra `mm/dd/yyyy`, mas o parser aceita `dd/mm/aaaa` e ISO.

`[Adicione outros blocos conforme necessário.]`

## 5. O que foi feito sem IA

`[Liste o que foi feito por conta própria, para deixar a divisão clara. Exemplos: protótipo no Figma, testes no Postman, implementação dos componentes, lógica de filtros e CSV, commits. Preencha apenas o que for verdade.]`

## 6. Reflexão

`[2 a 4 frases: o que a IA ajudou a entender ou acelerar, onde errou ou foi insuficiente, e como você verificou as respostas (Postman, testes, leitura da documentação oficial).]`
