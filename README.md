# ♻️ ReUse — Plataforma Web com Assistente Virtual IBM Watson

Projeto acadêmico desenvolvido para a **Atividade 02 — ReUse com voz: Criando um assistente virtual com IBM Watson**, do curso de Web Design da FIAP.

O projeto integra uma plataforma web desenvolvida com **Next.js, React, Prisma ORM e PostgreSQL** a um assistente virtual configurado no **IBM watsonx Orchestrate**.

O objetivo é oferecer orientações sobre a utilização do ReUse e permitir que o assistente execute tarefas reais relacionadas aos produtos e favoritos cadastrados no banco de dados.

**Aplicação publicada:** https://reuse-watson.vercel.app

**Repositório GitHub:** https://github.com/matheusnfran/reuse-watson

## 1. Sobre o projeto

O ReUse é uma plataforma voltada à reutilização de objetos, incentivando o reaproveitamento e a circulação de produtos que ainda podem ser utilizados.

A aplicação web permite consultar produtos disponíveis, pesquisar itens pelo nome, aplicar filtros por categoria, visualizar detalhes e gerenciar uma lista de favoritos.

Nesta segunda atividade, o projeto foi ampliado com um assistente virtual capaz de orientar os usuários e executar operações por meio de ferramentas conectadas às APIs da plataforma.

A implementação foi realizada em um projeto independente, denominado `reuse-watson`, preservando a versão anterior do ReUse.

## 2. Objetivos da Atividade 02

A atividade contempla dois objetivos principais:

**Execução de tarefas na plataforma:**
- Consultar produtos cadastrados no banco de dados.
- Consultar os produtos presentes na lista de favoritos.
- Remover um produto dos favoritos mediante confirmação explícita do usuário.

**Orientação sobre o uso da plataforma:**
- Explicar como navegar pelo catálogo.
- Orientar a pesquisa automática de produtos.
- Explicar a utilização dos filtros por categoria.
- Orientar a visualização dos detalhes dos produtos.
- Explicar como adicionar e remover favoritos diretamente no site.
- Esclarecer as diferenças entre ações realizadas no site e pelo assistente virtual.

## 3. Tecnologias utilizadas

| Tecnologia | Finalidade |
|---|---|
| Next.js | Desenvolvimento da aplicação web e das rotas de API |
| React | Construção dos componentes da interface |
| JavaScript | Implementação das funcionalidades |
| Tailwind CSS | Estilização e responsividade |
| Prisma ORM | Acesso e manipulação dos dados |
| PostgreSQL | Armazenamento dos produtos, usuários, categorias e favoritos |
| Neon | Hospedagem do banco de dados PostgreSQL |
| Vercel | Publicação da aplicação e das APIs |
| IBM watsonx Orchestrate | Configuração e execução do assistente virtual |
| OpenAPI 3.0 | Descrição das ferramentas conectadas ao assistente |
| Git e GitHub | Versionamento e disponibilização do código-fonte |

## 4. Funcionalidades da plataforma web

A aplicação mantém as funcionalidades desenvolvidas anteriormente:

- Tela inicial demonstrativa de login.
- Catálogo de produtos disponíveis.
- Fotografias e informações dos produtos.
- Pesquisa automática por nome.
- Atualização dos resultados após aproximadamente 300 ms de pausa na digitação.
- Pesquisa sem necessidade de pressionar Enter.
- Filtros por categoria.
- Combinação entre pesquisa e filtros.
- Páginas individuais de detalhes dos produtos.
- Adição e remoção de favoritos.
- Persistência dos favoritos no PostgreSQL.
- Interface responsiva.

A tela inicial apresenta uma demonstração visual de login, mas **não implementa autenticação real de usuários**.

Para fins acadêmicos, as operações de favoritos utilizam um usuário de demonstração previamente cadastrado, identificado pelo ID `1`.

## 5. Assistente virtual IBM Watson

O Assistente ReUse foi configurado no **IBM watsonx Orchestrate** para responder em português do Brasil e auxiliar os usuários na utilização da plataforma.

Seu comportamento contempla dois tipos de atendimento.

### 5.1. Orientações ao usuário

O assistente explica como:

1. Acessar a página `/itens`.
2. Pesquisar produtos pelo nome.
3. Utilizar os filtros por categoria.
4. Consultar os detalhes de um produto.
5. Adicionar produtos aos favoritos.
6. Remover favoritos diretamente na interface.
7. Consultar a página `/favoritos`.

O assistente também informa que a busca ocorre automaticamente após uma breve pausa na digitação, sem necessidade de pressionar Enter.

Ao orientar operações diretamente no site, esclarece que adicionar ou remover favoritos acontece imediatamente, sem uma janela de confirmação.

### 5.2. Execução de tarefas reais

O assistente possui três ferramentas integradas às APIs da aplicação.

#### Ferramenta 1 — Consultar produtos cadastrados

**Método:** `GET`

**Endpoint:** `/api/assistant/produtos`

Permite pesquisar produtos cadastrados no PostgreSQL, utilizando a API da aplicação.

Exemplo de solicitação:

