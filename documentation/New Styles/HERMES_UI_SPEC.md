# Hermes — UI Spec (para implementação em React + CSS Modules)

Fonte da verdade visual. Use junto com `tokens.css` / `tokens.json`, `COMPONENTS.md` e `REQUIREMENTS.md`.
**Não invente valores:** use sempre as variáveis `--*` de `tokens.css`.

Arquivos:
- `frames/01..05-*.png` — imagens dos frames (desktop, tablet, mobile, estados, componentes).
- `reference/*.dc.html` — marcação e CSS reais de cada frame (HTML estático; copie classes/valores daqui). `canvas.json` = posição dos frames.
- Nota: as imagens usam fonte de fallback (Manrope não estava instalada no renderizador). A fonte do projeto é **Manrope** 400/600/700.

## 1. Regras globais
- Fundo da página `--color-canvas`; superfícies `--color-surface` com `border:1px solid var(--color-border)`, `border-radius:14px`, `padding:32px` (mobile: `24px 16px`).
- Sem gradientes, glassmorphism ou sombras. Cards só nas 3 seções (Conversor, Histórico, Tabela).
- Todo controle (input, select, botão) tem **48px** de altura, radius **10px**, padding horizontal **16px**.
- Foco: `outline: 2px solid #2563EB; outline-offset: 2px` em todo elemento interativo.
- Container: `max-width:1200px; margin:0 auto; padding:0 var(--page-padding)`. Nunca rolagem horizontal na página; só dentro do seletor de períodos e da tabela (`overflow-x:auto`).
- Ícones: **lucide-react**, 20px (16px em auxiliares). Mapeamento: troca `ArrowLeftRight`, resultado `ArrowDown` (Blue), seleção `ChevronDown` (Muted), CSV `Download`, variação `TrendingUp`/`TrendingDown`, ordenação `ArrowDown`/`ArrowUp` (16px), erro `AlertCircle`, vazio `Search`, logo `ArrowLeftRight` (branco, 18px) em quadrado Blue 32px radius 10.
- Cor nunca é o único indicador: variação sempre com sinal (+/−) e ícone; erros com ícone e texto.
- Textos: `--color-navy`; auxiliares `--color-text-secondary` sobre Canvas e `--color-muted` sobre Surface; eyebrow = 13px/600 uppercase, letter-spacing .06em.

## 2. Layout da página (ordem vertical)
1. **Header** — altura 72px (mobile 64px). Esquerda: `Logo` (quadrado Blue 32px + "HERMES" 18px/700, letter-spacing .14em). Direita: `LanguageSwitcher` PT | EN | ES; cada item padding 8px 12px, radius 10, 13px/600; ativo = fundo Navy, texto branco, `aria-current="true"`.
2. **PageIntro** — padding 32px 0. H1 32px/700 "Converta moedas e acompanhe o câmbio"; descrição 16px `text-secondary`, max-width 640px.
3. **CurrencyConverter** (Surface). Eyebrow "CONVERSOR DE MOEDAS".
   - Desktop/Tablet: grid 2 colunas, gap 48 (tablet 32). Esquerda = formulário; direita = resultado, com `border-left` 1px + `padding-left 48` (tablet: vira `border-top` + `padding-top 32`, empilhado).
   - Formulário: `AmountInput` "Valor" (max-width 420, valor com peso 600, `inputmode="decimal"`), depois linha `grid-template-columns: 1fr 48px 1fr; gap:12px; align-items:end` com `CurrencySelect` origem, `SwapButton` (48×48, secundário, `aria-label="Trocar moedas"`) e `CurrencySelect` destino; botão primário "Converter" (min-width 200, margin-top 24).
   - Mobile: tudo empilhado em 1 coluna: Valor → origem → swap (centralizado, margin 12px 0) → destino → "Converter" 100% de largura → resultado centralizado com `border-top`.
   - `ConversionResult` (`aria-live="polite"`), hierarquia: eyebrow "VOCÊ CONVERTEU" → "100 USD" (20px/600, text-secondary) → seta ↓ Blue → **"R$ 542,18"** (40px/700, line-height 1.15; tablet 36; mobile 32) → "1 USD = 5,4218 BRL" + "Cotação de 27/10/2026" (15px, text-secondary).
