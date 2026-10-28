# COMPONENTS

Arquitetura de componentes do **Hermes — Currency Exchange App**.

> **Nota:** este documento descreve o código atual em `src/` depois da refatoração visual alinhada a `documentation/New Styles/`. A interface está implementada e funcional com dados mock no `App`; a camada de serviço e os hooks de consulta já estão implementados sobre o contrato real da Frankfurter v2 (com adaptadores de resposta), mas o `App` ainda não os utiliza. Onde isso afeta o comportamento, há uma observação.

## 1. Visão geral

A tela mantém cinco blocos em uma única página:

```
Header (Logo + Idioma)  →  PageIntro  →  Conversor  →  Histórico + Períodos  →  Filtros / Tabela / CSV
```

Convenções adotadas no código:

- **Atomic design:** componentes organizados em `src/components/atoms`, `src/components/molecules` e `src/components/organisms`.
- Cada componente fica em `src/components/<nível>/<Nome>/` com `<Nome>.jsx` e `<Nome>.module.css`.
- Componentes são **funcionais** e recebem dados e callbacks por **props**.
- A UI não chama a API nem concentra regras de negócio: isso fica em `services/`, `utils/` e `hooks/`.
- O estado compartilhado (par, valor, período e idioma) fica no `App` (**lifting state up**).
- O Tailwind v4 é usado **dentro dos CSS Modules**, com `@reference "../../../index.css"` e utilitários via `@apply`. Os valores vêm dos tokens de `src/styles/tokens.css`, mapeados em `src/index.css` com `@theme inline`.
- Acessibilidade: labels associados, `aria-invalid`, `aria-describedby`, `aria-live`, `aria-pressed`, `aria-sort`, `aria-current` e foco visível global.

## 2. Árvore de componentes

```
App
├── Header (organism)
│   ├── Logo (atom)
│   └── LanguageSwitcher (molecule)
├── PageIntro (molecule)
├── CurrencyConverter (organism)
│   ├── AmountInput (molecule)
│   │   ├── Label (atom)
│   │   └── Input (atom)
│   ├── CurrencySelect (molecule, origem)
│   │   ├── Label (atom)
│   │   └── Select (atom)
│   ├── SwapButton (atom)
│   ├── CurrencySelect (molecule, destino)
│   ├── ConversionResult (molecule)
│   └── Button (atom, "Converter")
├── HistorySection (organism)
│   ├── PeriodSelector (molecule)
│   ├── RateChart (molecule)
│   └── LoadingState | ErrorState | EmptyState (atoms)
└── RatesTableSection (organism)
    ├── FiltersPanel (molecule)
    │   ├── Label / Input / Button (atoms)
    ├── TableSummary (atom)
    ├── ExportCsvButton (atom)
    ├── RatesTable (organism)
    │   └── RateRow (molecule, renderizado com map)
    └── LoadingState | ErrorState | EmptyState (atoms)
```

## 3. Componentes

### 3.1 Atoms

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `Button` | Base dos botões. Aplica variante, altura de controle, foco e estado desabilitado/loading. | `atoms/Button/Button.jsx` | `Button.module.css` | `children`, `onClick`, `disabled`, `loading`, `type`, `className`, `variant` (`primary`/`secondary`), `aria-label` | `loading` (spinner + `aria-busy`), `disabled` |
| `EmptyState` | Estado de ausência de dados, com ícone, mensagem, descrição e ação opcionais. | `atoms/EmptyState/EmptyState.jsx` | `EmptyState.module.css` | `message`, `description`, `action`, `compact` | — |
| `ErrorState` | Estado de erro com ícone, mensagem, descrição e botão de nova tentativa. | `atoms/ErrorState/ErrorState.jsx` | `ErrorState.module.css` | `message`, `description`, `retryLabel`, `onRetry` | — |
| `ExportCsvButton` | Gera e baixa o CSV dos registros recebidos. Fica desabilitado sem linhas. | `atoms/ExportCsvButton/ExportCsvButton.jsx` | `ExportCsvButton.module.css` | `rows`, `from`, `to`, `disabled`, `language`, `labels`, `className` | `disabled` quando `rows.length === 0` |
| `Input` | Campo de texto controlado, com estado de erro e `aria-invalid`. | `atoms/Input/Input.jsx` | `Input.module.css` | `value`, `onChange`, `type`, `placeholder`, `disabled`, `error`, `id` | `error`, `disabled` |
| `Label` | Rótulo associado ao campo via `htmlFor`. | `atoms/Label/Label.jsx` | `Label.module.css` | `children`, `htmlFor` | — |
| `LoadingState` | Indicador de carregamento (spinner) ou skeleton de tabela. | `atoms/LoadingState/LoadingState.jsx` | `LoadingState.module.css` | `message`, `variant` (`default`/`table`) | `role="status"` + `aria-live` |
| `Logo` | Marca "HERMES": quadrado azul com ícone `ArrowLeftRight` e wordmark. | `atoms/Logo/Logo.jsx` | `Logo.module.css` | — | — |
| `Select` | Select nativo controlado, com `ChevronDown` e estado de erro. | `atoms/Select/Select.jsx` | `Select.module.css` | `value`, `onChange`, `options`, `disabled`, `error`, `id` | `error`, `disabled` |
| `SwapButton` | Botão 48×48 que inverte origem e destino. | `atoms/SwapButton/SwapButton.jsx` | `SwapButton.module.css` | `onClick`, `disabled`, `label` | — |
| `TableSummary` | Exibe a contagem no formato "N de M registros". | `atoms/TableSummary/TableSummary.jsx` | `TableSummary.module.css` | `filteredCount`, `totalCount`, `format` | — |

