# Projeto Tutorial

Este projeto é uma aplicação NestJS que gerencia tutoriais e usuários, com autenticação, CRUD de tutoriais, e listagem paginada. A aplicação utiliza TypeORM para interagir com um banco de dados MySQL e Swagger para documentação da API.

## Sumário

- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Documentação da API](#documentação-da-api)
- [Design Patterns e Arquitetura](#design-patterns-e-arquitetura)
- [Escalabilidade](#escalabilidade)
- [Instalação](#instalação)
- [Licença](#licença)

## Estrutura do Projeto

O projeto é estruturado da seguinte forma:

- **src/**
  - **auth/**: Contém a lógica de autenticação e autorização.
  - **users/**: Gerencia as operações relacionadas aos usuários.
  - **tutorial/**: Gerencia as operações relacionadas aos tutoriais.
  - **config/**: Contém a configuração do TypeORM e outras configurações do projeto.
  - **utils/**: Utilitários e funções auxiliares.
  - **main.ts**: Ponto de entrada da aplicação.
  - **app.module.ts**: Módulo principal da aplicação.

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=user
DATABASE_PASSWORD=password
DATABASE_NAME=tutorialusers