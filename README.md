# Teddy

![Logo Teddy](apps/projetos/appPrincipal/public/teddyLogo.png)

Projeto desenvolvido com [Nx](https://nx.dev) e Angular.

---

## 🚀 Começando

Siga os passos abaixo para rodar o projeto localmente.

### Pré-requisitos

- Node.js (recomendado versão 18+)
- npm ou yarn instalado

---

## ⚙️ Instalação

No terminal, na raiz do projeto, execute:
npm install
# ou
yarn install
Isso vai instalar todas as dependências necessárias.

---

## 🏃‍♂️ Rodando a aplicação:

Para iniciar o servidor de desenvolvimento da aplicação principal (appPrincipal), execute:
npm start
# ou
yarn start

O comando é equivalente a:
npx nx serve appPrincipal

Caso queira iniciar outras aplicações do workspace, use os comandos:
npm run start:inicio
npm run start:menus
npm run start:dashboard
npm run start:clientes

---

## 🛠️ Build:

Para criar o build de produção da aplicação principal:
npm run build
# ou
yarn build

Você também pode buildar outras aplicações com:
npm run build:appPrincipal
npm run build:inicio
npm run build:dashboard
npm run build:clientes
npm run build:menus

## ✅ Testes:

Para rodar todos os testes do workspace, com cobertura de código, execute:
npm test 
# ou
yarn test

Para rodar os testes específicos de uma aplicação, por exemplo appPrincipal:
npm run test:app
# ou
yarn test:app

Outros comandos para rodar testes por app:
npm run test:clientes
npm run test:dashboard
npm run test:inicio
npm run test:menus
npm run test:lib

## ✅✅ Testes E2E:
Para rodar os testes E2E da aplicação principal, rode:
npx nx e2e appPrincipal-e2e

outros comandos para rodar testes por app:
npx nx e2e inicio-e2e
npx nx e2e menus-e2e
npx nx e2e dashboard-e2e
npx nx e2e clientes-e2e