### 3.2 Molecules

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `AmountInput` | `Label` + `Input` do valor, com mensagem de erro associada. | `molecules/AmountInput/AmountInput.jsx` | `AmountInput.module.css` | `value`, `onChange`, `error`, `label`, `id` | `error` (controlado pelo pai) |
| `ConversionResult` | Resultado da conversão: valor de origem, valor convertido, taxa e data, com variantes de loading e erro. | `molecules/ConversionResult/ConversionResult.jsx` | `ConversionResult.module.css` | `converted`, `rate`, `rateDate`, `from`, `to`, `status`, `amount`, `language`, `labels`, `invalidAmount`, `onRetry` | `status` (`success`/`loading`/`error`), `invalidAmount` |
| `CurrencySelect` | `Label` + `Select` de moeda, reutilizado para origem e destino. Pode delegar a mensagem de erro ao pai. | `molecules/CurrencySelect/CurrencySelect.jsx` | `CurrencySelect.module.css` | `label`, `value`, `options`, `onChange`, `disabled`, `error`, `showErrorMessage`, `describedBy`, `id` | `error` |
| `FiltersPanel` | Campos de data inicial/final e cotação mínima/máxima, além de "Limpar filtros" e mensagens de validação. | `molecules/FiltersPanel/FiltersPanel.jsx` | `FiltersPanel.module.css` | `filters`, `onChange`, `onClear`, `errors`, `labels` | `errors` (`startDate`, `endDate`, `minRate`, `maxRate`, `range`, `rates`) |
| `LanguageSwitcher` | Alterna PT/EN/ES e destaca o idioma ativo com `aria-current`. | `molecules/LanguageSwitcher/LanguageSwitcher.jsx` | `LanguageSwitcher.module.css` | `language`, `onChange` | — |
| `PageIntro` | H1 e descrição da página. | `molecules/PageIntro/PageIntro.jsx` | `PageIntro.module.css` | `title`, `description` | — |
| `PeriodSelector` | Botões 7D · 15D · 30D · 3M · 6M · 1A · 5A · 10A, com rolagem interna no mobile. | `molecules/PeriodSelector/PeriodSelector.jsx` | `PeriodSelector.module.css` | `periods`, `value`, `onChange`, `label` | `aria-pressed` no ativo |
| `RateChart` | Gráfico de linha em SVG próprio, medido com `ResizeObserver`, com eixos, área, marcador e caixa do último ponto. | `molecules/RateChart/RateChart.jsx` | `RateChart.module.css` | `data` (`[{ date, rate }]`), `from`, `to`, `language`, `labels` | — (recebe dados já carregados) |
| `RateRow` | Uma linha da tabela: data, origem, destino e cotação formatados. | `molecules/RateRow/RateRow.jsx` | `RateRow.module.css` | `date`, `from`, `to`, `rate`, `language` | — |

