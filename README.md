# Chat App Backend

Backend de uma aplicação de chat em tempo real desenvolvida com Node.js, Express, TypeScript e MongoDB.

## 🚀 Tecnologias

- Node.js 18
- TypeScript
- Express
- MongoDB
- TypeORM
- Docker & Docker Compose
- Nginx (Load Balancer)
- Passport.js (Autenticação)
- Swagger (Documentação API)

## 📁 Estrutura do Projeto

O projeto segue os princípios da Clean Architecture e está organizado em módulos:

- `auth`: Autenticação e autorização
- `users`: Gerenciamento de usuários
- `messages`: Sistema de mensagens
- `shared`: Código compartilhado entre módulos
- `infrastructure`: Configurações de banco de dados, DI e middlewares

## 🛠️ Instalação

### Pré-requisitos

- Docker
- Docker Compose
- Node.js 18+
- Yarn

### Configuração

1. Clone o repositório
```bash
git clone https://github.com/odairrosario/chat-backend.git
cd chat-app-backend
```

2. Copie o arquivo de ambiente
```
cp .env.example .env
```

3. Instale as dependências
```bash
yarn install
```

## 🚀 Execução

### Com Docker (Recomendado)

1. Inicie os containers:
```
docker-compose up --build
```
Isso irá:
- Iniciar o MongoDB na porta 27017
- Iniciar o Node.js em modo cluster (múltiplas instâncias)
- Configurar o Nginx como load balancer na porta 9001, distribuindo requisições entre as portas 9002-9004

### Sem Docker (Desenvolvimento)

1. Instale as dependências:
```bash
yarn install
```

2. Gere as rotas e documentação e compile o projeto:
```
yarn build 
```
Este comando irá:
- Gerar a especificação Swagger (`yarn tsoa:spec`)
- Gerar as rotas (`yarn tsoa:routes`)
- Compilar o TypeScript (`tsc`)


3. Inicie o projeto:
```
node dist/main.js
```
## 📡 API

A documentação da API está disponível via Swagger: http://localhost:9001/swagger

### Principais Endpoints

- `POST /auth/login`: Login
- `POST /auth/logout`: Logout
- `POST /users`: Criar usuário
- `GET /users`: Listar usuários
- `POST /messages`: Enviar mensagem
- `GET /messages`: Listar mensagens

## 🔧 Arquitetura

### Cluster e Load Balancing
- **Node.js Cluster**: Utiliza o módulo nativo `cluster` para criar múltiplas instâncias da aplicação
- **Nginx Load Balancer**: Atua como proxy reverso, distribuindo requisições entre as instâncias do cluster
- **Database**: MongoDB para persistência
- **Autenticação**: JWT via Passport.js
- **Validação**: Class Validator & Custom Validators
- **Documentação**: Swagger/OpenAPI


## 📝 Licença

Este projeto está sob a licença MIT.

## 👤 Autor

Odair do Rosario
