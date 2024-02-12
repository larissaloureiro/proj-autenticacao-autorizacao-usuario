# API Autenticação e Autorização de Usuários

## Resumo do projeto

Projeto de API REST para prática de Node.JS.
Sistema de cadastro de usuários com autenticação utilizando JWT.


## Stack utilizada

* `Node.js` v20.11.0,
* `express` v4.18.2,
* `pg` v8.11.3



## Instalação do projeto
* Baixe o repositório do projeto.
* Utilizando o terminal, abra a pasta com os arquivos do projeto.
* Instale as dependências necessárias com `npm install`.
* Confira se a pasta `node_modules` foi criada na raiz do projeto.


### Configuração do Banco de Dados
* Crie um banco de dados PostgreSQL.
* Renomeie o arquivo `.env_example` para `.env`
* Altere as informações no arquivo `.env`
* No terminal, acesse a pasta raiz do projeto e execute as migrations com o comando `npx sequelize db:migrate`
* No terminal, acesse a pasta raiz do projeto e execute as seeders com o comando `npx sequelize db:seed:all`


## Como rodar a API

* No terminal, acesse a pasta raiz do projeto e insira o comando `npm run dev` para rodar o projeto em modo de desenvolvimento. Você deverá ver no terminal a seguinte mensagem:
  ```
  > proj-autenticacao-autorizacao-usuario@1.0.0 dev
  > nodemon ./src/index.js

  [nodemon] 3.0.3
  [nodemon] to restart at any time, enter `rs`
  [nodemon] watching path(s): *.*
  [nodemon] watching extensions: js,mjs,cjs,json
  [nodemon] starting `node ./src/index.js`
  Servidor rodando na porta 3000
  ```

* Os recursos da API poderão ser acessados a partir da *base URL* `http://localhost:PORT`. A `PORT` pode ser configurada no arquivo `.env`.


### Endpoints

A API expõe os seguintes *endpoints* a partir da *base URL* `localhost:3000`:

`/roles`
* `GET /roles`
* `GET /roles/:id`
* `POST /roles`
* `PUT /roles/:id`
* `DELETE /roles/:id`

`/úsers`
* `GET /úsers`
* `GET /úsers/:id`
* `POST /úsers`
* `PUT /úsers/:id`
* `DELETE /úsers/:id`

`/auth`
* `POST /auth/login`

`/security`
* `POST /security/acl`

