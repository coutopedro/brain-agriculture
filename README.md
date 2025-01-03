# 🏞 **Projeto de Cadastro de Produtores Rurais**

Este projeto é uma aplicação construída para gerenciar o cadastro de produtores rurais, incluindo validação de CPF, gerenciamento de área, safra e culturas plantadas. Ele foi desenvolvido utilizando **TypeScript**, **ReactJS** e **Redux** para garantir uma boa experiência de desenvolvimento e qualidade de código.

---

## 🔧 **Tecnologias Utilizadas**

Abaixo estão as principais tecnologias utilizadas para o desenvolvimento do projeto:

- **ReactJS**: Framework JavaScript para construção da interface de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Redux**: Gerenciamento de estado global da aplicação.
- **React Router**: Navegação entre diferentes páginas da aplicação.
- **Jest**: Framework de testes.
- **React Testing Library**: Biblioteca de testes para componentes React.
- **Styled Components**: Biblioteca para estilização de componentes React utilizando CSS-in-JS.
- **ts-jest**: Pré-processador TypeScript para o Jest.
- **@testing-library/jest-dom**: Extensões do Jest para facilitar as asserções em testes de DOM.
- **Recharts**: Biblioteca de gráficos para exibição de dados na interface.


## 📋 **Pré-requisitos**

Antes de rodar o projeto, você precisa ter as seguintes ferramentas instaladas:

1 - Node.js (versão 14 ou superior)
Você pode verificar se já tem o Node.js instalado executando o comando:

node -v

Caso não tenha, instale o Node.js aqui.

2 - NPM (gerenciador de pacotes do Node.js)
O NPM é instalado automaticamente com o Node.js. Verifique se você o tem:

npm -v

-Configuração e Execução

1. Clonando o repositório
Clone o repositório do projeto utilizando o Git:

git clone https://github.com/seu-usuario/nome-do-repositorio.git

2. Instalando as dependências
Após clonar o repositório, navegue até a pasta do projeto e instale as dependências:

cd brain-agriculture
npm install

3. Rodando o Projeto Localmente
Para iniciar a aplicação em modo de desenvolvimento, use o seguinte comando:

npm start

4. Rodando os Testes
Para rodar os testes automatizados da aplicação, utilize o comando:

npm test

📦 Dependências
Aqui estão as dependências de desenvolvimento utilizadas no projeto:

ts-jest: Para configurar o Jest com TypeScript.
@testing-library/react: Para testar componentes React.
@testing-library/jest-dom: Para utilizar as asserções adicionais no Jest.
jest: Framework de testes.
redux-mock-store: Para criar um mock do Redux em testes.
react-router-dom: Para navegação entre páginas.

- Dificuldades com o teste

Validação de CPF 
- Desafio: Implementar a validação correta de CPF foi bem trabalhoso devido à complexidade das regras de validação e verificação de formato.
- Gerenciamento de Estado com Redux
  
Desafio: Manter o estado da aplicação de forma eficiente, os dados complexos, como produtores rurais, áreas, safra e culturas. 
Solução: Seguir boas práticas de Redux, como usar slices de estado bem definidos. 


- Agradecimentos
Gostaria de expressar minha sincera gratidão pela oportunidade de realizar este teste. Embora eu tenha experiência com algumas das tecnologias utilizadas, outras foram novas para mim, e esse desafio foi uma excelente oportunidade de aprender e aplicar novos conhecimentos.

Agradeço pela confiança e pela chance de demonstrar minhas habilidades. Estou empolgado com o que aprendi durante o processo e ansioso para continuar evoluindo na minha jornada.