### 3.3 Organisms

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `Header` | Cabeçalho com logo e seletor de idioma. | `organisms/Header/Header.jsx` | `Header.module.css` | `language`, `onLanguageChange` | — |
| `CurrencyConverter` | Card do conversor: organiza valor, par, troca, botão e resultado; concentra a exibição dos erros de valor e de par. | `organisms/CurrencyConverter/CurrencyConverter.jsx` | `CurrencyConverter.module.css` | `currencies`, `from`, `to`, `amount`, `rate`, `rateDate`, `status`, `converted`, `language`, `labels`, `errors`, `onFromChange`, `onToChange`, `onAmountChange`, `onSwap`, `onRetry` | `errors.amount`, `errors.pair`; `status` do resultado |
| `HistorySection` | Card do histórico: título, variação percentual do período, seletor de períodos e gráfico, com loading/erro/vazio. | `organisms/HistorySection/HistorySection.jsx` | `HistorySection.module.css` | `period`, `onPeriodChange`, `rates`, `from`, `to`, `status`, `onRetry`, `periods`, `language`, `labels` | `status` (`success`/`loading`/`error`); vazio quando `rates.length === 0` |
| `RatesTable` | Tabela com cabeçalhos ordenáveis por data e cotação, usando `aria-sort`. | `organisms/RatesTable/RatesTable.jsx` | `RatesTable.module.css` | `rows`, `sort`, `onSortChange`, `language`, `labels` | Ordenação ativa (`date`/`rate`, `asc`/`desc`) |
| `RatesTableSection` | Card da tabela: filtros, contagem, exportação, estados e tabela. Usa `useRateFilters` para filtros e ordenação locais. | `organisms/RatesTableSection/RatesTableSection.jsx` | `RatesTableSection.module.css` | `rates`, `from`, `to`, `status`, `onRetry`, `language`, `labels` | `status`; filtros e ordenação locais; vazio por filtros |

## 4. Hooks customizados (`src/hooks/`)

| Hook | Responsabilidade | Recebe | Retorna | Situação atual |
| --- | --- | --- | --- | --- |
| `useCurrencies` | Busca a lista de moedas disponíveis. | — | `{ currencies, status, error, retry }` | Pronto: chama `/v2/currencies` e normaliza com `normalizeCurrencies`; ainda não é usado pelo `App`. |
| `useLatestRate` | Busca a taxa e a data efetiva do par selecionado. | `from`, `to` | `{ rate, date, from, to, status, error, retry }` | Pronto: chama `/v2/rate/{from}/{to}` e normaliza com `normalizeLatestRate`; não é usado quando o par é inválido. |
| `useHistoricalRates` | Busca o histórico do par no período selecionado. | `from`, `to`, `period` | `{ rates, status, error, retry }` | Pronto: calcula o intervalo com `getPeriodRange`, chama `/v2/rates` e normaliza com `normalizeHistoricalRates`. |
| `useRateFilters` | Concentra filtros e ordenação e devolve os registros processados. | `rates`, `messages` (textos de validação) | `{ filters, setFilters, errors, hasFilters, clearFilters, sort, toggleSort, filteredRows }` | **Em uso** por `RatesTableSection`. |

`status` assume um dos valores: `"idle" | "loading" | "success" | "error"`.

Os hooks de API cancelam a requisição anterior com `AbortController` e usam um `requestId` para descartar respostas obsoletas (RNF-11). Todos expõem `retry` para a ação de tentar novamente.

O `useRateFilters` inicia com `{ field: 'date', direction: 'desc' }` e alterna a direção ao clicar novamente no mesmo critério. Os erros são derivados de `validateFilters`, com mensagens vindas de `constants/i18n.js`.

## 5. Serviços, utilitários e constantes

| Arquivo | Responsabilidade |
| --- | --- |
| `services/frankfurterApi.js` | Funções `fetch` + `async/await` para moedas (`/v2/currencies`), taxa atual (`/v2/rate/{from}/{to}`) e histórico (`/v2/rates?base=&quotes=&from=&to=`), com verificação de `res.ok`, `ApiError` com status e suporte a `AbortSignal`. Base: `https://api.frankfurter.dev`. |
| `services/frankfurterAdapters.js` | Converte as respostas da API para o modelo da UI: moedas em `{ value, label, name }` (excluindo cripto, metais e XDR), taxa em `{ date, from, to, rate }` e histórico em linhas `{ date, from, to, rate }` ordenadas e sem duplicatas. |
| `mocks/data.js` | Payloads mock no formato bruto da API v2, passados pelos mesmos adaptadores; exporta `MOCK_CURRENCIES`, `MOCK_LATEST_RATE` e `MOCK_HISTORICAL_RATES` já normalizados. |
| `utils/convertAmount.js` | Calcula `valor × taxa`, aceitando vírgula ou ponto. |
| `utils/validateAmount.js` | Valida o valor informado (vazio, não numérico, ≤ 0) e normaliza vírgula/ponto. |
| `utils/getPeriodRange.js` | Converte o período (7D … 10A) em `startDate` e `endDate` ISO. |
| `utils/filterRates.js` | `parseDateInput` (dd/mm/aaaa ou ISO), `parseRateInput`, `filterRates` (limites inclusivos) e `validateFilters`; exporta `EMPTY_FILTERS`. |
| `utils/sortRates.js` | Ordena por `date` ou `rate`, crescente ou decrescente. |
| `utils/formatters.js` | Formata datas, números, moeda, percentual e datas curtas com `Intl`, conforme PT/EN/ES. |
| `utils/buildCsv.js` | Monta o CSV com separador `;`, quebra de linha `\r\n` e escape de aspas. |
| `utils/downloadCsv.js` | Cria o Blob, gera a URL temporária e dispara o download no navegador. |
| `constants/periods.js` | Lista dos oito períodos (`value` e `label`). |
| `constants/defaults.js` | `from: 'USD'`, `to: 'BRL'`, `period: '30D'`, `language: 'PT'`. |
| `constants/i18n.js` | Textos em PT-BR, EN e ES, incluindo rótulos, placeholders, mensagens, estados e funções de título/resumo. |
| `styles/tokens.css` | Tokens visuais (cores, tipografia, espaçamento, forma, layout). |
| `index.css` | Importa Manrope e Tailwind, mapeia os tokens com `@theme inline` e define tipografia base e foco global. |

