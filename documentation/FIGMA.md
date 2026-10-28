# FIGMA

## Hermes — Design System

**Projeto:** Hermes — Currency Exchange App

**Tipo:** SPA · React + JavaScript · Aplicação de câmbio

**Documento:** Design System / Guia Visual

**Ferramenta:** Figma

> **Nota de implementação:** este documento está alinhado à fonte da verdade visual `documentation/New Styles/HERMES_UI_SPEC.md` e aos tokens de `src/styles/tokens.css`. Os valores e comportamentos abaixo refletem o código atual em React + CSS Modules (Tailwind v4 via `@apply`).

---

## 1. Direção Visual

O Hermes utiliza uma linguagem visual inspirada em produtos modernos de **internet banking, fintechs e dashboards financeiros**.

A interface deve transmitir:

- confiança;
- precisão;
- tecnologia;
- clareza;
- organização;
- facilidade para leitura de informações financeiras.

A identidade visual não deve reproduzir o Design Guide utilizado como referência no projeto. A referência serve como base de organização e documentação, enquanto o Hermes possui uma identidade visual própria.

### Princípios

**Clareza antes da decoração**

Informações financeiras devem ser rapidamente compreendidas.

**Dados como protagonistas**

Valores, cotações, gráficos e tabelas possuem maior hierarquia visual que elementos decorativos.

**Hierarquia visual consistente**

Tamanho, peso, espaçamento e contraste devem indicar claramente a importância de cada informação.

**Interface limpa**

Evitar excesso de elementos, sombras, cards e efeitos visuais desnecessários.

**Sem excesso de efeitos**

Não utilizar gradientes, glassmorphism ou efeitos decorativos que prejudiquem a leitura.

**Responsividade**

A identidade visual deve funcionar tanto em desktop quanto em dispositivos móveis.

---

# 2. Paleta de Cores

A paleta foi definida para criar uma identidade mais próxima de produtos financeiros digitais.

## Cores principais

| Token | Hexadecimal | Uso |
| --- | --- | --- |
| **Navy** | `#0B1220` | Texto principal, títulos e elementos institucionais |
| **Blue** | `#2563EB` | Ações primárias, links e elementos de destaque |
| **Sky** | `#38BDF8` | Destaques secundários e elementos gráficos |
| **Canvas** | `#F5F7FA` | Fundo principal da aplicação |
| **Surface** | `#FFFFFF` | Superfícies e áreas de conteúdo |
| **Border** | `#E2E8F0` | Bordas, divisores e separações |
| **Muted** | `#64748B` | Textos secundários e informações auxiliares sobre `Surface` |
| **Text Secondary** | `#475569` | Texto auxiliar sobre `Canvas` (contraste ≥ 4.5:1) |
| **Blue Hover** | `#1D4ED8` | Hover das ações primárias |

## Cores semânticas

| Token | Hexadecimal | Uso |
| --- | --- | --- |
| **Positive** | `#16A34A` | Ícones e fundos semânticos de sucesso/valorização |
| **Positive Text** | `#15803D` | Texto de variação positiva (contraste) |
| **Negative** | `#DC2626` | Erros, queda e resultados negativos |
| **Disabled Background** | `#F1F5F9` | Fundo de controles desabilitados |
| **Disabled Text** | `#94A3B8` | Texto de controles desabilitados |

### Regra de uso

A cor **Blue** representa a identidade e as ações da aplicação.

As cores **Positive** e **Negative** possuem função semântica e não devem ser utilizadas como cores decorativas.

Exemplo:

```
+1,24%  → Positive
-1,24%  → Negative
```

O verde não será utilizado como cor institucional principal. Dessa forma, ele permanece associado visualmente a resultados positivos e estados de sucesso.

---

# 3. Tipografia

## Família tipográfica

**Manrope**

A Manrope foi escolhida por apresentar uma aparência contemporânea e adequada a interfaces digitais, mantendo boa legibilidade em textos e destaque visual em valores financeiros.

