# Sympler — App Frontend V1
## Documentação Técnica para Handoff ao Time de Backend

**Versão:** 1.0 — Sketch V1 (julho/2026)  
**Mantido por:** People & Cultura Sympla  
**Ponto focal:** Lucas Andrade

---

## 1. Estrutura de Pastas e Arquivos

```
sympler-app/                          ← raiz do projeto (dentro do zip)
│
├── index.html                        ← Landing page (escolha de visão)
├── LEIA-ME.md                        ← Readme original para navegação local
├── relatorio-contextualizacao-projeto.html   ← Relatório de contexto (HTML)
├── relatorio-contextualizacao-projeto.pdf    ← Relatório de contexto (PDF)
├── relatorio-desenvolvimento-sympler-v1.docx ← Relatório de desenvolvimento (Word)
│
├── assets/
│   ├── logo.svg                      ← Logo Sympler (branco, para landing)
│   ├── sympla-coin.svg               ← Ícone da moeda Sympla Coin
│   └── fonts/
│       ├── opensans-regular.woff2    ← Fonte Open Sans 400
│       ├── opensans-semibold.woff2   ← Fonte Open Sans 600
│       └── opensans-bold.woff2       ← Fonte Open Sans 700
│
├── css/
│   ├── variables.css                 ← Variáveis CSS (cores, fontes, espacamentos)
│   ├── main.css                      ← Estilos globais e reset
│   ├── components.css                ← Componentes reutilizáveis (cards, badges, modais)
│   ├── desktop-sympler.css           ← Layout desktop + estilo colaborador
│   └── mobile.css                    ← Estilos mobile/responsivo
│
├── js/
│   └── nav.js                        ← Navegação, modais, tooltips, estado ativo
│
└── pages/
    ├── .gitkeep
    ├── _sidebar.inc                  ← (não utilizado na V1 — arquivo de referência)
    ├── colaborador/                  ← 13 telas — visão do colaborador
    │   ├── login.html
    │   ├── boas-vindas.html
    │   ├── dashboard.html
    │   ├── como-ganhar.html
    │   ├── campanhas-lista.html
    │   ├── campanha-detalhe.html
    │   ├── marketplace.html
    │   ├── extrato.html
    │   ├── perfil.html
    │   ├── notificacoes.html
    │   ├── reconhecimento.html
    │   ├── movimento.html
    │   └── aniversariantes.html
    │
    └── admin/                       ← 11 telas — visão do painel administrativo
        ├── admin-participantes.html
        ├── admin-participante-perfil.html
        ├── admin-pontos.html
        ├── admin-banners.html
        ├── admin-marketplace.html
        ├── admin-resgates.html
        ├── admin-relatorios.html
        ├── admin-integracoes.html
        ├── admin-configuracoes.html
        ├── admin-campanhas.html
        └── admin-campanha-criar.html
```

---

## 2. Lista de Telas

### Visão Colaborador (`pages/colaborador/`)

| Arquivo | Descrição |
|---|---|
| `login.html` | Tela de login do colaborador (autenticação mockada com email fixo) |
| `boas-vindas.html` | Tela de boas-vindas pós-login com instruções e saldo inicial |
| `dashboard.html` | Painel principal do colaborador: saldo, últimas movimentações, banners, cards "Fique por Dentro" |
| `como-ganhar.html` | Banners informativos sobre formas de acumular Sympla Coins |
| `campanhas-lista.html` | Lista de campanhas ativas disponíveis para o colaborador |
| `campanha-detalhe.html` | Detalhe de uma campanha específica com regras e botão de participação |
| `marketplace.html` | Catálogo de brindes Sympla com grid de cards, busca, filtros e modal de resgate |
| `extrato.html` | Extrato completo de movimentação de Sympla Coins do colaborador |
| `perfil.html` | Perfil do colaborador com avatar, dados e preferências |
| `notificacoes.html` | Lista de notificações e alertas do sistema |
| `reconhecimento.html` | Tela para enviar reconhecimento a colegas (gera Sympla Coins para ambos) |
| `movimento.html` | Card "Em breve" — aguarda integração com API Sympla em Movimento |
| `aniversariantes.html` | Lista de aniversariantes do mês (cards de celebração) |

### Visão Admin (`pages/admin/`)

