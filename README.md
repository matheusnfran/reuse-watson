# ♻️ ReUse

Plataforma web desenvolvida com **Next.js**, **Prisma ORM** e **PostgreSQL** como parte da atividade **Missão ReUse — Fase 5**, do curso de Web Design da FIAP.

**Aplicação publicada:** https://reuse-web-eta.vercel.app

## Sobre o projeto

O ReUse é uma plataforma voltada à reutilização e à troca de itens entre usuários, incentivando o reaproveitamento de objetos.

O projeto foi desenvolvido anteriormente em uma experiência mobile e, nesta etapa, evoluiu para uma aplicação web.

A proposta não foi reproduzir integralmente o aplicativo mobile, mas selecionar funcionalidades importantes e disponibilizá-las em uma interface web responsiva.

A versão atual concentra-se na descoberta de produtos, pesquisa automática, filtros por categoria, consulta aos detalhes dos itens e gerenciamento de favoritos.

A interface utiliza a identidade visual oficial do ReUse, com logo própria, fotografias dos produtos e uma paleta de cores baseada em verde, branco e bege.

## Funcionalidades

- Tela inicial demonstrativa de login.
- Listagem de itens disponíveis.
- Exibição de fotografias dos produtos.
- Busca automática em tempo real pelo nome do item.
- Atualização dos resultados enquanto o usuário digita.
- Intervalo de aproximadamente 300 ms para otimizar as consultas.
- Limpeza automática da pesquisa ao apagar o texto ou clicar no X.
- Filtro de produtos por categoria.
- Combinação entre busca textual e filtro por categoria.
- Visualização dos detalhes de cada produto.
- Rotas dinâmicas para os produtos.
- Adição de itens aos favoritos.
- Remoção de itens dos favoritos.
- Persistência dos favoritos no banco de dados.
- Mensagens para pesquisas sem resultados.
- Interface responsiva.
- Integração entre Next.js, Prisma ORM e PostgreSQL.

## Tecnologias utilizadas

- **Next.js:** estrutura da aplicação, páginas, rotas e renderização no servidor.
- **React:** desenvolvimento dos componentes da interface.
- **JavaScript:** implementação das funcionalidades.
- **Tailwind CSS:** estilização e responsividade.
- **Prisma ORM:** consultas e operações de persistência no banco de dados.
- **PostgreSQL:** armazenamento dos dados.
- **Neon:** hospedagem do banco de dados PostgreSQL.
- **Vercel:** hospedagem da aplicação web.
- **Git e GitHub:** versionamento e armazenamento do código-fonte.

## Rotas principais

| Rota | Descrição |
| --- | --- |
| `/` | Tela inicial demonstrativa de login |
| `/itens` | Catálogo de produtos, busca automática e filtros |
| `/item/[id]` | Página dinâmica com detalhes do produto |
| `/favoritos` | Lista de itens favoritados pelo usuário de demonstração |

## Busca em tempo real

A busca de produtos foi implementada para atualizar os resultados automaticamente enquanto o usuário digita.

Por exemplo, ao pesquisar por `not`, a aplicação pode apresentar o produto Notebook sem que seja necessário clicar no botão Buscar.

A funcionalidade utiliza um componente React executado no navegador, responsável por acompanhar a digitação e atualizar os parâmetros de pesquisa da URL.

Foi implementado um intervalo de aproximadamente **300 milissegundos** após a digitação, reduzindo a quantidade de consultas realizadas ao banco de dados.

A pesquisa utiliza o Prisma ORM com o operador `contains` e a configuração `mode: "insensitive"`, permitindo encontrar produtos por partes do nome, sem diferenciar letras maiúsculas de minúsculas.

Ao limpar o campo de busca, os resultados são atualizados automaticamente.

Quando existe uma categoria selecionada, ela é preservada durante a pesquisa e a limpeza do campo.

O botão Buscar também permanece disponível como alternativa de interação.

## Prisma ORM

O Prisma ORM é utilizado como camada de integração entre a aplicação Next.js e o banco de dados PostgreSQL.

Entre as operações utilizadas no projeto estão:

- `findMany`: consulta de produtos, categorias e favoritos.
- `findUnique`: consulta de um produto específico.
- `upsert`: adição de favoritos, evitando registros duplicados.
- `deleteMany`: remoção de favoritos.

As operações relacionadas aos favoritos são realizadas no servidor por meio de **Server Actions** do Next.js.

