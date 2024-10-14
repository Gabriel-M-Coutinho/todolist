# Todo List API

Este é um projeto de uma aplicação de lista de tarefas (Todo List) desenvolvido como um teste prático. O sistema inclui uma API construída com NestJS e um frontend simples que interage com essa API. O objetivo deste projeto foi demonstrar habilidades em desenvolvimento web e gerenciamento de tarefas.

## Requisitos

Para executar este projeto, você precisará dos seguintes requisitos:

- **Node.js** (v14 ou superior)
- **npm** (v6 ou superior)
- **PostgreSQL** (v12 ou superior)

## Configuração

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/Gabriel-M-Coutinho/todolist.git
   cd seu-repositorio
   ```

2. **Instale as dependências do projeto:**

   ```bash
   npm install
   ```

3. **Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:**

   ```dotenv
   JWT_SECRET=suachavesecreta
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=suasenha
   DB_DB_NAME=teste
   ```

4. **Inicie o servidor:**

   ```bash
   npm run start
   ```

5. **Acesse a API:**
   A API estará disponível em `http://localhost:3000`.

## Funcionalidades

- **Cadastro e login de usuários**: Utiliza JWT para autenticação.
- **CRUD de tarefas**: Criação, leitura, atualização e exclusão de tarefas.
- **Prioridade das tarefas**: As tarefas podem ter prioridades diferentes (alta, média, baixa).
- **Documentação da API**: A documentação da API foi criada utilizando Swagger, acessível em `http://localhost:3000/api`.

## Observações

Este projeto foi desenvolvido em um fim de semana, portanto, não tive muito tempo para aprimorá-lo. Consegui concluir a API da todo list e uma parte do frontend, mas não consegui publicá-lo na nuvem devido a restrições financeiras.

### Melhorias Futuras

- **Frontend**: Se eu tivesse mais tempo, reescreveria o frontend utilizando **Angular** ou **React**, implementando rotas protegidas de maneira mais robusta.
- **Testes**: Adicionaria testes unitários e de integração para garantir a robustez do sistema.
- **Melhorias na Documentação**: Expansão da documentação com exemplos de requisições e respostas.

---

Obrigado por considerar este projeto!