> Pesquise o produto Notebook no banco de dados do ReUse.

Em um teste realizado, a ferramenta retornou:

```json
{
  "produtos": [
    {
      "id": 2,
      "nome": "Notebook"
    }
  ],
  "quantidade": 1,
  "sucesso": true
}
```

#### Ferramenta 2 — Consultar favoritos

**Método:** `GET`

**Endpoint:** `/api/assistant/favoritos`

Consulta os produtos favoritados pelo usuário de demonstração.

A API retorna a quantidade de favoritos e informações dos produtos, como:

- ID.
- Nome.
- Categoria.
- Estado de conservação.
- Localização.

Quando não existem favoritos cadastrados, a ferramenta retorna uma lista vazia e o assistente informa essa situação ao usuário.

#### Ferramenta 3 — Remover produto dos favoritos

**Método:** `POST`

**Endpoint:** `/api/assistant/favoritos/remover`

Permite remover um produto da lista de favoritos por meio do assistente.

A operação exige:

- Identificação do produto e de seu ID.
- Consulta prévia dos favoritos.
- Solicitação de confirmação explícita ao usuário.
- Resposta afirmativa antes da execução.
- Envio dos parâmetros `itemId` e `confirmado: true`.
- Verificação do resultado retornado pela API.

Exemplo do corpo da requisição, após confirmação:

```json
{
  "itemId": 2,
  "confirmado": true
}
```

A API rejeita a solicitação quando `confirmado` não é `true`.

**Observação de segurança:** o campo `confirmado` é uma proteção implementada na API, mas não comprova sozinho a autorização do usuário. Por isso, o comportamento do assistente também foi configurado para solicitar confirmação antes da execução.

## 6. Arquitetura da integração

O assistente utiliza ferramentas descritas em arquivos OpenAPI para acessar endpoints publicados na Vercel.

O fluxo principal é:

```text
Usuário
   |
   v
Assistente ReUse
IBM watsonx Orchestrate
   |
   v
Ferramenta OpenAPI
   |
   v
API Next.js na Vercel
   |
   v
Prisma ORM
   |
   v
PostgreSQL no Neon
   |
   v
Resposta da API
   |
   v
Assistente apresenta o resultado
```

As consultas retornam informações reais do banco de dados.

A remoção de favoritos modifica os dados persistidos no PostgreSQL, permitindo verificar o resultado também pela interface da aplicação.

## 7. Arquivos OpenAPI

As especificações das ferramentas estão disponíveis na raiz do projeto:

- `openapi-reuse.yaml` — consulta de produtos.
- `openapi-favoritos.yaml` — consulta de favoritos.
- `openapi-remover-favorito.yaml` — remoção de favoritos.

Esses arquivos descrevem as operações, os parâmetros, os formatos de resposta e o mecanismo de autenticação utilizado.

As ferramentas foram importadas individualmente no IBM watsonx Orchestrate e associadas à conexão segura da API do ReUse.

Os arquivos OpenAPI não contêm a chave secreta.

## 8. Segurança das APIs

As APIs utilizadas pelo assistente são protegidas por uma chave de autenticação enviada no cabeçalho HTTP:

`X-ReUse-Extension-Key`

O servidor compara o valor recebido com a variável de ambiente:

`ASSISTANT_EXTENSION_API_KEY`

Requisições sem a chave correta são recusadas com HTTP `401`.

A API de remoção também valida:

- O formato dos dados recebidos.
- O identificador do produto.
- A presença de confirmação explícita representada por `confirmado: true`.
- A existência do produto na lista de favoritos.

As credenciais devem permanecer em variáveis de ambiente locais e na configuração segura da hospedagem e da conexão do assistente.

**Nunca publique chaves de API ou URLs de banco de dados contendo senhas no GitHub.**

## 9. Rotas da aplicação

| Rota | Descrição |
|---|---|
| `/` | Tela inicial demonstrativa |
| `/itens` | Catálogo, pesquisa e filtros |
| `/item/[id]` | Detalhes de um produto |
| `/favoritos` | Lista de favoritos |
| `/api/assistant/produtos` | Consulta de produtos pelo assistente |
| `/api/assistant/favoritos` | Consulta de favoritos pelo assistente |
| `/api/assistant/favoritos/remover` | Remoção de favoritos pelo assistente |

## 10. Banco de dados

O PostgreSQL contém quatro entidades principais:

**Usuario:** representa os usuários da plataforma.

**Categoria:** organiza os produtos em categorias.

**Item:** armazena os dados dos produtos, incluindo nome, descrição, estado de conservação e localização.

**Favorito:** registra a associação entre um usuário e um produto favoritado.

Relacionamentos:

```text
Usuario   1 : N   Item
Categoria 1 : N   Item

Usuario   1 : N   Favorito
Item      1 : N   Favorito
```

A combinação de `usuarioId` e `itemId` é única na tabela de favoritos, evitando registros duplicados.

O projeto utiliza um banco de dados Neon independente daquele utilizado na atividade anterior.

## 11. Como executar localmente

### Pré-requisitos