4. **HistorySection** (Surface, margin-top 48). Cabeçalho flex space-between com wrap: à esquerda H2 24/700 "Histórico USD → BRL" + linha "▲ +1,24% nos últimos 30 dias" (15px; variação em `positive-text`, 700, com ícone); à direita `PeriodSelector`. Abaixo, `RateChart` em largura total (altura 320–400 desktop, 260–300 mobile).
   - `PeriodSelector`: 7D 15D 30D 3M 6M 1A 5A 10A. Pill: altura 40, min-width 48, padding 0 12, radius 10, 14px/600, texto `text-secondary`. Hover: borda Border. **Selecionado: fundo Blue, texto branco, `aria-pressed="true"`.** Container `display:flex; gap:4px; overflow-x:auto`.
   - `RateChart` (Recharts): linha Blue 2.5px, área Blue com opacidade .07 (cor sólida, sem gradiente), grid horizontal `#E2E8F0`, eixos 13px Muted (Y com 2 casas: 5,35…5,50; X com dd/mm), ponto final com círculo branco borda Blue 3px, linha vertical tracejada, tooltip Surface/Border radius 10 (data 12px Muted + valor 16px/700 Navy).
5. **RatesTableSection** (Surface, margin-top 48). Cabeçalho: H2 "Tabela de cotações" + `TableSummary` "6 de 21 registros" (15px, text-secondary) à esquerda; `ExportCsvButton` (secundário, ícone Download + "Exportar CSV") à direita.
   - `FiltersPanel`: eyebrow "FILTROS"; `display:grid; grid-template-columns:repeat(auto-fit,minmax(170px,1fr)); gap:16; align-items:end` com Data inicial, Data final, Cotação mínima, Cotação máxima (inputs 48px, placeholders "dd/mm/aaaa" e "5,3500"/"5,5000") e botão secundário "Limpar filtros". Mobile: 1 coluna. O botão CSV vai abaixo dos filtros, 100% de largura.
   - `RatesTable`: wrapper `.tw` (`overflow-x:auto; border:1px solid Border; radius 12`), `table{min-width:560px}`. `thead` fundo Canvas, 13px/600 text-secondary, altura 44. Linhas altura 52, `border-bottom` Border, 15px, `white-space:nowrap`, hover fundo Canvas. Colunas: **Data** (botão de ordenar), Origem, Destino, **Cotação** (botão de ordenar, alinhada à direita, `tabular-nums`, peso 600). Coluna ordenada ativa: botão Blue com seta (↓ desc, ↑ asc); não ordenada: botão `text-secondary` sem seta. Ordenação padrão: data desc.

## 3. Estados (frame 04)
Mostrar **só na área afetada**; o resto da tela segue usável. Área `.state`: coluna centralizada, gap 12, min-height 240, padding 32.
| Estado | Conteúdo |
|---|---|
| Loading (gráfico) | spinner 28px (borda 3px Border, topo Blue) + "Carregando cotações..." 600; `role="status"` |
| Erro (gráfico) | AlertCircle 28 Negative + "Não foi possível carregar as cotações." (600) + "Verifique sua conexão e tente de novo." + botão primário "Tentar novamente"; `role="alert"` |
| Sem dados (gráfico) | Search 28 Muted + "Nenhum dado encontrado" (600) + "Não há cotações publicadas para este par e período." |
| Loading (tabela) | 5 barras skeleton (altura 16, fundo Border, radius 6, larguras variadas) dentro do `.tw` |
| Filtros sem resultado | "0 de 21 registros" + "Nenhum registro para os filtros aplicados" + botão secundário "Limpar filtros"; `Exportar CSV` desabilitado + texto 13px "Sem registros para exportar." |
| Validação do conversor | input/select com borda Negative, `aria-invalid="true"`, mensagem abaixo (`errt`: 13px/600 Negative + AlertCircle 16) ligada por `aria-describedby`. Mensagens: "Informe um valor maior que zero.", "Digite um número válido.", "Escolha moedas diferentes." |
| Resultado carregando | skeletons no lugar do valor/taxa; `role="status"` |
| Erro de API (conversor) | AlertCircle + "Não foi possível obter a taxa." + "Tentar novamente" |