| Arquivo | Descrição |
|---|---|
| `admin-participantes.html` | Lista completa de participantes com busca, filtros, paginação e modal de criação |
| `admin-participante-perfil.html` | Perfil detalhado de um participante específico (visualização admin) |
| `admin-pontos.html` | Gerenciamento de pontos: crédito, débito e histórico por participante |
| `admin-banners.html` | CRUD de banners "Como ganhar SC" (ativar, desativar, criar, editar) |
| `admin-marketplace.html` | Gestão do catálogo do marketplace: itens, preços, estoque |
| `admin-resgates.html` | Registro de resgates com filtros, status e exportação |
| `admin-relatorios.html` | Painel de relatórios: participação, saldo, engajamento |
| `admin-integracoes.html` | Status e configuração das integrações externas (Qulture, Degreed, etc.) |
| `admin-configuracoes.html` | Configurações gerais da plataforma (taxas, regras, limites) |
| `admin-campanhas.html` | Lista de campanhas com KPI de participação e status |
| `admin-campanha-criar.html` | Formulário de criação de nova campanha |

---

## 3. Dados Mockados (Estáticos em HTML/JS) — Substituir por APIs Reais

Todos os dados abaixo são **hardcoded nos arquivos HTML/JS** e precisam ser substituídos por chamadas a APIs reais no backend.

### 3.1 Dados do Colaborador Logado

**Arquivos afetados:** `pages/colaborador/dashboard.html`, `pages/colaborador/perfil.html`, `pages/colaborador/marketplace.html`, `pages/colaborador/extrato.html`, `pages/colaborador/notificacoes.html`, `pages/colaborador/reconhecimento.html`, `pages/colaborador/boas-vindas.html`, `pages/colaborador/aniversariantes.html`

```
Mock atual:
- Nome: "Ana Lima"
- Cargo: "Analista · Equipe Comercial SP"
- Saldo: 1.250 Sympla Coins (hardcoded na topbar e no JS)
- ID do usuário: não existe (não há session/token)
- Email: não utilizado (login mockado)
```

**API esperada:**
```
GET /api/v1/colaborador/me
Response: { id, nome, email, cargo, departamento, alocacao, saldo_sc, avatar_url }
```

### 3.2 Saldo e Extrato

**Arquivos afetados:** `pages/colaborador/dashboard.html` (seção "Resumo do período"), `pages/colaborador/extrato.html`

```
Mock atual:
- Saldo acumulado: 1.250 SC
- Ganhos no mês: +400 SC
- Resgates no mês: -150 SC
- Lista de movimentações: hardcoded com 4 itens fixos
  (Campanha Indicação, Resgate Caneca, Campanha Q1, Movimento Semana 22)
```

**API esperada:**
```
GET /api/v1/colaborador/{id}/extrato?page=1&limit=20
Response: { saldo_atual, total_ganhos_mes, total_resgates_mes, movimentacoes: [...] }

GET /api/v1/colaborador/{id}/saldo
Response: { saldo_atual }
```

### 3.3 Login e Autenticação

**Arquivo afetado:** `pages/colaborador/login.html`

```
Mock atual:
- Qualquer email aceita login e redireciona para boas-vindas
- Não há token, sessão ou validação
- Não há fluxo de logout
```

**API esperada:**
```
POST /api/v1/auth/login
Body: { email, senha }
Response: { token, refresh_token, usuario: { id, nome, ... } }

POST /api/v1/auth/logout
Header: Authorization: Bearer <token>
```

### 3.4 Marketplace — Catálogo de Brindes

**Arquivo afetado:** `pages/colaborador/marketplace.html`

```
Mock atual:
- 8 itens fixos com nome, preço em SC, emoji (thumb placeholder), estoque
- Estoque decrementado em JS local (não persiste)
- Filtro "Todos" / "Brindes Sympla" (ambos mostram o mesmo)
- Busca por texto (client-side)
```

**API esperada:**
```
GET /api/v1/marketplace/itens?categoria=&busca=&page=1
Response: { itens: [{ id, nome, descricao, preco_sc, categoria, estoque, imagem_url }], total }

GET /api/v1/marketplace/itens/{id}
Response: { id, nome, descricao, preco_sc, categoria, estoque, imagem_url, fornecedor }
```