- Node.js e npm.
- Banco de dados PostgreSQL.
- Variáveis de ambiente configuradas.

### 11.1. Clonar o repositório

```bash
git clone https://github.com/matheusnfran/reuse-watson.git
```

### 11.2. Acessar a pasta

```bash
cd reuse-watson
```

### 11.3. Instalar as dependências

```bash
npm install
```

### 11.4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@HOST/BANCO?sslmode=require"
ASSISTANT_EXTENSION_API_KEY="SUA_CHAVE_SECRETA"
```

Os valores acima são apenas exemplos. Utilize as credenciais do seu próprio ambiente.

### 11.5. Gerar o Prisma Client

```bash
npx prisma generate
```

### 11.6. Aplicar as migrations

```bash
npx prisma migrate deploy
```

### 11.7. Popular o banco de demonstração

Se estiver configurando um banco novo:

```bash
npx prisma db seed
```

**Atenção:** a execução do seed modifica os dados. Não execute essa etapa em um banco já utilizado sem verificar previamente o conteúdo do script.

### 11.8. Iniciar a aplicação

```bash
npm run dev
```

Acesse:

http://localhost:3000

### 11.9. Compilar para produção

```bash
npm run build
```

## 12. Publicação

**Aplicação web:**

https://reuse-watson.vercel.app

**Catálogo de produtos:**

https://reuse-watson.vercel.app/itens

**Favoritos:**

https://reuse-watson.vercel.app/favoritos

**Repositório GitHub:**

https://github.com/matheusnfran/reuse-watson

A aplicação e suas APIs estão publicadas na Vercel, utilizando PostgreSQL hospedado no Neon.

As alterações no código são versionadas com Git e enviadas ao GitHub.

O assistente foi configurado no IBM watsonx Orchestrate, com ferramentas conectadas aos endpoints publicados.

## 13. Testes realizados

Foram realizados testes funcionais da plataforma e da integração com o assistente.

### 13.1. Consulta de produtos

O assistente recebeu uma solicitação para pesquisar o Notebook.

O histórico de execução demonstrou o uso da ferramenta de consulta, com o parâmetro de pesquisa correspondente e o retorno de um produto real do banco de dados.

### 13.2. Consulta de favoritos

O assistente consultou os favoritos e retornou os produtos cadastrados.

Após a remoção de um favorito, uma nova consulta retornou:

```json
{
  "sucesso": true,
  "quantidade": 0,
  "favoritos": []
}
```

### 13.3. Remoção confirmada

O assistente solicitou confirmação antes de remover o Notebook.

Após a resposta afirmativa do usuário, a operação foi executada e a página `/favoritos` passou a apresentar a lista vazia.

### 13.4. Cancelamento de remoção

Foi solicitada a remoção da Cadeira de Escritório.

Quando o usuário respondeu negativamente à confirmação, o assistente cancelou a operação.

A Cadeira de Escritório permaneceu cadastrada nos favoritos.

### 13.5. Proteção da API

Foram testadas requisições sem autenticação e requisições de remoção sem confirmação.

A API recusou os acessos não autorizados e bloqueou a remoção quando recebeu `confirmado: false`.

### 13.6. Orientações de uso

O assistente respondeu corretamente a perguntas sobre:

- Pesquisa automática de produtos.
- Utilização de filtros por categoria.
- Adição e remoção de favoritos diretamente no site.
- Diferença entre remoção pelo site e remoção pelo assistente.

### 13.7. Avaliação automatizada

Foi executada uma avaliação no IBM watsonx Orchestrate para o cenário de orientação sobre favoritos.

**Resultado registrado:**
- Status: `Complete`.
- Testes aprovados: `1 de 1`.
- Taxa de sucesso: `100%`.
- Chamadas de ferramentas: `0`, conforme o objetivo informativo do teste.

Esse resultado corresponde ao caso avaliado e não representa uma medição global de todas as funcionalidades do assistente.

## 14. Evidências

As evidências podem ser organizadas na pasta `evidencias` do repositório.

Arquivos já preparados:

- `evidencias/avaliacoes/evaluation.csv` — exportação da avaliação automatizada.
- `evidencias/consulta-produto-notebook.png` — captura da execução da ferramenta de consulta de produtos.

As demais verificações funcionais foram realizadas durante o desenvolvimento e poderão ser documentadas no relatório de entrega.

## 15. Limitações e observações

- O login da página inicial é demonstrativo e não autentica usuários reais.
- As operações de favoritos utilizam o usuário de demonstração de ID `1`.
- O assistente utiliza as ferramentas configuradas no IBM watsonx Orchestrate.
- O código da aplicação, as rotas de API e as especificações OpenAPI estão disponíveis no repositório.
- A configuração do agente e suas instruções de comportamento são mantidas no ambiente IBM watsonx Orchestrate.
- A plataforma não implementa um fluxo completo de negociação ou troca entre usuários.
- A remoção por chat exige confirmação explícita, diferentemente da remoção diretamente pela interface do site.

## 16. Autor

**Matheus do Nascimento Francisco**  
**RM:** 562553  
**Curso:** Web Design — FIAP  
**Ano:** 2026
