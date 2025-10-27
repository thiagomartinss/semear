# 🌱 SIGVA - Sistema de Gerenciamento de Vendas de Agronegócio (Projeto Semear)

**---------------Projeto ainda em construção---------------**

Este repositório contém o projeto **SIGVA (Sistema de Gerenciamento de Vendas de Agronegócio)**, desenvolvido para a empresa fictícia "Semear".

Este é um projeto acadêmico 🎓 do **Projeto Integrado III**, referente ao 3º Termo do curso de **Análise e Desenvolvimento de Sistemas** da FIPP (Faculdade de Informática de Presidente Prudente).

🎯 **Objetivo:** Construir uma solução de software completa para o setor do agronegócio, simulando um sistema ecommerce com backoffice que controla desde o estoque, finanças e prestação de serviços.

---

## ✨ Funcionalidades Planejadas

O sistema completo (SIGVA) foi projetado para gerenciar todas as operações da empresa, incluindo:

* 📝 **Gestão de Cadastros (CRUD):** Clientes, Fornecedores, Produtos, Insumos, Marcas, Serviços e Equipamentos Agrícolas.
* 🛒 **Processos de Venda:** Efetuar Venda, Devolução de Venda e atualização automática de estoque.
* 🛍️ **Processos de Compra:** Efetuar Compra e Devolução de Compra.
* 🔧 **Ordens de Serviço:** Abertura, Fechamento e Recebimento de OS.
* 💲 **Módulo Financeiro:** Abertura e Fechamento de Caixa, Contas a Receber e Movimentação de Caixa.
* 📊 **Relatórios:** Geração de relatórios gerenciais de produtos, vendas e ordens de serviço.

---

## 🛠️ Tecnologias Utilizadas

Este projeto está sendo desenvolvido com as seguintes tecnologias e padrões:

* **🖥️ Backend:** Node.js com Express
* **🎨 Frontend (View Engine):** EJS (Embedded JavaScript) e bootstrap 5
* **🗃️ Banco de Dados:** MySQL
* **🏛️ Arquitetura:** MVC (Model-View-Controller)
* **🧰 Ferramentas:** Git, GitHub e MySQL Workbench

---

## 🚀 Como Executar o Projeto

**Em breve será disponibilizado online**

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local:

1.  **Clone o repositório**
    ```bash
    git clone https://github.com/thiagomartinss/SIGVA.git
    ```

2.  **Navegue até a pasta do projeto**
    ```bash
    cd SIGVA
    ```

3.  **Instale as dependências**
    *(Verifique se você tem o Node.js instalado na sua máquina)*
    ```bash
    npm install
    ```

4.  **Configure o Banco de Dados (MySQL)**
    * ⚙️ Certifique-se de ter um servidor MySQL em execução.
    * 📄 Execute o script de criação do banco de dados (presente no projeto, ex: `sql create banco pid.txt`) para criar todas as tabelas necessárias.
    * 🔑 Configure as credenciais de acesso ao banco (host, usuário, senha, banco de dados) no arquivo de configuração do projeto (ex: `/config/database.js` ou um arquivo `.env`).

5.  **Inicie o servidor**
    ```bash
    npm start
    ```

6.  **Acesse a aplicação**
    * 🖥️ Abra seu navegador e acesse `http://localhost:5000`.
