# FUNCTION_TESTS — Testes automatizados das funções de negócio

## 1. Objetivo

Registrar a cobertura dos testes automatizados do Hermes e como executá-los. Os testes verificam as funções puras de `src/utils/` e os adaptadores de `src/services/`, que concentram as regras de negócio da aplicação.

## 2. Como executar

```bash
npm install     # apenas na primeira vez
npm run test
```

- Runner: **Vitest** (devDependency), configurado pelo próprio `vite.config.js`.
- Ambiente: `node` (nenhum teste depende de DOM, navegador ou da API real).
- Os testes ficam ao lado do arquivo testado (`<nome>.test.js`) e podem ser filtrados por caminho:

```bash
npx vitest run src/utils/filterRates.test.js
```

## 3. Estratégia

- Dados de entrada controlados e declarados em cada teste (nenhuma cotação real).
- Nenhuma chamada de rede: o cliente HTTP não é exercitado, apenas os adaptadores que transformam a resposta.
- Datas dependentes do "hoje" usam `vi.setSystemTime`, mantendo o resultado determinístico.
- Cada teste descreve o comportamento esperado em português, no mesmo tom da documentação de requisitos.

## 4. Cobertura por arquivo

| Arquivo de teste | Funções cobertas | Principais casos |
| --- | --- | --- |
| `src/utils/convertAmount.test.js` | `convertAmount` | valor × taxa, vírgula e ponto, valor/taxa ausentes, texto |
| `src/utils/validateAmount.test.js` | `validateAmount` | vazio, espaços, zero, negativo, texto, infinito, mensagens traduzidas |
| `src/utils/filterRates.test.js` | `parseDateInput`, `parseRateInput`, `filterRates`, `validateFilters` | ISO, PT/ES `dd/mm/aaaa`, EN `mm/dd/yyyy`, 29/02, datas impossíveis, limites inclusivos, filtros combinados, faixas invertidas, idioma |
| `src/utils/sortRates.test.js` | `sortRates` | data e cotação, crescente e decrescente, cotação numérica, imutabilidade |
| `src/utils/buildCsv.test.js` | `buildCsv` | cabeçalho, separador `;`, CRLF, escape de aspas/`;`/quebra de linha, células vazias, BOM opcional |
| `src/utils/formatters.test.js` | `formatNumber`, `formatRate`, `formatCurrency`, `formatDate`, `formatShortDate`, `formatPercent`, `localeFor` | PT/EN/ES, casas decimais, datas ISO sem deslocamento de fuso, valores inválidos |
| `src/utils/getPeriodRange.test.js` | `getPeriodRange` | os oito períodos, padrão de 30 dias, zero à esquerda |
| `src/services/frankfurterAdapters.test.js` | `normalizeCurrencies`, `normalizeLatestRate`, `normalizeHistoricalRates` | exclusão de cripto/metais/XDR, deduplicação, ordenação, datas e taxas inválidas, fallback do par |

## 5. Regras de negócio cobertas

| Regra | Onde é verificada |
| --- | --- |
| RN-01 — conversão `valor × taxa` | `convertAmount.test.js` |
| RN-03 — valor maior que zero, vírgula ou ponto | `validateAmount.test.js` |
| RN-05 — valor com 2 casas, taxa com 4 a 6 | `formatters.test.js` |
| RN-07 — períodos contados a partir de hoje | `getPeriodRange.test.js` |
| RN-10 — uma linha por data publicada, sem interpolar | `frankfurterAdapters.test.js` |
| RN-14 / RN-15 — limites inclusivos e faixas invertidas recusadas | `filterRates.test.js` |
| RN-16 — filtros combinados com AND | `filterRates.test.js` |
| RN-18 — ordenação por data e cotação | `sortRates.test.js` |
| RN-21 / RN-23 — cabeçalhos, separador `;`, CRLF e BOM | `buildCsv.test.js` |

## 6. O que não é coberto

- Hooks de dados (`useCurrencies`, `useLatestRate`, `useHistoricalRates`): dependem de `fetch`, `AbortController` e ciclo de vida do React.
- Componentes React e interações (clique em Converter, troca de moedas, filtros na interface, download do arquivo).
- Fluxo completo da exportação CSV (o download em si depende da API de Blob/URL do navegador; a geração do conteúdo é testada).
- Comportamento real da API Frankfurter (coberto pela Collection do Postman descrita em `API_TESTS.md`).

Recomendação de evolução: se o projeto crescer, avaliar `@testing-library/react` + `jsdom` para os componentes e um teste de integração dos hooks com `fetch` simulado.

## 7. Resultado da última execução

Execução local em **03/11/2026**, com Node 24.21.0:

```
Test Files  8 passed (8)
Tests       81 passed (81)
```

O comando `npm run test` sai com código 0. Para a verificação de entrega, execute também `npm run lint` e `npm run build`.

Os itens que não são cobertos por teste automatizado (seção 6) foram verificados manualmente pelo autor no navegador: responsividade em desktop, tablet e mobile, navegação por teclado, download e conteúdo do CSV e os três idiomas.