### 3.5 Resgate de Itens

**Arquivo afetado:** `pages/colaborador/marketplace.html` (modal de resgate)

```
Mock atual:
- Modal mostra saldo atual hardcoded (1.250 SC)
- Confirmação reduz saldo e estoque em memória JS local
- Toast de sucesso/erro simulado
- Não há registro persistente de resgate
```

**API esperada:**
```
POST /api/v1/colaborador/{id}/resgates
Body: { item_id, quantidade: 1 }
Response: { resgate_id, item, saldo_anterior, saldo_posterior, status, prazo_entrega }

GET /api/v1/colaborador/{id}/resgates
Response: { resgates: [{ id, item, data, status, prazo_entrega }] }
```

### 3.6 Campanhas

**Arquivos afetados:** `pages/colaborador/campanhas-lista.html`, `pages/colaborador/campanha-detalhe.html`

```
Mock atual:
- Lista vazia ou com dados HTML fixos hardcoded
- Detalhe de campanha com regras e banner mockados
```

**API esperada:**
```
GET /api/v1/campanhas?status=ativa&page=1
Response: { campanhas: [{ id, titulo, descricao, banner_url, regras, premio_sc, data_inicio, data_fim }] }

GET /api/v1/campanhas/{id}
Response: { id, titulo, descricao, regras, premio_sc, participantes_count, status }
```

### 3.7 Reconhecimento

**Arquivo afetado:** `pages/colaborador/reconhecimento.html`

```
Mock atual:
- Formulário funcional em JS local (mostra toast de enviado)
- Não há persistência nem notificação ao destinatário
```

**API esperada:**
```
POST /api/v1/reconhecimento
Body: { destinatario_id, mensagem, tipo_reconhecimento }
Response: { reconhecimento_id, pontuacao_gerada }

GET /api/v1/colaborador/{id}/reconhecimentos-recebidos
Response: { reconhecimentos: [...] }
```

### 3.8 Participantes (Admin)

**Arquivos afetados:** `pages/admin/admin-participantes.html`, `pages/admin/admin-participante-perfil.html`

```
Mock atual:
- 7 usuários fixos em tabela HTML
- Filtros client-side por nome/email/status/departamento
- Dados: nome, email, departamento, alocação, pontos, status, último acesso
- "Exportar CSV" é alert() mockado
- "Novo Participante" modal cria registro apenas em memória
```

**API esperada:**
```
GET /api/v1/admin/participantes?page=1&limit=20&busca=&status=&departamento=&alocacao=
Response: { total, pagina, participantes: [{ id, nome, email, dept, alocacao, pontos, status, ultimo_acesso }] }

POST /api/v1/admin/participantes
Body: { nome, email, departamento, cargo, alocacao, status }
Response: { id, ... }

PUT /api/v1/admin/participantes/{id}
Body: { ...fields to update... }

DELETE /api/v1/admin/participantes/{id}

GET /api/v1/admin/participantes/{id}
Response: { ...full user object... }

GET /api/v1/admin/participantes/exportar?formato=csv&filtros=...
Response: file download (CSV)
```

### 3.9 Pontos (Admin)

**Arquivo afetado:** `pages/admin/admin-pontos.html`

```
Mock atual:
- Interface de crédito/débito com dropdown de participantes fixos
- Histórico de movimentação simulado
```

**API esperada:**
```
POST /api/v1/admin/participantes/{id}/transacoes
Body: { tipo: "credito"|"debito", valor, motivo, campanha_id?(opcional) }
Response: { transacao_id, novo_saldo }

GET /api/v1/admin/participantes/{id}/transacoes
Response: { transacoes: [...] }
```

### 3.10 Banners "Como Ganhar SC" (Admin)

**Arquivo afetado:** `pages/admin/admin-banners.html`

```
Mock atual:
- Cards de banners com botão Ativo/Inativo toggle em JS local
- Sem criação/edição real
```

**API esperada:**
```
GET /api/v1/admin/banners
Response: { banners: [{ id, titulo, descricao, cor_fundo, imagem_url, ordem, ativo }] }

POST /api/v1/admin/banners
Body: { titulo, descricao, cor_fundo, imagem_url, ordem }

PUT /api/v1/admin/banners/{id}
Body: { ativo: bool, ordem: int, ... }

DELETE /api/v1/admin/banners/{id}
```