Após essas operações, as páginas relacionadas são atualizadas para refletir as alterações realizadas no banco de dados.

## Banco de dados

O banco PostgreSQL foi estruturado com quatro entidades principais.

### Usuario

Armazena os dados dos usuários e suas relações com itens e favoritos.

### Categoria

Organiza e classifica os itens disponíveis na plataforma, permitindo a utilização dos filtros.

### Item

Armazena informações dos produtos, como nome, descrição, estado de conservação, localização, usuário responsável e categoria.

### Favorito

Representa a relação entre um usuário e um item salvo como favorito.

### Relacionamentos

```text
Usuario   1 : N   Item
Categoria 1 : N   Item

Usuario   1 : N   Favorito
Item      1 : N   Favorito
```

A combinação entre `usuarioId` e `itemId` na entidade `Favorito` é única, evitando que um usuário favorite o mesmo item mais de uma vez.

## Estrutura da aplicação

A aplicação utiliza o App Router do Next.js, com componentes executados no servidor e no navegador.

A comunicação com o banco de dados segue a estrutura:

```text
Interface Next.js / React
          |
          v
Server Components / Server Actions
          |
          v
       Prisma ORM
          |
          v
       PostgreSQL
```

A busca em tempo real utiliza um componente cliente para atualizar os parâmetros da URL, enquanto as consultas aos produtos são realizadas no servidor.

Os favoritos utilizam Server Actions para executar as operações de persistência.

## Como executar o projeto

### Pré-requisitos

Para executar o projeto localmente, é necessário ter:

- Node.js
- npm
- Acesso a um banco de dados PostgreSQL

O banco pode ser instalado localmente ou disponibilizado por um serviço de hospedagem, como o Neon.

### 1. Clone o repositório

```bash
git clone https://github.com/matheusnfran/reuse-web.git
```

### 2. Acesse a pasta do projeto

```bash
cd reuse-web
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o banco de dados

Crie um arquivo `.env` na raiz do projeto e configure a variável `DATABASE_URL` com os dados de conexão do PostgreSQL.

Exemplo para um banco local:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/reuse?schema=public"
```

As credenciais reais do banco de dados não devem ser publicadas no repositório.

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

Esta etapa depende da configuração de seed existente no projeto.

### 8. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Depois, acesse:

http://localhost:3000

### 9. Gere a versão de produção

Para verificar se a aplicação compila corretamente:

```bash
npm run build
```

O processo de build do projeto também executa a geração do Prisma Client antes da compilação do Next.js.

## Publicação

A aplicação está hospedada na **Vercel**, integrada ao repositório GitHub.

O banco de dados PostgreSQL está hospedado no **Neon**.

A conexão com o banco de dados é configurada por meio da variável de ambiente `DATABASE_URL`, definida no ambiente de hospedagem.

As atualizações do código são versionadas com Git e enviadas ao GitHub, permitindo a implantação de novas versões na Vercel.

**Repositório GitHub:**

https://github.com/matheusnfran/reuse-web

**Aplicação publicada:**

https://reuse-web-eta.vercel.app

**Catálogo de produtos:**

https://reuse-web-eta.vercel.app/itens

## Testes realizados

Foram realizados testes locais e na aplicação publicada na Vercel.

Entre as funcionalidades verificadas estão:

- Carregamento das páginas.
- Exibição da logo oficial.
- Exibição das fotografias dos produtos.
- Navegação entre catálogo, detalhes e favoritos.
- Busca automática durante a digitação.
- Limpeza do campo de pesquisa.
- Combinação entre pesquisa e filtros por categoria.
- Adição e remoção de favoritos.
- Persistência dos favoritos no banco de dados.
- Compilação da aplicação com `npm run build`.

As funcionalidades verificadas apresentaram o comportamento esperado nos testes realizados.

## Observações

A tela inicial de login faz parte da interface desenvolvida para o projeto, mas **não possui autenticação real nesta versão**.

Para demonstrar o funcionamento dos favoritos sem ampliar o escopo da atividade para um sistema completo de autenticação, a aplicação utiliza um usuário de teste previamente cadastrado no banco de dados.

As ações relacionadas à solicitação ou negociação de produtos representam possibilidades futuras da experiência do ReUse e não constituem um fluxo completo de troca implementado nesta entrega.

O foco desta versão está na exploração de produtos, na pesquisa, na navegação e na persistência dos favoritos.

## Autor

**Matheus do Nascimento Francisco**  
**RM:** 562553  
Web Design — FIAP  
2026