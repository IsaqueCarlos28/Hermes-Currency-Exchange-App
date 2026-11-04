# Hermes — Currency Exchange App

SPA em React para conversão de moedas e análise de histórico de câmbio, usando dados reais da API pública [Frankfurter](https://frankfurter.dev).

O projeto centraliza em uma única tela a conversão entre duas moedas, a evolução histórica do par, a filtragem e a ordenação dos registros e a exportação dos dados em CSV — evitando consultas espalhadas em vários sites e a cópia manual para planilhas.

## Funcionalidades

- **Conversor** com moeda de origem, moeda de destino e valor; exibe o valor convertido, a taxa aplicada e a data efetiva da cotação.
- **Troca de moedas** com um clique, preservando o valor digitado e recalculando taxa, gráfico e tabela.
- **Histórico** do par em oito períodos: 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A.
- **Gráfico de linha** em SVG próprio, responsivo, com a variação percentual do período.
- **Tabela** com filtros combináveis por intervalo de datas e por cotação mínima/máxima, ordenação por data ou cotação e contagem de registros.
- **Exportação CSV** apenas dos registros filtrados, na ordenação atual, com cabeçalhos traduzidos, UTF-8 com BOM, separador `;` e quebras `\r\n`.
- **Interface em PT-BR, EN e ES**, com formatação de datas, números e cotações por idioma e códigos de moeda preservados no padrão ISO 4217.
- **Estados de loading, erro (com nova tentativa) e ausência de dados** nas três áreas que dependem da API.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 19 + JavaScript (JSX) | Componentes funcionais, props, `useState`, `useEffect` e custom hooks |
| Vite 7 | Servidor de desenvolvimento, build e execução dos testes |
| CSS Modules + Tailwind CSS v4 | Estilos por componente, com utilitários via `@apply` e tokens do design system |
| Lucide React | Ícones |
| Vitest | Testes automatizados das funções de negócio |
| Frankfurter API v2 | Cotações atuais e histórico |

O gráfico é um SVG próprio (sem biblioteca de gráficos), as datas são formatadas com `Intl` e o CSV é montado manualmente.

## Instalação

Requisitos: Node.js 20.19+ (o projeto foi executado com Node 24) e npm.

```bash
git clone https://github.com/IsaqueCarlos28/Hermes-Currency-Exchange-App.git
cd Hermes-Currency-Exchange-App
npm install
```

## Executando localmente

```bash
npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # build de produção em dist/
npm run preview   # pré-visualiza o build de produção
npm run lint      # análise estática com ESLint
npm run test      # testes automatizados com Vitest
```

Nenhuma variável de ambiente ou chave de API é necessária: a Frankfurter é pública e não exige autenticação.

## Estrutura do projeto

```
src/
├── components/
│   ├── atoms/        # Button, Input, Select, Label, estados, ícones e botões simples
│   ├── molecules/    # AmountInput, CurrencySelect, ConversionResult, FiltersPanel, RateChart, ...
│   └── organisms/    # Header, CurrencyConverter, HistorySection, RatesTable, RatesTableSection
├── constants/        # padrões, períodos e textos PT/EN/ES
├── hooks/            # useCurrencies, useLatestRate, useHistoricalRates, useRateFilters
├── services/         # cliente da API Frankfurter e adaptadores de resposta
├── styles/           # tokens do design system
├── utils/            # conversão, validação, datas, filtros, ordenação, formatação e CSV
└── mocks/            # fixture de payloads da API (não usada em tempo de execução)
documentation/        # requisitos, componentes, API, design e uso de IA
```

As funções puras de `src/utils/` e `src/services/` têm testes ao lado do arquivo (`*.test.js`).

## Integração com a API Frankfurter

Toda a comunicação fica em `src/services/frankfurterApi.js` (base `https://api.frankfurter.dev`), e a normalização das respostas em `src/services/frankfurterAdapters.js`:

| Rota | Uso na aplicação |
| --- | --- |
| `GET /v2/currencies` | Lista de moedas que popula os seletores |
| `GET /v2/rate/{from}/{to}` | Taxa atual e data efetiva usadas pelo conversor |
| `GET /v2/rates?base=&quotes=&from=&to=` | Histórico do par no período selecionado |

Consultas são disparadas apenas quando o par ou o período mudam. Os hooks usam `AbortController` e um identificador de requisição para cancelar chamadas anteriores e descartar respostas obsoletas, e expõem `retry` para a ação de tentar novamente. Erros da API não são exibidos crus: a interface mostra mensagens traduzidas.

A conversão do valor é feita no navegador (`valor × taxa`); a API fornece apenas a taxa. O comportamento observado dos endpoints, os cenários de erro e os testes de investigação estão em [`documentation/API_TESTS.md`](documentation/API_TESTS.md).

## Documentação

- [`documentation/REQUIREMENTS.md`](documentation/REQUIREMENTS.md) — requisitos funcionais, não funcionais, regras de negócio e critérios de aceite.
- [`documentation/COMPONENTS.md`](documentation/COMPONENTS.md) — árvore de componentes, props, hooks e utilitários.
- [`documentation/FIGMA.md`](documentation/FIGMA.md) — design system e referências visuais.
- [`documentation/API_TESTS.md`](documentation/API_TESTS.md) — investigação da API Frankfurter e Collection do Postman.
- [`documentation/AI_USAGE.md`](documentation/AI_USAGE.md) — registro do uso de IA no projeto.
- [`documentation/FUNCTION_TESTS.md`](documentation/FUNCTION_TESTS.md) — cobertura dos testes automatizados.
- [`documentation/Currency-Exchange-Frankfurter.postman_collection.json`](documentation/Currency-Exchange-Frankfurter.postman_collection.json) — Collection exportada do Postman.

## Referências visuais

As telas foram construídas a partir das referências visuais de `documentation/New Styles/`: a especificação [`HERMES_UI_SPEC.md`](documentation/New%20Styles/HERMES_UI_SPEC.md), os tokens e os frames de layout, estados e componentes.

| Referência | Arquivo |
| --- | --- |
| Desktop (1440 px) | `documentation/New Styles/01-desktop-1440.png` |
| Tablet (768 px) | `documentation/New Styles/02-tablet-768.png` |
| Mobile (390 px) | `documentation/New Styles/03-mobile-390.png` |
| Estados | `documentation/New Styles/04-estados.png` |
| Componentes | `documentation/New Styles/05-componentes.png` |

## Verificação

Antes da entrega, execute:

```bash
npm run lint
npm run build
npm run test
```

A verificação manual no navegador (responsividade em desktop/tablet/mobile, navegação por teclado, download do CSV e os três idiomas) foi realizada pelo autor, seguindo a checklist da Fase 5 do plano de implementação.