## Escala tipográfica

| Elemento | Tamanho | Peso | Uso |
| --- | --- | --- | --- |
| **Display** | 40 px | 700 - Bold | Valores financeiros de maior destaque |
| **H1** | 32 px | 700 - Bold | Títulos principais |
| **H2** | 24 px | 700 - Bold | Títulos de seções |
| **H3** | 18 px | 600 - Semi Bold | Subtítulos e componentes |
| **Body** | 15–16 px | 400 - Regular | Textos gerais |
| **Label** | 13 px | 600 - Semi Bold | Labels e informações auxiliares |
| **Financial Value** | 32–40 px | 700 - Bold | Valores monetários principais |

## Hierarquia financeira

Os valores financeiros possuem uma hierarquia própria.

Exemplo:

```
Você converteu

100 USD

↓

R$ 542,18

1 USD = 5,4218 BRL
Cotação de 27/10/2026
```

O valor convertido deve possuir maior destaque visual que a taxa e a data da cotação.

A interface deve priorizar a leitura do valor financeiro antes das informações complementares.

---

# 4. Espaçamento

O sistema utiliza uma escala baseada em múltiplos de **8 px**.

| Token | Valor | Uso |
| --- | --- | --- |
| XS | 4 px | Ajustes mínimos |
| SM | 8 px | Pequenas separações |
| MD | 16 px | Espaçamento padrão |
| LG | 24 px | Agrupamento de elementos |
| XL | 32 px | Separação entre blocos |
| 2XL | 48 px | Separação entre seções |
| 3XL | 64 px | Grandes áreas de composição |

### Regra

Sempre que possível, espaçamentos entre componentes devem utilizar a escala definida, evitando valores arbitrários.

---

# 5. Bordas e Formas

## Border

```
1 px
```

Utilizado principalmente em:

- inputs;
- selects;
- tabelas;
- containers;
- divisores;
- botões secundários.

## Border Radius

| Elemento | Radius |
| --- | --- |
| Inputs | 10 px |
| Botões | 10 px |
| Tabela e containers internos | 12 px |
| Cards e superfícies | 14 px |

O objetivo é criar uma interface moderna e amigável sem utilizar formas excessivamente arredondadas.

---

# 6. Superfícies e Cards

O Hermes não utiliza cards para cada elemento da interface.

A separação visual deve ser obtida principalmente através de:

- contraste entre `Canvas` e `Surface`;
- espaçamento;
- bordas;
- hierarquia tipográfica.

### Estrutura visual

```
Canvas
│
├── Header
│
├── Conversor
│   └── Surface
│
├── Histórico
│   └── Surface
│
└── Filtros / Tabela
    └── Surface
```

Cards devem ser utilizados apenas nas três seções principais — **Conversor**, **Histórico** e **Tabela** —, com borda de 1 px, raio de 14 px e padding de 32 px no desktop (`24px 16px` no mobile). O restante da interface é organizado por espaço, bordas e hierarquia tipográfica.

---

# 7. Componentes

Os componentes do Design System devem representar as funcionalidades reais do Hermes.

## 7.1 Buttons

### Primary

Utilizado para ações principais.

Exemplo:

```
[ Converter ]
```

Características:

- fundo `Blue`, borda `Blue` e texto branco;
- altura 48 px, padding horizontal 24 px e radius 10 px;
- tipografia 15 px/600;
- hover com `Blue Hover`;
- foco com outline de 2 px azul e offset de 2 px;
- disabled com fundo `#F1F5F9`, texto `#94A3B8` e borda `Border`;
- loading com spinner de 18 px e `aria-busy="true"`.

### Secondary

Utilizado para ações complementares.

Exemplo:

```
[ Trocar ]
```

Características:

- fundo `Surface`;
- borda `Border`, que fica `Blue` no hover;
- texto `Navy`;
- altura 48 px, padding horizontal 24 px e radius 10 px;
- foco com outline de 2 px azul e offset de 2 px.