## 4. Componentes e variantes (frame 05)
- **Botão primário**: fundo Blue, texto branco, borda Blue, 15px/600, padding 0 24, gap 8. Hover `--color-blue-hover`. Focus: ring. Disabled: fundo `#F1F5F9`, texto `#94A3B8`, borda Border, `cursor:not-allowed`. Loading: spinner branco 18px + "Convertendo", `aria-busy="true"`.
- **Botão secundário**: fundo Surface, texto Navy, borda Border. Hover: borda Blue. Disabled/Loading como acima ("Gerando...").
- **Input**: 16px; default borda Border; focus borda Blue + ring; erro borda Negative; disabled fundo `#F1F5F9` texto `#94A3B8`. Label 13px/600 acima, `margin-bottom:8px`, sempre `<label for>`.
- **Select** (`<select>` nativo, `appearance:none`): igual ao input, `padding-right:44px`, texto 600, `ChevronDown` 20px Muted em `right:16px; top:14px; pointer-events:none`.
- **Par de moedas**: `[USD] ⇄ [BRL]` com botões secundários min-width 96 / swap 48×48 (borda Blue em destaque, sem competir com o "Converter").
- **Variação**: positiva = `positive-text` + TrendingUp/seta ↑ + "+1,24%"; negativa = Negative + TrendingDown + "−1,24%".

## 5. Responsivo (frames 01–03)
| | Desktop ≥1024 | Tablet 768–1023 | Mobile <768 |
|---|---|---|---|
| Padding lateral | 32 | 24 | 16 |
| Entre seções | 48 | 40–48 | 32 |
| Conversor | 2 colunas lado a lado | empilha form sobre resultado | tudo em 1 coluna, botão 100% |
| Valor convertido | 40px | 36px | 32px |
| Períodos | em linha | em linha | 1 linha com rolagem interna |
| Filtros | 4 campos + limpar em linha | auto-fit | 1 coluna |
| Tabela | cabe | rolagem interna se preciso | rolagem interna |
Frames de referência: 1440×1900, 768×2400, 390×2900 (alturas do canvas; o conteúdo é fluido).

## 6. Mapeamento para `COMPONENTS.md`
`Header`, `Logo`, `LanguageSwitcher`, `PageIntro`, `CurrencyConverter`, `AmountInput`, `CurrencySelect`, `SwapButton`, `ConversionResult`, `HistorySection`, `PeriodSelector`, `RateChart`, `RatesTableSection`, `FiltersPanel`, `TableSummary`, `ExportCsvButton`, `RatesTable`, `RateRow`, `LoadingState`, `ErrorState`, `EmptyState` — um CSS Module por componente, usando só variáveis de `tokens.css`.
Classes de referência nos `.dc.html`: `.surf`→containers, `.field`→AmountInput/CurrencySelect/FiltersPanel, `.btn.pri/.sec`→botões, `.pill`→PeriodSelector, `.tw/table/.th`→RatesTable, `.state`→Loading/Error/EmptyState, `.errt`→mensagens de erro, `.up`→variação.

## 7. Textos (PT-BR) usados nos frames
Converter · Trocar moedas · Valor · Moeda de origem · Moeda de destino · Você converteu · Cotação de dd/mm/aaaa · Histórico USD → BRL · nos últimos 30 dias · Tabela de cotações · N de M registros · Filtros · Data inicial · Data final · Cotação mínima · Cotação máxima · Limpar filtros · Exportar CSV · Data · Origem · Destino · Cotação · Carregando cotações... · Não foi possível carregar as cotações. · Tentar novamente · Nenhum dado encontrado. Para EN e ES, traduza em `constants/i18n.js` mantendo códigos ISO 4217.
Formatação: PT `5,4218` e `27/10/2026`; EN `5.4218` e `10/27/2026`; ES `5,4218` e `27/10/2026` (use `Intl`). Valor convertido com 2 casas, taxa com 4–6.
