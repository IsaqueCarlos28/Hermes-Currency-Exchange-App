# COMPONENTS

Arquitetura de componentes do **Hermes — Currency Exchange App**.

> **Nota:** este documento descreve a arquitetura planejada a partir do `REQUIREMENTS.md` e do wireframe (Figma). Se algum nome de arquivo, prop ou estado mudar durante a implementação, atualize a tabela correspondente para o documento refletir o código final.
> 

## 1. Visão geral

O wireframe tem cinco blocos em uma única página, que viram os componentes principais:

```
Logo + Idioma  →  Título/descrição  →  Conversor  →  Gráfico + Períodos  →  Filtros / Tabela / CSV
```

Convenções:

- Cada componente fica em `src/components/<Nome>/` com `<Nome>.jsx` e `<Nome>.module.css`.
- Componentes são **funcionais** e recebem dados e callbacks por **props**.
- Componentes de UI não chamam a API nem contêm regras de negócio: isso fica em `services/`, `utils/` e `hooks/`.
- O estado compartilhado (par de moedas, valor, período, idioma) fica no `App` (**lifting state up**).

## 2. Árvore de componentes

```
App
├── Header
│   ├── Logo
│   └── LanguageSwitcher
├── PageIntro
├── CurrencyConverter
│   ├── AmountInput
│   ├── CurrencySelect (origem)
│   ├── SwapButton
│   ├── CurrencySelect (destino)
│   └── ConversionResult
├── HistorySection
│   ├── PeriodSelector
│   ├── RateChart
│   └── (LoadingState | ErrorState | EmptyState)
└── RatesTableSection
    ├── FiltersPanel
    ├── TableSummary
    ├── ExportCsvButton
    ├── RatesTable
    │   └── RateRow (lista renderizada com map)
    └── (LoadingState | ErrorState | EmptyState)
```

## 3. Componentes

### 3.1 Estrutura e layout

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `App` | Raiz da aplicação. Guarda o estado compartilhado, chama os hooks de dados e distribui dados e callbacks. | `src/App.jsx` | `src/App.module.css` | — | `from`, `to`, `amount`, `period`, `language` |
| `Header` | Cabeçalho com logo e seletor de idioma. | `components/Header/Header.jsx` | `Header.module.css` | `language`, `onLanguageChange` | — |
| `Logo` | Marca "HERMES". | `components/Logo/Logo.jsx` | `Logo.module.css` | — | — |
| `LanguageSwitcher` | Alterna entre PT, EN e ES; destaca o idioma ativo. | `components/LanguageSwitcher/LanguageSwitcher.jsx` | `LanguageSwitcher.module.css` | `language`, `onChange` | — |
| `PageIntro` | Título da página e breve descrição. | `components/PageIntro/PageIntro.jsx` | `PageIntro.module.css` | `title`, `description` | — |

### 3.2 Conversor

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `CurrencyConverter` | Reúne os campos do conversor, valida a entrada e dispara o cálculo do resultado. | `components/CurrencyConverter/CurrencyConverter.jsx` | `CurrencyConverter.module.css` | `currencies`, `from`, `to`, `amount`, `rate`, `rateDate`, `status`, `onFromChange`, `onToChange`, `onAmountChange`, `onSwap` | `validationError` (derivado da validação) |
| `AmountInput` | Campo do valor a converter; aceita vírgula ou ponto e mostra erro de validação. | `components/AmountInput/AmountInput.jsx` | `AmountInput.module.css` | `value`, `onChange`, `error`, `label` | — (controlado pelo pai) |
| `CurrencySelect` | Seletor de moeda reutilizado para origem e destino; lista renderizada com `map`. | `components/CurrencySelect/CurrencySelect.jsx` | `CurrencySelect.module.css` | `label`, `value`, `options`, `onChange`, `disabled` | — (controlado pelo pai) |
| `SwapButton` | Botão "Trocar ⇄" que inverte origem e destino. | `components/SwapButton/SwapButton.jsx` | `SwapButton.module.css` | `onClick`, `disabled` | — |
| `ConversionResult` | Exibe valor convertido, taxa usada e data efetiva da cotação (ou loading/erro). | `components/ConversionResult/ConversionResult.jsx` | `ConversionResult.module.css` | `converted`, `rate`, `rateDate`, `from`, `to`, `status` | — |

### 3.3 Histórico e gráfico

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `HistorySection` | Seção do gráfico: título, seletor de período e gráfico, com tratamento de loading, erro e ausência de dados. | `components/HistorySection/HistorySection.jsx` | `HistorySection.module.css` | `period`, `onPeriodChange`, `rates`, `from`, `to`, `status`, `onRetry` | — |
| `PeriodSelector` | Botões 7D · 15D · 30D · 3M · 6M · 1A · 5A · 10A; destaca o ativo. | `components/PeriodSelector/PeriodSelector.jsx` | `PeriodSelector.module.css` | `periods`, `value`, `onChange` | — |
| `RateChart` | Desenha o gráfico de linha do histórico usando a biblioteca de gráficos (Recharts ou Chart.js). | `components/RateChart/RateChart.jsx` | `RateChart.module.css` | `data` (`[{ date, rate }]`), `from`, `to` | — |