### Estados

```
Default
Hover
Focus
Disabled
Loading
```

---

# 8. Inputs

Os inputs são utilizados para valores de conversão e filtros.

Exemplo:

```
Valor

┌──────────────────────────────┐
│ 100,00                       │
└──────────────────────────────┘
```

### Estados

```
Default
Focus
Error
Disabled
```

O estado de foco deve possuir indicação visual clara.

Todos os inputs têm **48 px de altura**, padding horizontal de **16 px** e radius de **10 px**. O foco usa borda `Blue` com ring de 2 px e offset de 2 px; o erro usa borda `Negative` e `aria-invalid="true"`.

---

# 9. Selects

Utilizados principalmente para seleção de moedas.

```
Moeda de origem

┌──────────────────────────────┐
│ USD                       ▼  │
└──────────────────────────────┘
```

```
Moeda de destino

┌──────────────────────────────┐
│ BRL                       ▼  │
└──────────────────────────────┘
```

### Estados

```
Default
Focus
Selected
Error
Disabled
```

O select é nativo, com `appearance: none`, altura de 48 px, radius 10 px, padding horizontal de 16 px e `padding-right` de 44 px para o `ChevronDown` de 20 px em `Muted`.

---

# 10. Currency Pair

O par de moedas é um elemento central do Hermes.

Exemplo:

```
USD  →  BRL
```

A interface também possui a ação de inversão:

```
[ USD ]  ⇄  [ BRL ]
```

O botão de troca deve possuir destaque suficiente para ser facilmente identificado, mas não deve competir visualmente com a ação principal de conversão. Na implementação, ele mede **48 × 48 px**, usa a variante secundária e mantém a borda neutra por padrão, ficando `Blue` no hover.

---

# 11. Conversion Result

O resultado da conversão deve possuir forte hierarquia visual.

Exemplo:

```
CONVERSÃO

100 USD

        ↓

R$ 542,18

1 USD = 5,4218 BRL
Cotação de 27/10/2026
```

### Hierarquia

1. Valor convertido
2. Valor informado
3. Taxa utilizada
4. Data efetiva da cotação

O valor convertido deve ser apresentado utilizando a escala `Financial Value`.

Na implementação, o valor convertido usa 40 px/700 no desktop, 36 px no tablet e 32 px no mobile; o valor de origem usa 20 px/600 e a taxa/data usam 15 px em `Text Secondary`.

---

# 12. Period Selector

O seletor de período controla o intervalo utilizado pelo gráfico e pela tabela.

```
7D   15D   30D   3M   6M   1A   5A   10A
```

### Estados

```
Default
Hover
Selected
Focus
```

O período selecionado deve possuir destaque visual utilizando a identidade `Blue`.

Cada opção tem 40 px de altura, `min-width` de 48 px, padding horizontal de 12 px, radius 10 px e tipografia 14 px/600. O container usa `display: flex`, gap de 4 px e rolagem horizontal interna no mobile.

---

# 13. Chart

O gráfico representa a evolução histórica da cotação.

### Direção visual

- linha principal em `Blue`, com 2,5 px;
- área preenchida em `Blue` com opacidade de 0,07 (cor sólida, sem gradiente);
- grid horizontal discreto em `Border`;
- textos dos eixos em `Muted`, 13 px;
- valores em `Navy`;
- ponto final branco com borda `Blue` de 3 px e linha vertical tracejada;
- tooltip estático em `Surface`, borda `Border` e radius 10 px (data em 12 px `Muted`, valor em 16 px/700 `Navy`).

O gráfico deve priorizar a leitura dos dados em vez de elementos decorativos.

### Implementação

O gráfico é um **SVG próprio**, sem biblioteca de gráficos. A largura é medida com `ResizeObserver` e o SVG usa 1 unidade = 1 px. As alturas são **280 px no mobile, 320 px no tablet e 360 px no desktop**; as marcações dos eixos são calculadas a partir dos dados carregados.