> **Integração:** ao ligar a API, confira o contrato de `services/frankfurterApi.js` contra o que foi validado em `API_TESTS.md` (rotas `/v2/rate` e `/v2/rates`) antes de substituir os dados mock.

## 6. Fluxo de dados e lifting state up

```
                         ┌──────────────────────────────────────────────┐
                         │ App                                          │
                         │ state: from, to, amount, period, language    │
                         │ dados mock: moedas, taxa atual e histórico   │
                         │ deriva: amountError, pairError, converted    │
                         └──────┬───────────────┬───────────────┬───────┘
          props ↓  eventos ↑    │               │               │
                    CurrencyConverter    HistorySection   RatesTableSection
                    (from, to, amount,   (period, rates)  (filters + sort
                     rate, converted)                     locais via hook)
```

1. O usuário muda moeda, valor, período ou idioma → o componente chama um callback recebido por prop (`onFromChange`, `onSwap`, `onPeriodChange`, `onLanguageChange`...).
2. O `App` atualiza o estado e deriva `amountError`, `pairError` e `converted`. A conversão é recalculada em tempo real com a taxa mock fixa de **5,4218**; o botão "Converter" é visual e não dispara uma ação própria.
3. Os dados descem por props: o conversor recebe taxa/data/valor convertido; o histórico e a tabela recebem os mesmos registros mock.
4. Filtros e ordenação são estado **local** de `RatesTableSection`, via `useRateFilters`. Os registros resultantes alimentam `TableSummary`, `RatesTable` e `ExportCsvButton`, garantindo que o CSV contenha exatamente o que a tabela mostra.
5. A troca de idioma seleciona o conjunto de textos de `constants/i18n.js` e atualiza `document.documentElement.lang` (`pt-BR`, `en` ou `es`).

### 6.1 O que ainda falta para a integração com a API

- Substituir, no `App`, os imports de `mocks/data` pelos hooks `useCurrencies`, `useLatestRate` e `useHistoricalRates`. Os mocks já passam pelos mesmos adaptadores, então o formato recebido pelos componentes não muda.
- Propagar os estados `loading`/`error` dos hooks para as seções (os componentes já os suportam) e ligar `onRetry`; hoje o `App` envia `status="success"` fixo.
- Reiniciar os filtros quando o par ou o período mudar (regra RN-11), hoje não necessário porque o histórico mock é fixo.
- Definir o comportamento do botão "Converter": hoje ele é visual e a conversão é recalculada em tempo real.
- Revisar o formato de data aceito nos filtros para o idioma EN: o placeholder exibe `mm/dd/yyyy`, mas `parseDateInput` interpreta `dd/mm/aaaa` e ISO.

## 7. Relação com os requisitos

| Componente / hook | Requisitos atendidos |
| --- | --- |
| `CurrencyConverter`, `AmountInput`, `CurrencySelect`, `ConversionResult` | RF-01 a RF-05, RF-07 |
| `SwapButton` | RF-06 |
| `PeriodSelector`, `RateChart`, `HistorySection` | RF-08 a RF-10 |
| `RatesTable`, `RateRow` | RF-11, RF-16 |
| `FiltersPanel` | RF-12 a RF-15 |
| `TableSummary` | RF-17 |
| `ExportCsvButton` | RF-18 a RF-20 |
| `LoadingState`, `ErrorState`, `EmptyState` | RF-21 |
| `LanguageSwitcher`, `constants/i18n.js`, `document.documentElement.lang` | RF-22, RNF-12 |
| Hooks customizados | RNF-03, RNF-04 |
| `services/frankfurterApi.js` | RNF-05 |
| `styles/tokens.css`, `index.css` e CSS Modules | RNF-06, RNF-07 |
