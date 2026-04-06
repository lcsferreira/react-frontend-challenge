# Instruções CineDash

Este guia orienta sobre como configurar e executar o CineDash localmente.

## 📋 Pré-requisitos

Certifique-se de ter instalados em sua máquina:
- **Node.js** (v18.0.0 ou superior)
- **npm** (v9 ou superior) ou **pnpm** (recomendado)

## 🚀 Como Rodar o Projeto

1. **Clonar o Repositório:**
   ```bash
   git clone [url-do-repositorio]
   cd cinedash
   ```

2. **Instalar Dependências:**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto com as seguintes chaves:
   ```env
   VITE_TMDB_API_KEY=seu_api_key_v3_aqui
   ```
   *Obtenha sua chave em: https://developer.themoviedb.org/docs/getting-started*

4. **Executar em Modo de Desenvolvimento:**
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```
   A aplicação estará disponível em `http://localhost:5173`.

## 🧪 Comandos Disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento com Vite. |
| `npm run build` | Compila o projeto para produção na pasta `/dist`. |
| `npm run preview` | Serve o build de produção localmente. |
| `npm run test` | Executa os testes usando Vitest. |
| `npm run test:coverage` | Gera o relatório de cobertura de testes. |
| `npm run lint` | Executa o ESLint para verificar a qualidade do código. |

## 🏗 Estrutura da Aplicação

- **Discovery:** Explore filmes em destaque, populares e pesquise por títulos com filtros dinâmicos.
- **Watchlist:** Adicione e remova filmes de sua lista de interesses (persistida localmente).
- **Movie Details:** Veja informações detalhadas (elenco, trailers, nota) de cada filme.
- **Login:** Autenticação simulada para acesso às áreas restritas do dashboard.