### Estados

```
Loading
Loaded
Error
Empty
```

---

# 14. Table

A tabela apresenta os mesmos dados utilizados no gráfico.

Estrutura:

```
Data | Origem | Destino | Cotação
-----------------------------------
27/10 | USD | BRL | 5,4200
26/10 | USD | BRL | 5,4100
...
```

### Estados

```
Default
Hover
Sorted
Loading
Empty
Error
```

A ordenação ativa deve possuir indicação visual clara.

Na implementação, a tabela fica em um wrapper com `overflow-x: auto`, borda `Border` e radius 12 px. A `<table>` tem `min-width: 560 px`, cabeçalho de 44 px e linhas de 52 px; a página não adquire rolagem horizontal.

---

# 15. Filters

Os filtros permitem analisar os dados históricos já carregados.

Estrutura:

```
FILTROS

Data inicial
Data final

Cotação mínima
Cotação máxima

[ Limpar filtros ]
```

Os filtros devem possuir agrupamento visual claro, sem criar excesso de containers.

Na implementação, os campos ficam em uma coluna no mobile e, a partir de 768 px, em `repeat(auto-fit, minmax(170px, 1fr))`; o botão "Limpar filtros" ocupa 100% da largura da sua coluna.

---

# 16. CSV Export

A exportação é representada por uma ação secundária:

```
[ Exportar CSV ]
```

### Estados

```
Default
Hover
Focus
Disabled
Loading
```

Quando não houver registros disponíveis, a ação de exportação deve ficar desabilitada ou apresentar claramente o motivo da indisponibilidade.

Na implementação, o arquivo é gerado como `hermes-<ORIGEM>-<DESTINO>.csv`, em UTF-8 com BOM, separador `;` e cabeçalhos no idioma ativo.

---

# 17. Estados da Interface

Os estados fazem parte do Design System porque diversas áreas do Hermes dependem de dados da API.

## Loading

```
Carregando cotações...
```

O loading deve aparecer na área afetada sem bloquear desnecessariamente o restante da interface.

## Error

```
Não foi possível carregar as cotações.

[ Tentar novamente ]
```

A mensagem deve ser clara e acompanhada de uma ação de recuperação quando possível.

## Empty

```
Nenhum dado encontrado
```

Utilizado quando uma consulta é realizada com sucesso, mas não existem dados para apresentar.

## Disabled

Elementos desabilitados devem possuir contraste reduzido sem perder sua identificação.

## Focus

Todos os elementos interativos devem possuir um estado de foco visualmente identificável.

---

# 18. Iconografia

A biblioteca de ícones adotada é **Lucide React**.

## Tamanhos

| Tamanho | Uso |
| --- | --- |
| 16 px | Ícones auxiliares |
| 20 px | Ícones padrão |
| 24 px | Ícones de destaque |

Os ícones devem possuir estilo consistente e não devem ser utilizados apenas como decoração quando existir uma ação ou informação que precise ser comunicada.

---

# 19. Layout

## Desktop

O layout deve utilizar uma composição ampla e organizada, priorizando a leitura dos dados.

O conteúdo fica em um container único, centralizado, com:

```
Max-width: 1200 px
Padding lateral: 32 px (desktop), 24 px (tablet), 16 px (mobile)
```

Não há um grid global de 12 colunas: cada seção organiza o próprio conteúdo (o conversor usa 2 colunas no desktop; filtros usam `auto-fit`).

## Mobile

No mobile:

```
Seções em 1 coluna
Padding: 16 px
```

Os componentes devem se reorganizar verticalmente sem causar rolagem horizontal da página.

Tabelas podem utilizar rolagem horizontal interna quando necessário.

---

# 20. Responsive Design

O Hermes utiliza uma abordagem responsiva baseada na adaptação do conteúdo ao espaço disponível.