### 3.11 Marketplace Admin

**Arquivo afetado:** `pages/admin/admin-marketplace.html`

```
Mock atual:
- Tabela de itens com ações (ativar/inativar) em JS local
- Formulário de criação de item com alert() mockado
```

**API esperada:**
```
GET /api/v1/admin/marketplace/itens
POST /api/v1/admin/marketplace/itens
PUT /api/v1/admin/marketplace/itens/{id}
DELETE /api/v1/admin/marketplace/itens/{id}
```

### 3.12 Resgates Admin

**Arquivo afetado:** `pages/admin/admin-resgates.html`

```
Mock atual:
- Tabela com resgates fictícios e filtros client-side
```

**API esperada:**
```
GET /api/v1/admin/resgates?status=&data_inicio=&data_fim=&page=1
Response: { total, resgates: [{ id, participante, item, valor_sc, data, status, prazo_entrega }] }

PUT /api/v1/admin/resgates/{id}/status
Body: { status: "pendente"|"aprovado"|"enviado"|"entregue"|"cancelado" }
```

### 3.13 Relatórios Admin

**Arquivo afetado:** `pages/admin/admin-relatorios.html`

```
Mock atual:
- Cards com métricas hardcoded (4.821 participantes, 3.104 ativos, etc.)
- Gráfico barras (SVG inline) com dados fixos
```

**API esperada:**
```
GET /api/v1/admin/relatorios/dashboard
Response: { total_participantes, ativos_30d, novos_mes, churned_90d, volume_sc_mes, engajamento_diario[...] }

GET /api/v1/admin/relatorios/participacao-campanhas
Response: { campanhas: [{ id, titulo, participantes, taxa_conversao }] }

GET /api/v1/admin/relatorios/resgates?periodo=mes
Response: { total_resgates, volume_sc, top_itens[...] }
```

### 3.14 Configurações Admin

**Arquivo afetado:** `pages/admin/admin-configuracoes.html`

```
Mock atual:
- Formulário com valores padrão (taxa 0% para V1, regras fixas)
- Botão salvar com alert() mockado
```

**API esperada:**
```
GET /api/v1/admin/configuracoes
Response: { taxa_conversao, valor_min_resgate, valor_max_resgate, regras[...] }

PUT /api/v1/admin/configuracoes
Body: { ...fields... }
```

### 3.15 Campanhas Admin

**Arquivos afetados:** `pages/admin/admin-campanhas.html`, `pages/admin/admin-campanha-criar.html`

```
Mock atual:
- Lista com 3 campanhas fixas em HTML
- Formulário de criação com validação client-side e alert() mockado
```

**API esperada:**
```
GET /api/v1/admin/campanhas
POST /api/v1/admin/campanhas
PUT /api/v1/admin/campanhas/{id}
DELETE /api/v1/admin/campanhas/{id}
```

### 3.16 Integrações Admin

**Arquivo afetado:** `pages/admin/admin-integracoes.html`

```
Mock atual:
- Cards de status para Qulture.Rocks, Prosus Academy, HRIS, API Movimento
- Status hardcoded (Conectado / Em breve / Não configurado)
```

**API esperada:**
```
GET /api/v1/admin/integracoes
Response: { integracoes: [{ id, nome, status, ultimo_sync, erro?, configuracao }] }

POST /api/v1/admin/integracoes/{id}/sync
PUT /api/v1/admin/integracoes/{id}/config
```

### 3.17 Aniversariantes

**Arquivo afetado:** `pages/colaborador/aniversariantes.html`

```
Mock atual:
- Cards fixos de 3 aniversariantes mockados
```

**API esperada:**
```
GET /api/v1/colaborador/aniversariantes?mes=atual
Response: { aniversariantes: [{ id, nome, cargo, data_nascimento, avatar_url }] }
```

### 3.18 "Sympla em Movimento"

**Arquivo afetado:** `pages/colaborador/movimento.html`

```
Mock atual:
- Card "Em breve" — área inteira é placeholder, aguardando API
```

**API esperada:**
```
GET /api/v1/movimento/status
Response: { ativo: bool, proxima_semana, historico_semanas[...] }

GET /api/v1/movimento/semana/{id}
Response: { semana, dias: [{ data, passos, meta, premiacoes_sc }] }
```

