# Arquitetura CineDash

Este documento descreve as decisões técnicas, a organização do projeto e os padrões utilizados no desenvolvimento do CineDash.

## 🛠 Stack Tecnológica

O projeto foi construído utilizando as seguintes tecnologias:

- **Core:** React 19, TypeScript (modo `strict`), Vite.
- **Server State & Cache:** TanStack Query v5.
- **Client State:** Zustand (com middleware `persist` para persistência local).
- **Roteamento:** TanStack Router (com loaders e typed routes).
- **UI Components:** Shadcn/ui (Radix UI) + TailwindCSS.
- **Formulários:** React Hook Form + Zod para validação.
- **Tabelas:** TanStack Table.
- **Testes:** Vitest + React Testing Library.

## 🏗 Estrutura do Projeto (Feature-Sliced Design)

O projeto segue a metodologia **Feature-Sliced Design (FSD)** para garantir escalabilidade e separação de interesses. A estrutura de pastas é organizada em camadas:

- `src/app/`: Configuração global, providers (TanStack Query, Router) e estilos globais.
- `src/pages/`: Composição de features por rota. Cada pasta representa uma "página" lógica da aplicação.
- `src/features/`: Implementação das regras de negócio e lógica específica de cada característica (ex: `auth`, `watchlist`, `discovery`).
- `src/entities/`: Modelos de domínio reutilizáveis (ex: tipos de filmes, schemas Zod, cards básicos).
- `src/shared/`: Código 100% agnóstico de feature, incluindo cliente da API (wrapper do `fetch`), hooks genéricos, componentes de UI base (Shadcn) e utilitários.

### Regras de Interdependência:
1. Camadas superiores podem importar de camadas inferiores.
2. `features/` nunca importa de `pages/`.
3. `shared/` nunca importa de nada acima dele.
4. Cada feature é autocontida (possui seus próprios hooks, UI, API e store).

## 🔐 Autenticação Simulada

A autenticação é gerida de forma local para fins de demonstração:

- **Login:** Realizado via `React Hook Form` com validação `Zod` (email válido + senha > 6 caracteres).
- **Persistência:** Ao logar, um token fictício (`base64`) é gerado e armazenado no `localStorage`.
- **Estado Global:** O estado de autenticação é gerenciado por uma store Zustand localizada em `src/features/auth/model/store.ts`.
- **Proteção de Rotas:** Utilização do `beforeLoad` do TanStack Router para verificar a existência do token antes de permitir o acesso a rotas privadas.

## 🎬 Integração com TMDB API

- **Fetch Wrapper:** Centralizado em `src/shared/api/tmdb.ts`. Utiliza a variável de ambiente `VITE_TMDB_API_KEY`.
- **Data Fetching:** Gerenciado pelo TanStack Query.
- **Caching:** Configurado via `staleTime` para otimizar requisições (ex: trending data permanece "fresh" por 5 minutos).
- **Paginação:** Implementada via Query Params e mantida pelo TanStack Query com `keepPreviousData: true`.

## 🎨 UI/UX e Temas

- **Theming:** Suporte a Dark/Light mode persistido no `localStorage` via Zustand.
- **Feedback Visual:** Uso de `Skeletons` para estados de carregamento e `Sonner` para notificações (toasts) de sucesso/erro.
- **Responsividade:** Design mobile-first utilizando utilitários do TailwindCSS.

## 🗂 Gerenciamento da Watchlist

- **Estado:** Armazenado via Zustand com o middleware `persist`, garantindo que os dados não sejam perdidos ao recarregar a página.
- **Tabela:** Implementada com **TanStack Table**, permitindo a ordenação por título, gênero e rating.
- **Ações:** Remoção imediata da lista com feedback visual via Toasts.

## 🧪 Estratégia de Testes

- **Ferramentas:** Vitest para execução e React Testing Library para renderização e eventos de DOM.
- **Localização:** Arquivos de teste colocalizados (`*.test.tsx`) junto aos componentes ou lógica que testam.
- **Cobertura:** Foco em lógica crítica (schemas Zod, stores Zustand, hooks utilitários) e componentes de interface (Login, Discovery Filters).