A interface deve preservar a hierarquia visual e a funcionalidade em desktop, tablet e dispositivos móveis, evitando rolagem horizontal da página.

## 20.1 Frames de referência

| Dispositivo | Frame |
| --- | --- |
| Mobile | 375 × 812 px |
| Mobile Large | 390 × 844 px |
| Tablet | 768 × 1024 px |
| Desktop | 1440 × 1024 px |

Os frames são referências para o design e não representam dispositivos específicos.

---

## 20.2 Breakpoints

| Faixa | Largura |
| --- | --- |
| Mobile | 0–767 px |
| Tablet | 768–1023 px |
| Desktop | 1024 px ou mais |

O layout deve se adaptar ao espaço disponível. Os breakpoints não devem ser utilizados para criar versões completamente diferentes da aplicação, mas para reorganizar componentes quando o espaço horizontal deixar de ser suficiente.

---

## 20.3 Grid

### Desktop

```
Seções em coluna única
Conversor: 2 colunas (formulário + resultado)
Container: max-width 1200 px
Padding lateral: 32 px
```

### Tablet

```
Seções em coluna única
Conversor: formulário sobre resultado
Filtros: auto-fit (min. 170 px)
Padding lateral: 24 px
```

### Mobile

```
1 coluna
Controles com largura total
Padding lateral: 16 px
```

---

## 20.4 Espaçamento responsivo

| Elemento | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Padding lateral | 32 px | 24 px | 16 px |
| Entre seções | 48 px | 48 px | 32 px |
| Entre grupos | 24 px | 24 px | 16 px |
| Entre elementos | 16 px | 16 px | 16 px |
| Micro espaçamento | 8 px | 8 px | 8 px |

A escala continua baseada em múltiplos de 8 px sempre que possível.

---

## 20.5 Tipografia responsiva

| Elemento | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Display | 40 px | 36 px | 32 px |
| H1 | 32 px | 30 px | 28 px |
| H2 | 24 px | 24 px | 22 px |
| H3 | 18 px | 18 px | 18 px |
| Body | 15–16 px | 15–16 px | 15–16 px |
| Label | 13 px | 13 px | 13 px |
| Financial Value | 32–40 px | 32–36 px | 28–32 px |

A redução da tipografia deve preservar a legibilidade e a hierarquia visual.

Valores financeiros continuam recebendo maior destaque mesmo no mobile.

---

## 20.6 Conversor

### Desktop

O conversor usa duas colunas: formulário à esquerda e resultado à direita. A ordem do formulário é valor → par → botão:

```
┌───────────────────────────────┐
│ 100,00                        │
└───────────────────────────────┘

┌──────────────┐     ┌──────────────┐
│ USD          │ ⇄   │ BRL          │
└──────────────┘     └──────────────┘

[          Converter           ]
```

O resultado fica à direita, separado por `border-left` e `padding-left` de 48 px, alinhado ao topo.

### Mobile

Os elementos são reorganizados verticalmente:

```
Valor

┌───────────────────────────────┐
│ 100,00                        │
└───────────────────────────────┘

Moeda de origem

┌───────────────────────────────┐
│ USD                        ▼  │
└───────────────────────────────┘

        [ ⇄ ]

Moeda de destino

┌───────────────────────────────┐
│ BRL                        ▼  │
└───────────────────────────────┘

[          Converter           ]
```

O botão de troca permanece acessível entre os seletores, centralizado, e o resultado aparece abaixo do formulário.

---

## 20.7 Resultado da conversão

No desktop, o resultado pode ocupar uma área horizontal maior.

No mobile, a informação deve permanecer centralizada ou empilhada:

```
100 USD

↓

R$ 542,18

1 USD = 5,4218 BRL
Cotação de 27/10/2026
```

O valor convertido continua utilizando a maior hierarquia tipográfica.

---

## 20.8 Seletor de períodos

No desktop:

```
7D   15D   30D   3M   6M   1A   5A   10A
```

