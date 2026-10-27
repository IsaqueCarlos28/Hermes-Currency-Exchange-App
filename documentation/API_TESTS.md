# API_TESTS — Investigação da API Frankfurter com Postman

## 1. Visão geral

- **API:** Frankfurter — https://frankfurter.dev
- **Base URL:** `https://api.frankfurter.dev`
- **Autenticação:** nenhuma (todas as requisições foram feitas sem chave ou headers especiais)
- **Formato:** JSON (também CSV via `.csv` e NDJSON via `Accept`)
- **Collection:** `postman/Currency-Exchange-Frankfurter.postman_collection.json`
- **Como executar:** importar no Postman → Run collection → todos os testes devem passar.

## 2. Resultado da execução

Execução em **27/10/2026** (Collection Runner do Postman):

| Métrica | Valor |
| --- | --- |
| Requests executados | 28 |
| Testes aprovados | **122** |
| Testes reprovados | **0** |
| Tempo total | 2037 ms |
| Respostas de sucesso | ~22–64 ms cada |
| Respostas de erro (4xx) | ~221–240 ms cada |

Evidência: `docs/img/runner.png` e `postman/Currency-Exchange-Frankfurter.postman_test_run.json`.

## 3. Endpoints investigados

| Endpoint | Para que serve no app | Parâmetros |
| --- | --- | --- |
| `GET /v2/currencies` | Popular os selects de moeda | `scope=all` (inclui legadas) |
| `GET /v2/currency/{code}` | Detalhe de uma moeda | — |
| `GET /v2/rate/{base}/{quote}` | Taxa para o conversor | `date` (opcional) |
| `GET /v2/rates` | Histórico (gráfico e tabela) | `base`, `quotes`, `from`, `to`, `group` (`week`/`month`) |
| `GET /v2/rates.csv` | Só estudo (o CSV do app é gerado no navegador) | mesmos de `/v2/rates` |

## 4. Estrutura das respostas

### 4.1 `GET /v2/currencies`

Retorna um **array** com **170 moedas**. Trecho real:

```json
[
    {
        "iso_code": "BRL",
        "iso_numeric": "986",
        "name": "Brazilian Real",
        "symbol": "R$",
        "start_date": "1994-07-01",
        "end_date": "2026-10-27"
    },
    {
        "iso_code": "EUR",
        "iso_numeric": "978",
        "name": "Euro",
        "symbol": "€",
        "start_date": "1999-01-01",
        "end_date": "2026-10-27"
    }
]
```

| Campo | Descrição |
| --- | --- |
| `iso_code` | Código da moeda (ex.: `BRL`); é o valor usado nas outras rotas |
| `iso_numeric` | Código numérico ISO 4217; vem `null` em 10 itens |
| `name` | Nome em inglês |
| `symbol` | Símbolo; vem `null` em 1 item (`CMD`) |
| `start_date` / `end_date` | Período em que a moeda tem cotação |

Observações importantes para o seletor de moedas:

- A lista **não traz só moedas**: inclui criptomoedas (`BTC`, `ETH`, `BCH`, `LTC`, `XRP`), metais (`XAU`, `XAG`, `XPD`, `XPT`) e `XDR` (Direitos Especiais de Saque).
- Os nomes vêm em **inglês**, mas o app terá interface em PT, EN e ES; será preciso traduzir os nomes ou exibir só o código.
- Moedas cripto têm `end_date` de um dia antes (`2026-10-26`), ou seja, a última cotação delas é do dia anterior.
- O símbolo se repete (`$` aparece em dezenas de moedas), então não serve como identificador.

### 4.2 `GET /v2/currency/BRL`

Retorna um **objeto** com os mesmos campos da lista, mais `providers`: array com os **48 provedores** (bancos centrais e órgãos como `ECB`, `BCB`, `IMF`, `FRED`) que fornecem cotações da moeda.

```json
{
    "iso_code": "BRL",
    "iso_numeric": "986",
    "name": "Brazilian Real",
    "symbol": "R$",
    "start_date": "1994-07-01",
    "end_date": "2026-10-27",
    "providers": ["BAM", "BCB", "BCBO", "...", "UST"]
}
```

O app não precisa dessa rota; ela só foi investigada.

### 4.3 `GET /v2/rate/EUR/USD`

```json
{
    "date": "2026-10-27",
    "base": "EUR",
    "quote": "USD",
    "rate": 1.1186
}
```

Significado: 1 EUR = 1,1186 USD na data `date`. Para converter um valor, o app calcula `valor × rate`.

### 4.4 `GET /v2/rates?from=2024-05-01&to=2024-05-31&base=EUR&quotes=USD`

Retorna um **array plano**, com um item por data e por moeda de destino. Os testes automatizados confirmaram que:

