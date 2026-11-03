# FUNCTION_TESTS — Testes automatizados

## 1. Visão geral

- **Framework:** Vitest 5.1.0
- **Ambiente dos testes de componentes:** jsdom
- **Bibliotecas de apoio:** `@testing-library/react`, `@testing-library/user-event` e `@testing-library/jest-dom`
- **Comando:** `npm run test`
- **Configuração:** `vitest.config.js` (ambiente jsdom, `src/test/setup.js`, CSS não processado)
- **Local dos testes:** pastas `__tests__/` ao lado dos arquivos testados, mais `src/__tests__/App.test.jsx`

Os testes não dependem da API real: chamadas de `fetch` e os módulos de serviço são substituídos por mocks controlados.

## 2. Resultado da execução

Execução em **03/11/2026**:

| Métrica | Valor |
| --- | --- |
| Arquivos de teste | 23 |
| Testes aprovados | **156** |
| Testes reprovados | **0** |
| Tempo aproximado | 56 s |

O tempo é dominado pela criação do ambiente jsdom em cada arquivo, não pela execução das asserções.

## 3. Cobertura

### 3.1 Conversão e validação do valor

Arquivos: `utils/__tests__/convertAmount.test.js`, `utils/__tests__/validateAmount.test.js`

- Conversão com valores positivos, decimais e strings numéricas.
- Aceitação de vírgula e ponto como separador decimal.
- Rejeição de valor vazio, incompleto, zero, negativo ou não numérico.
- Rejeição de taxa ausente, vazia ou inválida.
- Retorno de `null` quando a conversão não pode ser calculada.

### 3.2 Datas e filtros

Arquivo: `utils/__tests__/filterRates.test.js`

- Leitura de `dd/mm/aaaa` em PT e ES.
- Leitura de `mm/dd/yyyy` em EN.
- Aceitação de datas ISO internas.
- Validação de anos bissextos (`29/02/2024`).
- Rejeição de datas impossíveis (`31/02/2026`, `29/02/2025`).
- Filtros de data e cotação com limites inclusivos.
- Combinação de filtros com lógica AND.
- Faixas inválidas não são aplicadas.
- Filtros individuais válidos continuam ativos quando outra faixa é inválida.
- Mensagens de validação em PT e EN.

### 3.3 Ordenação

Arquivo: `utils/__tests__/sortRates.test.js`

- Ordenação por data e por cotação.
- Direções crescente e decrescente.
- Preservação do array original.
- Fallback para data decrescente quando as opções não são informadas.

### 3.4 CSV

Arquivos: `utils/__tests__/buildCsv.test.js`, `utils/__tests__/downloadCsv.test.js`, `atoms/ExportCsvButton/__tests__/ExportCsvButton.test.jsx`

- Cabeçalho e linhas com separador `;` e quebra de linha `CRLF`.
- Escape de células com `;`, aspas e quebras de linha.
- Células nulas ou indefinidas como vazias.
- Cabeçalhos localizados.
- Exportação composta exatamente pelos registros filtrados e ordenados.
- Criação do Blob `text/csv;charset=utf-8`, com bytes de BOM (`EF BB BF`).
- Nome do arquivo no formato `hermes-<ORIGEM>-<DESTINO>.csv`.
- Botão desabilitado e download bloqueado quando não há registros.
- Download em EN mantendo códigos ISO e formato de data localizado.

### 3.5 Formatação

Arquivo: `utils/__tests__/formatters.test.js`

- Datas ISO sem deslocamento de dia por fuso horário.
- Datas curtas por idioma.
- Números e cotações com separadores localizados.
- Percentuais com sinal e símbolo.
- Retorno de texto vazio para números inválidos.

### 3.6 Períodos históricos

Arquivo: `utils/__tests__/getPeriodRange.test.js`

- Geração de datas ISO para os oito períodos.
- Quantidade correta de dias por período.
- Fallback de 30 dias para período desconhecido.
- Data final baseada na data local.

### 3.7 Serviço e normalização da API

Arquivos: `services/__tests__/frankfurterApi.test.js`, `services/__tests__/frankfurterAdapters.test.js`

- URLs de `/v2/currencies`, `/v2/rate/{base}/{quote}` e `/v2/rates`.
- Codificação dos códigos de moeda na URL.
- Construção do `query string` do histórico.
- Encaminhamento do `AbortSignal`.
- Erro com o status HTTP em respostas malsucedidas.
- Extração, remoção de duplicatas e ordenação dos códigos de moeda.
- Normalização da taxa atual com número ou string.
- Rejeição de respostas incompletas ou inválidas.
- Ordenação e deduplicação do histórico.
- Descarte de registros inválidos.

### 3.8 Hooks customizados

Arquivos: `hooks/__tests__/useCurrencies.test.js`, `useLatestRate.test.js`, `useHistoricalRates.test.js`, `useRateFilters.test.js`

- Carregamento com estado `loading` → `success`.
- Estado de erro e ação `retry`.
- Cancelamento da requisição ao desmontar ou ao trocar o par.
- Par com moedas iguais sem requisição desnecessária.
- Payload inválido tratado como erro.
- Filtros, validação e ordenação derivados.
- Reinício dos filtros quando a `resetKey` muda.

### 3.9 Componentes

Arquivos: `AmountInput`, `CurrencySelect`, `ConversionResult`, `CurrencyConverter`, `ExportCsvButton`, `RateChart`, `HistorySection` e `RatesTableSection` (cada um em sua pasta `__tests__/`).

- Labels, valores, erros e `aria-invalid`/`aria-describedby`.
- Seleção de moeda, troca de par e alteração do valor.
- Botão "Converter" focando o campo inválido ou a região de resultado.
- Estados de loading, erro e vazio nas seções.
- Desabilitação dos selects enquanto as moedas carregam.
- Erro da lista de moedas com nova tentativa.
- Gráfico acessível (`role="img"` com descrição), ordenação dos pontos, tooltip do último valor e ausência de SVG sem dados válidos.
- Variação percentual positiva, negativa e em EN.
- Filtros válidos, inválidos e limpeza.
- Ordenação por data e cotação com `aria-sort`.
- Contagem de registros e estado sem resultados.
- Reset dos filtros pela `resetKey`.
- Internacionalização PT/EN nos componentes.

### 3.10 Integração do App

Arquivo: `__tests__/App.test.jsx`

- Carregamento de moedas, taxa e histórico a partir do serviço mockado.
- Conversão de `100 USD` com a taxa retornada.
- Troca de par recarregando taxa e histórico.
- Bloqueio de moedas iguais.
- Validação de valor inválido.
- Troca de idioma atualizando textos, datas e `document.documentElement.lang`.
- Reinício dos filtros ao trocar o período.
- Estados vazios quando o histórico não tem dados.
- Erro da taxa com nova tentativa.

## 4. O que não está coberto

- Requisições reais à API Frankfurter (verificadas manualmente no navegador e documentadas em `API_TESTS.md`).
- Layout responsivo e aparência visual em larguras reais.
- Navegação por teclado ponta a ponta e leitura por leitor de tela.
- Testes end-to-end com navegador automatizado (não há Playwright/Cypress configurado).
- Download físico do arquivo pelo navegador (o Blob e o clique são verificados em jsdom).
- Collection do Postman e evidências externas.

Esses pontos permanecem na verificação manual descrita em `Implementation-Plan.md`.

## 5. Como executar

```bash
npm install
npm run test
```

Para manter a verificação completa do projeto:

```bash
npm run lint
npm run test
npm run build
```