No mobile, os períodos podem permanecer em uma única linha com rolagem horizontal **interna ao componente**, sem provocar rolagem horizontal na página:

```
7D  15D  30D  3M  6M  1A  5A  10A  →
```

O período ativo deve continuar visualmente destacado.

---

## 20.9 Gráfico

O gráfico deve ocupar toda a largura disponível.

### Desktop

```
Largura: disponível
Altura: 360 px
```

### Tablet

```
Largura: disponível
Altura: 320 px
```

### Mobile

```
Largura: 100%
Altura: 280 px
```

Os elementos secundários do gráfico devem ser reduzidos quando necessário para preservar a área útil de visualização.

---

## 20.10 Filtros

### Desktop

Os filtros podem aparecer em uma composição horizontal:

```
Data inicial | Data final | Cotação mínima | Cotação máxima | Limpar
```

### Mobile

Os campos devem ser empilhados:

```
Data inicial
[____________]

Data final
[____________]

Cotação mínima
[____________]

Cotação máxima
[____________]

[ Limpar filtros ]
```

Os campos devem ocupar a largura disponível.

No tablet e no desktop, os filtros usam `grid-template-columns: repeat(auto-fit, minmax(170px, 1fr))`; o botão "Limpar filtros" ocupa 100% da largura da sua coluna.

---

## 20.11 Tabela

A tabela deve permanecer dentro de um container com rolagem horizontal própria quando a largura disponível não for suficiente.

```
Página
└── Tabela
    └── Rolagem horizontal interna
```

A página principal não deve adquirir rolagem horizontal.

A tabela não deve reduzir excessivamente o tamanho das colunas apenas para caber na tela.

---

## 20.12 Botões

Os botões devem possuir:

```
Desktop:
Height: 48 px

Mobile:
Height: 48 px
```

No mobile, ações importantes podem ocupar toda a largura disponível:

```
┌───────────────────────────────┐
│          Converter            │
└───────────────────────────────┘
```

Ações secundárias podem permanecer com largura baseada no conteúdo quando houver espaço suficiente.

---

## 20.13 Inputs e Selects

Todos os inputs e selects devem possuir:

```
Height: 48 px
Radius: 10 px
Padding horizontal: 16 px
```

No mobile:

```
Width: 100%
```

Labels permanecem acima dos campos.

---

## 20.14 Containers

### Desktop

```
Max-width: 1200 px
Margin: auto
```

### Tablet

```
Width: calc(100% - 48px)
```

### Mobile

```
Width: calc(100% - 32px)
```

O conteúdo nunca deve encostar diretamente nas bordas da viewport.

---

## 20.15 Comportamento geral

### Desktop

Priorizar:

- composição horizontal;
- aproveitamento do espaço;
- duas ou mais áreas lado a lado quando fizer sentido;
- visualização simultânea de informações relacionadas.

### Tablet

Priorizar:

- redução das colunas;
- agrupamento de elementos;
- redução moderada dos espaçamentos;
- reorganização de componentes que não possuam espaço suficiente.

### Mobile

Priorizar:

- uma coluna;
- conteúdo empilhado;
- largura total dos controles;
- leitura vertical;
- áreas de toque confortáveis;
- rolagem interna apenas quando necessária.

---

## 20.16 Regra principal

A responsividade não deve criar uma experiência diferente do Hermes.

A identidade, hierarquia, componentes e funcionalidades devem permanecer consistentes.

O que muda entre os tamanhos é principalmente:

```
Desktop
horizontalidade
    ↓
Tablet
reorganização
    ↓
Mobile
empilhamento
```

A interface deve continuar apresentando o fluxo principal:

```
Conversor
    ↓
Gráfico
    ↓
Filtros / Tabela
    ↓
CSV
```

independentemente do tamanho da tela.

---

# 21. Acessibilidade

A interface deve considerar:

