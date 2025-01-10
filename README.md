# REST

### Tech stack:

-   Languages: JS, TS
-   Libs & frameworks: react, nx, vite, tailwind, axios
-   Linters, type checkers, etc.: eslint, prettier, husky
-   Package manager: npm

## Getting Started

#### 1. Install dependencies

```bash
npm i
```

#### 2. Install husky(only dev)

```bash
- npx husky-init
- npm pkg delete scripts.prepare
```

Then open **.husky/pre-commit** and add `npx lint-staged@15.2.5 && npm run build` instead of `npm test`

#### 3. Run dev server

```bash
npm run dev
```