- todos os itens têm `date`, `base`, `quote` e `rate`;
- o `rate` é numérico e positivo;
- as datas estão em ordem e dentro do intervalo pedido;
- com `quotes=USD,BRL,GBP`, uma consulta sem histórico retorna **3 itens**, um por moeda.

## 5. Comportamento observado

| Cenário | Requisição | Status | Resultado |
| --- | --- | --- | --- |
| Dia útil | `rate/EUR/USD?date=2024-05-01` | 200 | `date` retornada = `2024-05-01` |
| **Sábado** | `rate/EUR/USD?date=2024-05-04` | 200 | **A API devolve a própria data pedida** (`"date": "2024-05-04"`, `rate` 1.0737), em vez de recuar para sexta-feira |
| Feriado | `rate/EUR/USD?date=2024-12-25` | 200 | Retornou normalmente |
| Data futura | `date=2099-01-01` | **404** | Sem cotação |
| Data muito antiga | `date=1900-01-01` | **404** | Sem cotação |
| Minúsculas | `rate/usd/eur` | 200 | Aceita |
| Par invertido | `BRL/USD` e `USD/BRL` | 200 | Ambos funcionam |
| Mesma moeda | `rate/EUR/EUR` | 200 | A API não rejeita |
| `from` > `to` | `from=2024-05-31&to=2024-05-01` | 200 | A API não retorna erro |

## 6. Períodos do projeto

Todos retornaram 200 com array não vazio, itens válidos e datas em ordem.

| Período | Requisição | Tempo |
| --- | --- | --- |
| 7 dias | `from=2026-10-20&to=2026-10-27` | 22 ms |
| 30 dias | `from=2026-09-27&to=2026-10-27` | 45 ms |
| 1 ano | `from=2025-10-27&to=2026-10-27` | 23 ms |
| 5 anos | `from=2021-10-28&to=2026-10-27` | 30 ms |
| 10 anos | `from=2016-10-29&to=2026-10-27` | 32 ms |
| 1 ano com `group=week` |  | 26 ms |
| 10 anos com `group=month` |  | 24 ms |

Conclusão de desempenho: mesmo o período de 10 anos respondeu em ~32 ms, bem abaixo do limite de 2 s dos testes. A API aceita `group=week` e `group=month`, que podem ser usados nos períodos longos se o gráfico ficar pesado.

## 7. Erros

| Cenário | Requisição | Status | Corpo |
| --- | --- | --- | --- |
| Moeda inválida | `rate/EUR/XXX` | **422** | `{"status": 422, "message": "invalid currency: XXX"}` |
| Base inválida | `rates?base=ABC` | **422** | mesmo formato |
| Data inválida | `rate/EUR/USD?date=01-05-2024` | **422** | mesmo formato |
| Data futura | `date=2099-01-01` | **404** | — |
| Data antes do início da série | `date=1900-01-01` | **404** | — |
| Rota inexistente | `/v2/rota-que-nao-existe` | **404** | — |

Erros de validação (422) trazem JSON com `status` e `message`; o teste `Corpo traz mensagem de erro` confirma o campo `message`.

## 8. Testes automatizados (Postman)

Cada request tem scripts `pm.test` verificando:

- status esperado e `Content-Type` JSON;
- tempo de resposta < 2000 ms;
- campos obrigatórios (`date`, `base`, `quote`, `rate`) e `rate` numérico > 0;
- formato de data `YYYY-MM-DD` e datas em ordem;
- corpo de erro com `message`;
- CSV com cabeçalho e linhas.

**Resultado: 122 de 122 testes aprovados.**

## 9. Decisões para o app

- **Conversão:** feita no front: `valor × rate`.
- **Seletor de moedas:** usar `iso_code` como valor e `name` (ou código) como rótulo; considerar remover criptomoedas e metais, que não são moedas de câmbio comuns.
- **Data efetiva:** exibir sempre a `date` que a API devolve. No sábado testado ela coincidiu com a data pedida, mas o app não deve assumir isso.
- **Datas sem cotação:** futuras ou muito antigas retornam 404; tratar como "sem dados".
- **Erros 422:** moeda ou data inválida; mostrar mensagem amigável ao usuário e usar `message` apenas para log.
- **Mesma moeda (EUR→EUR):** a API não bloqueia, então o app deve validar antes de chamar.
- **Intervalo invertido:** a API não dá erro, então o app deve garantir `from <= to`.
- **Botão "Trocar":** a API aceita o par invertido, então dá para buscar `quote→base` ou usar `1/rate`.
- **Períodos longos:** as respostas são rápidas, então a consulta direta funciona; `group=week`/`month` fica como opção para aliviar o gráfico.