- contraste adequado entre texto e fundo;
- foco visual;
- navegação por teclado;
- labels associados aos campos;
- mensagens de erro associadas aos respectivos campos;
- tamanho adequado dos elementos interativos;
- não depender exclusivamente de cor para transmitir informações.

Estados como erro, sucesso e variação positiva/negativa devem possuir também informação textual ou outro indicador visual além da cor.

---

# 22. Internacionalização

O Hermes possui suporte para:

```
PT — Português (Brasil)
EN — English
ES — Español
```

A mudança de idioma deve afetar:

- textos da interface;
- mensagens;
- datas;
- números;
- estados;
- cabeçalhos do CSV.

Os códigos de moeda devem permanecer no padrão **ISO 4217**.

Exemplos:

```
BRL
USD
EUR
```

---

# 23. Princípios de Uso

Para manter a consistência visual do Hermes:

### Fazer

- utilizar a escala de espaçamento;
- utilizar os tokens de cor;
- priorizar `Navy`, `Blue` e `Canvas`;
- utilizar `Positive` e `Negative` semanticamente;
- manter hierarquia clara nos valores financeiros;
- utilizar bordas e espaçamento para organizar a interface;
- manter estados de interação consistentes;
- priorizar legibilidade dos dados.

### Evitar

- gradientes;
- glassmorphism;
- excesso de cards;
- excesso de cores;
- sombras muito fortes;
- componentes com estilos diferentes para a mesma função;
- uso decorativo das cores sem significado;
- elementos que disputem atenção com os valores financeiros.

---

# 24. Identidade Visual Resumida

```
HERMES

Modern Fintech
Digital Banking
Financial Clarity

Navy + Blue
Clean Canvas
Strong Financial Typography
Soft Borders
Clear Data Hierarchy
Minimal Decoration
```

A identidade do Hermes deve fazer com que a aplicação pareça uma ferramenta financeira digital real, mantendo simplicidade suficiente para que conversão, histórico, filtros e exportação permaneçam como elementos centrais da experiência.

---

## 25 Referência para Implementação

As decisões deste documento orientaram a construção do Figma e a implementação em React.

A implementação mantém correspondência entre:

```
Figma
  ↓
Design System
  ↓
Componentes React
  ↓
CSS Modules
```

Os tokens visuais definidos neste documento são reutilizados na implementação, evitando estilos arbitrários espalhados pelos componentes.

### 25.1 Como o design system chega ao código

- **Tokens:** `src/styles/tokens.css` é a fonte única de cores, tipografia, espaçamento, forma e layout.
- **Tailwind:** `src/index.css` importa a Manrope e o Tailwind, mapeia os tokens com `@theme inline` e define a tipografia base e o foco global.
- **CSS Modules:** cada componente tem seu `.module.css` com `@reference "../../../index.css";` e utilitários via `@apply`, sempre usando as variáveis (`var(--color-*)`, `var(--sp-*)`, `var(--radius-*)`).
- **Breakpoints:** mobile-first; `md:` corresponde a tablet (≥768 px) e `lg:` a desktop (≥1024 px).
- **Estrutura:** `src/components/atoms`, `src/components/molecules` e `src/components/organisms`; a árvore completa e as props estão em `COMPONENTS.md`.

## 26. Estado atual da implementação

- Interface completa em React + CSS Modules, com os três cards (Conversor, Histórico e Tabela), responsiva em 390/768/1024/1440 px.
- Dados mock em `src/mocks/data.js` (5 moedas e 21 registros de histórico), normalizados pelos mesmos adaptadores da API; a conversão é calculada em tempo real e o botão "Converter" é visual.
- Estados de loading, erro e vazio implementados nos componentes; a camada de serviço, os adaptadores e os hooks já seguem o contrato da API Frankfurter v2, mas o `App` ainda usa os mocks e não os conecta.
- Internacionalização PT/EN/ES via `constants/i18n.js`, com `document.documentElement.lang` sincronizado.
- Exportação CSV no navegador, com os registros filtrados e na ordenação atual.