### 3.4 Tabela, filtros e CSV

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `RatesTableSection` | Coordena filtros, ordenação, contagem, tabela e exportação. Aplica `filterRates` e `sortRates` sobre os dados recebidos. | `components/RatesTableSection/RatesTableSection.jsx` | `RatesTableSection.module.css` | `rates`, `from`, `to`, `period`, `status`, `onRetry` | `filters` (`startDate`, `endDate`, `minRate`, `maxRate`), `sort` (`field`, `direction`) |
| `FiltersPanel` | Campos de intervalo de datas e cotação mín./máx.; botão "Limpar filtros"; mostra erros (início > fim, mín > máx). | `components/FiltersPanel/FiltersPanel.jsx` | `FiltersPanel.module.css` | `filters`, `onChange`, `onClear`, `errors` | — (controlado pelo pai) |
| `TableSummary` | Exibe "N de M registros". | `components/TableSummary/TableSummary.jsx` | `TableSummary.module.css` | `filteredCount`, `totalCount` | — |
| `ExportCsvButton` | Gera e baixa o CSV dos registros filtrados; fica desabilitado quando não há registros. | `components/ExportCsvButton/ExportCsvButton.jsx` | `ExportCsvButton.module.css` | `rows`, `from`, `to`, `disabled`, `labels` | — |
| `RatesTable` | Tabela com cabeçalhos clicáveis para ordenar por data e por cotação. | `components/RatesTable/RatesTable.jsx` | `RatesTable.module.css` | `rows`, `sort`, `onSortChange` | — |
| `RateRow` | Uma linha da tabela (data, origem, destino, cotação formatados). | `components/RateRow/RateRow.jsx` | `RateRow.module.css` | `date`, `from`, `to`, `rate` | — |

### 3.5 Estados de interface (compartilhados)

| Componente | Responsabilidade | JSX | CSS Module | Principais props | Estados |
| --- | --- | --- | --- | --- | --- |
| `LoadingState` | Indicador de carregamento. | `components/LoadingState/LoadingState.jsx` | `LoadingState.module.css` | `message` | — |
| `ErrorState` | Mensagem de erro com botão "Tentar novamente". | `components/ErrorState/ErrorState.jsx` | `ErrorState.module.css` | `message`, `onRetry` | — |
| `EmptyState` | Mensagem de ausência de dados (sem resultados para o período ou para os filtros). | `components/EmptyState/EmptyState.jsx` | `EmptyState.module.css` | `message`, `action` (opcional) | — |

## 4. Hooks customizados (`src/hooks/`)

| Hook | Responsabilidade | Recebe | Retorna |
| --- | --- | --- | --- |
| `useCurrencies` | Busca a lista de moedas disponíveis uma única vez. | — | `{ currencies, status, error, retry }` |
| `useLatestRate` | Busca a taxa e a data efetiva do par selecionado (`useEffect` com dependências `from` e `to`). | `from`, `to` | `{ rate, date, status, error, retry }` |
| `useHistoricalRates` | Busca o histórico do par no período; cancela/ignora respostas obsoletas. | `from`, `to`, `period` | `{ rates, status, error, retry }` |
| `useRateFilters` | (Opcional) Concentra estado de filtros e ordenação e devolve os registros processados. | `rates` | `{ filters, setFilters, clearFilters, sort, setSort, filteredRows, errors }` |

`status` assume um dos valores: `"idle" | "loading" | "success" | "error"`.

## 5. Serviços, utilitários e constantes

| Arquivo | Responsabilidade |
| --- | --- |
| `services/frankfurterApi.js` | Funções `fetch` + `async/await` para moedas, taxa atual e histórico; tratamento de erro HTTP e padronização do retorno. |
| `utils/convertAmount.js` | Calcula `valor × taxa`. |
| `utils/validateAmount.js` | Valida o valor informado (vazio, não numérico, ≤ 0) e normaliza vírgula/ponto. |
| `utils/getPeriodRange.js` | Converte o período (7D … 10A) em datas inicial e final. |
| `utils/filterRates.js` | Aplica filtros combinados (datas e cotação, limites inclusivos). |
| `utils/sortRates.js` | Ordena por data ou cotação, crescente ou decrescente. |
| `utils/formatters.js` | Formata datas, números e moedas conforme o idioma. |
| `utils/buildCsv.js` / `utils/downloadCsv.js` | Monta o conteúdo do CSV, gera o nome do arquivo e dispara o download no navegador. |
| `constants/periods.js` | Lista dos oito períodos e seus rótulos. |
| `constants/defaults.js` | Par, período e idioma padrão. |
| `constants/i18n.js` | Textos em PT-BR, EN e ES. |

## 6. Fluxo de dados e lifting state up

```
                         ┌──────────────────────────────────────────────┐
                         │ App                                          │
                         │ state: from, to, amount, period, language    │
                         │ hooks: useCurrencies, useLatestRate,         │
                         │        useHistoricalRates                    │
                         └──────┬───────────────┬───────────────┬───────┘
          props ↓  eventos ↑    │               │               │
                    CurrencyConverter    HistorySection   RatesTableSection
                    (from, to, amount,   (period, rates)  (rates → filtros
                     rate, onSwap...)                      e ordenação locais)
```

1. O usuário muda moeda, valor ou período → o componente chama um callback recebido por prop (`onFromChange`, `onSwap`, `onPeriodChange`...).
2. O `App` atualiza o estado (`setState`) → os hooks reagem às dependências e refazem a consulta apenas quando necessário.
3. Os dados voltam para baixo por props: o conversor recebe taxa e data, o gráfico e a tabela recebem o **mesmo** array de histórico.
4. Filtros e ordenação são estado **local** de `RatesTableSection` (só ela os usa). Os registros resultantes alimentam `TableSummary`, `RatesTable` e `ExportCsvButton`, garantindo que o CSV contenha exatamente o que a tabela mostra.
5. Ao mudar par ou período, `RatesTableSection` reinicia os filtros (regra RN-11).

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
| `LanguageSwitcher`, `constants/i18n.js` | RF-22 |
| Hooks customizados | RNF-03, RNF-04 |
| `services/frankfurterApi.js` | RNF-05 |