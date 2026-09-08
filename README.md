# ♻️ ReUse

Plataforma web desenvolvida com **Next.js**, **Prisma ORM** e **PostgreSQL** como parte da atividade **Missão ReUse — Fase 5** do curso de Web Design da FIAP.

## Sobre o projeto

O ReUse é uma plataforma voltada à reutilização e troca de itens entre usuários.

O projeto já havia sido desenvolvido anteriormente em uma experiência mobile e, nesta etapa, foi evoluído para uma aplicação web. A proposta não foi reproduzir integralmente o aplicativo mobile, mas selecionar áreas importantes da experiência e oferecer uma nova forma de acesso ao usuário.

A versão web concentra-se na descoberta e consulta de itens e no gerenciamento de favoritos.

## Funcionalidades

- Tela de Login
- Listagem de itens disponíveis
- Busca de itens por nome
- Filtro por categoria
- Busca e filtro utilizados em conjunto
- Visualização dos detalhes de um produto
- Rotas dinâmicas para os produtos
- Adição de itens aos favoritos
- Remoção de itens dos favoritos
- Persistência dos favoritos no banco de dados
- Integração entre Next.js, Prisma ORM e PostgreSQL

## Tecnologias utilizadas

- **Next.js**
- **React**
- **JavaScript**
- **Tailwind CSS**
- **Prisma ORM**
- **PostgreSQL**

## Rotas principais

| Rota | Descrição |
| --- | --- |
| `/` | Tela de Login |
| `/itens` | Listagem, busca e filtro dos itens disponíveis |
| `/item/[id]` | Página dinâmica de detalhes do produto |
| `/favoritos` | Itens favoritados pelo usuário |

## Prisma ORM

O Prisma ORM é utilizado como camada de integração entre a aplicação Next.js e o banco de dados PostgreSQL.

Entre as operações utilizadas no projeto estão:

- `findMany` para consultar itens e favoritos;
- `findUnique` para consultar um produto específico;
- `upsert` para adicionar um favorito evitando duplicidade;
- `deleteMany` para remover um favorito.

As operações relacionadas aos favoritos são realizadas no servidor através de **Server Actions**.

## Banco de dados

O banco PostgreSQL foi estruturado com quatro entidades principais:

### Usuario

Armazena os dados dos usuários e suas relações com itens e favoritos.

### Categoria

Organiza e classifica os itens disponíveis na plataforma.

### Item

Armazena informações como nome, descrição, estado de conservação, localização, usuário responsável e categoria.

### Favorito

Representa a relação entre um usuário e um item favoritado.

### Relacionamentos

```text
Usuario   1 : N   Item
Categoria 1 : N   Item

Usuario   1 : N   Favorito
Item      1 : N   Favorito
```

A combinação entre `usuarioId` e `itemId` na entidade `Favorito` é única, evitando que um usuário favorite o mesmo item mais de uma vez.

## Estrutura da aplicação

```text
Interface Next.js
        ↓
Server Components / Server Actions
        ↓
Prisma ORM
        ↓
PostgreSQL
```

## Como executar o projeto

### Pré-requisitos

Para executar o projeto localmente, é necessário ter instalado:

- Node.js
- npm
- PostgreSQL

### 1. Clone o repositório

```bash
git clone https://github.com/matheusnfran/reuse-web.git
```

### 2. Acesse a pasta

```bash
cd reuse-web
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o banco de dados

Crie um arquivo `.env` na raiz do projeto e configure a variável `DATABASE_URL` com os dados da sua instalação local do PostgreSQL.

Exemplo:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/reuse?schema=public"
```

> As credenciais reais do banco de dados não são versionadas no repositório.

### 5. Gere o Prisma Client

```bash
npx prisma generate
```

### 6. Aplique as migrations

```bash
npx prisma migrate dev
```

### 7. Popule o banco com os dados de demonstração

```bash
npx prisma db seed
```

### 8. Inicie o servidor

```bash
npm run dev
```

Depois, acesse `http://localhost:3000` no navegador.

## Observações

A tela de Login faz parte da interface desenvolvida para o projeto, mas não possui autenticação completa nesta versão.

As ações de negociação apresentadas na interface de detalhes do produto representam possibilidades da experiência do ReUse e não fazem parte das funcionalidades implementadas nesta entrega.

Para permitir a demonstração do fluxo de favoritos sem ampliar o escopo para um sistema completo de autenticação, a aplicação utiliza um usuário de teste previamente cadastrado no banco.

## Autor

**Matheus do Nascimento Francisco**  
Web Design — FIAP  
2026