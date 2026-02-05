# Make Life Better (React)

## Como começou
Este projeto começou a partir do template oficial React + TypeScript do Vite, escolhido para entregar um setup leve com HMR e build rápido. A base inicial já vinha com React, TypeScript, ESLint e os scripts padrão de desenvolvimento (`dev`, `build`, `lint`, `preview`). A partir dessa fundação, o repositório evolui para implementar o produto Make Life Better mantendo uma estrutura moderna e simples.

## Como rodar
1. Instale as dependências:
   - `npm install`
2. Configure o Firebase criando um arquivo `.env` baseado no `.env.example`.
3. Inicie o servidor:
   - `npm run dev`

## Rotas principais
- Loja: `http://localhost:5173/#/store`
- Admin: `http://localhost:5173/#/admin`

## Observacoes
- A integracao com Firebase depende das variaveis `VITE_FIREBASE_*`.
- A migracao esta em andamento; a base visual e os modulos legacy estao conectados para manter o comportamento atual enquanto a refatoracao em React avanca.
