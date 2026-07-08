# Sympler — Sketch V1
Protótipo do Marketplace de Experiências Sympler.

## Como rodar localmente

### Opção 1 — Python (recomendado)
```sh
cd sympler-mockup
python3 -m http.server 8080
```
Abrir no browser: http://localhost:8080

### Opção 2 — Node.js
```sh
cd sympler-mockup
npx serve .
```

### Opção 3 — VS Code
Instalar a extensão **Live Server** e clicar em "Go Live".

## Estrutura
```
sympler-mockup/
├── index.html                  → Entrada (redireciona para login)
├── assets/                     → Logo, ícone Sympla Coin, fontes
├── css/                        → Estilos globais
├── js/                         → Scripts de navegação
└── pages/
    ├── colaborador/            → 13 telas da visão Sympler
    │   ├── login.html
    │   ├── boas-vindas.html
    │   ├── dashboard.html
    │   ├── como-ganhar.html    → Banners "Como ganhar SC"
    │   ├── marketplace.html    → 8 itens físicos
    │   ├── extrato.html
    │   ├── perfil.html
    │   ├── notificacoes.html
    │   ├── reconhecimento.html
    │   ├── movimento.html      → Card "Em breve" (aguarda API)
    │   └── ...
    └── admin/                  → 11 telas do painel Admin
        ├── admin-participantes.html
        ├── admin-pontos.html
        ├── admin-banners.html  → "Como ganhar SC" (gestão)
        ├── admin-marketplace.html
        ├── admin-resgates.html
        ├── admin-relatorios.html
        ├── admin-integracoes.html
        └── admin-configuracoes.html

## Moeda
- Sympla Coins (SC) — moeda única do marketplace
- Sem taxa de conversão na V1 (Opção A)

## Versão
Sketch V1 — julho/2026
People & Cultura Sympla
