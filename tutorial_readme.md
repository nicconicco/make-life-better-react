# Tutorial do Projeto Make Life Better (React)

## Visao geral: como esse projeto foi
O projeto nasceu a partir do template oficial do Vite com React + TypeScript. A escolha foi por um setup leve, com HMR rapido e build simples. A partir dessa base, o repositorio evoluiu para o produto Make Life Better.

Hoje a estrutura combina uma camada React moderna com uma camada legacy (JavaScript vanilla) que ainda executa boa parte do comportamento da loja e do admin. Essa estrategia permite migrar gradualmente para React sem perder funcionalidades ja existentes.

## Camadas do projeto (o que significam e como funcionam)

**Entrada e roteamento**
Significa: o ponto de entrada da aplicacao e a troca de paginas por hash route.
Funciona: `src/main.tsx` monta o React no `#root` e aplica estilos globais. `src/App.tsx` le o `location.hash` e decide entre `/store` e `/admin`.
Arquivos chave: `src/main.tsx`, `src/App.tsx`, `src/types/routes.ts`.

**Pages (telas)**
Significa: superficies completas (Store e Admin) com markup principal.
Funciona: cada pagina renderiza a estrutura HTML e, no `useEffect`, inicializa a logica legacy com `initStoreApp` ou `initAdminApp`.
Arquivos chave: `src/pages/Store.tsx`, `src/pages/Admin.tsx`.

**Components (UI compartilhada)**
Significa: blocos React reutilizaveis ou estruturais.
Funciona: hoje esta bem leve, com `Layout` como casca do app. A ideia e crescer aqui conforme a migracao avancar.
Arquivos chave: `src/components/Layout.tsx`.

**Styles (estilos)**
Significa: identidade visual e estilos globais do projeto.
Funciona: `global.css` aplica base da aplicacao, e os estilos especificos da loja e do admin ficam em pastas dedicadas.
Arquivos chave: `src/styles/global.css`, `src/styles/admin.css`, `src/styles/store/*`.

**Legacy Modules (orquestracao)**
Significa: camada de aplicacao antiga (JS vanilla) que coordena a UI e regras de negocio.
Funciona: os modulos inicializam listeners, expõem funcoes no `window` para os `onClick` do HTML, chamam services e atualizam o DOM.
Arquivos chave: `src/legacy/modules/store-app.js`, `src/legacy/modules/admin/admin-app.js`, `src/legacy/modules/*`.

**Legacy Services (dados e integracoes)**
Significa: acesso a dados e operacoes de negocio (Firebase, carrinho, pedidos, usuarios).
Funciona: encapsulam chamadas ao Firestore/Auth e fornecem funcoes para os modulos (ex: `getAllProducts`, `createOrder`, `login`).
Arquivos chave: `src/legacy/services/*.js`.

**Legacy Config (constantes e Firebase)**
Significa: configuracoes globais e constantes centralizadas.
Funciona: `constants.js` guarda strings padrao, colecoes e labels. `firebase.config.js` inicializa o Firebase e exporta `db` e `auth`.
Arquivos chave: `src/legacy/config/constants.js`, `src/legacy/config/firebase.config.js`.

**Legacy Utils (helpers)**
Significa: funcoes utilitarias de DOM, formatacao e storage.
Funciona: reduz repeticao e padroniza interacoes com a pagina.
Arquivos chave: `src/legacy/utils/*.js`.

**Services (nova camada em migracao)**
Significa: onde os novos services React/TS devem viver.
Funciona: atualmente esta vazia, como placeholder para mover logica do legacy.
Arquivos chave: `src/services/index.ts`.

**Config e Types (React/TS)**
Significa: configuracoes simples do app e tipos TypeScript.
Funciona: centraliza valores e tipos para manter coerencia.
Arquivos chave: `src/config/app.ts`, `src/types/*`.

**Assets e Public**
Significa: imagens e arquivos estaticos.
Funciona: `src/assets` guarda imagens importadas pelo bundler, `public` serve assets estaticos diretos.
Arquivos chave: `src/assets/*`, `public/*`.

## Como a aplicacao funciona (fluxos principais)

**Fluxo da loja (Store)**
1. `App` detecta `#/store` e renderiza `StorePage`.
2. `StorePage` chama `initStoreApp()` uma vez.
3. `initStoreApp` registra listeners e carrega produtos via services.
4. Services acessam o Firebase e devolvem dados.
5. Renderers atualizam o DOM (grid de produtos, carrinho, checkout).

**Fluxo do admin**
1. `App` detecta `#/admin` e renderiza `AdminPage`.
2. `AdminPage` chama `initAdminApp()` uma vez.
3. O admin expõe funcoes no `window` para os botoes (login, add produto, etc).
4. Services fazem CRUD no Firebase e retornam resultados.
5. O DOM do admin e atualizado por cada modulo (eventos, produtos, usuarios, chat).

## Onde mexer quando for evoluir

**Migrar UI para React**
Comece substituindo trechos de HTML nos `pages` por componentes React e mova handlers para a camada `src/services` (nova).

**Refatorar Services**
Movimente uma service por vez do `src/legacy/services` para `src/services` e atualize a page/Component para usar a nova API.

**Padronizar estilos**
Centralize tokens e variaveis em `global.css` e organize temas na pasta `src/styles`.

## Como rodar (rapido)
1. `npm install`
2. Configure o Firebase no `.env` baseado no `.env.example`.
3. `npm run dev`

Rotas:
`http://localhost:5173/#/store`
`http://localhost:5173/#/admin`