---

## 4. Integrações Previstas para V2

### 4.1 Qulture.Rocks
- **Objetivo:** Sincronizar dados de AVD (Avaliação de Desempenho 180°) e reconhecer Symplers que se destacaram no ciclo.
- **Webhook esperado:** Quando um colaborador recebe conceito AT ou SE na AVD, creditar Sympla Coins automaticamente.
- **API necessária:** `GET /api/v1/integracoes/qulture/avd` — busca ciclos e conceitos.

### 4.2 Prosus Academy / Degreed
- **Objetivo:** Vincular conclusão de cursos/learning paths a campanhas de Sympla Coins.
- **Webhook:** Quando um Sympler conclui um curso no Degreed, disparar pontuação configurada na campanha.
- **API necessária:** `GET /api/v1/integracoes/degreed/certificados` — busca completions.

### 4.3 HRIS (Workday, Senior, TOTVS — a definir)
- **Objetivo:** Manter cadastro de participantes sincronizado com o sistema de RH (admissão, demissão, transferência).
- **Webhook:** Admitidos são incluídos automaticamente; demissões marcam conta como inativa.
- **Campos críticos:** nome, email corporativo, departamento, alocação (QG BH / QG SP / Remoto), cargo, data de admissão.

### 4.4 API Sympla em Movimento
- **Objetivo:** Integrar passos diarios dos Symplers (via wearables ou app de saúde) com o programa de recompensas.
- **API necessária:** `GET /api/v1/integracoes/movimento/passos` — retorna passos diários do colaborador por semana.
- **Regra de negócio:** cada 10.000 passos = X SC (valor configurável em `admin-configuracoes.html`).

---

## 5. Como Rodar Localmente

### Pré-requisitos
- Python 3 (já incluso no ambiente) ou qualquer servidor HTTP estático

### Instruções

```sh
# 1. Entrar na pasta do projeto
cd sympler-app/

# 2. Iniciar servidor HTTP estático
python3 -m http.server 8080

# 3. Abrir no navegador
# http://localhost:8080
```

Alternativas:
```sh
# Node.js (se disponível)
npx serve .

# VS Code: extensão "Live Server" → clique em "Go Live"
```

### Navegação padrão
1. Abrir `index.html` → escolher visão: **Sympler** (colaborador) ou **Sympler Admin**
2. Visão colaborador: clique em qualquer tela da navbar para navegar
3. Visão admin: usar a sidebar esquerda para navegar entre telas

---

## 6. Tecnologias e Stack

| Categoria | Tecnologia |
|---|---|
| Estrutura | HTML5 (semântico) |
| Estilos | CSS3 (vanilla, sem frameworks) |
| Lógica | JavaScript ES6+ (vanilla, sem frameworks) |
| Fontes | Open Sans (woff2, auto-hospedado em `assets/fonts/`) |
| Ícones | Emojis Unicode + SVG inline |
| Build | Nenhum (zero dependências, zero NPM) |
| Compatibilidade | Chrome, Firefox, Safari (desktop + mobile) |

### Arquitetura de CSS

```
variables.css  → custom properties (cores, breakpoints, espaçamentos)
main.css      → reset, tipografia base, layout genérico
components.css → cards, badges, botões, modais, toasts
desktop-sympler.css → layout desktop + visual colaborador
mobile.css    → overrides para telas < 768px
```

### Arquitetura de JavaScript

```
nav.js — módulo único (IIFE) com:
  - setActiveNav()      → marca link ativo na navbar
  - initTooltips()      → tooltips via click (mobile)
  - initModals()         → abertura/fechamento de modais via data-modal
  - SymplerNav.openModal / closeModal → expostas no window para uso externo
```

### Padrões de Dados Client-Side

- Dados do usuário logado: acessados via elementos DOM (topbar) — **substituir por sessão/JWT**
- Saldo: lido e alterado em memória JS — **substituir por API**
- Filtros de tabela: totalmente client-side — **mover para API com query params**
- Estoque do marketplace: decrementado em memória — **substituir por API com controle de concorrência**

---

*Documento gerado automaticamente para handoff técnico — People & Cultura Sympla — 2026*
