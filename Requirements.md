# Session

**RN**

- O usuário deve poder fazer login na aplicação;
- O usuário dede poder redefinir a sua senha;

**RNF**

- O serviço de E-mail será feito pela Amazon SES

**RN**

- Para realizar qualquer ação dentro da aplicação o usuário deverá previamente efetuar o login da aplicação;
- A redefinição de senha será feita através de e-mail.
- O e-mail de redefinição de senha terá validade de 2 horas

# User

**RF**

- O administrador deve poder cadastrar um novo administrador para aplicação.
- O administrador deve poder definir o nome e senha do novo usuário criado.

**RN**

- Apenas dentro da aplicação que um administrador pode criar um novo usuário.
- Não pode ser criado um novo administrador com o mesmo nome de um já existente.


# Categorias

**RF**

- O usuário deve poder criar uma nova categoria.
- O usuário deve poder listar todas as categorias cadastradas.


**RN**

- O usuário não deve poder criar uma categoria com o mesmo nome de uma já existente.

# Produtos

**RF**

- O usuário deve poder listar todos os produtos cadastrados na aplicação.
- O usuário deve poder listar os produtos de acordo com os filtros de nome, tipo, código ou categoria.
- O usuário deve poder listar um único produto com todo os seus detalhes.
- O usuário deve poder gerar uma lista com um relatório com todas as saídas e entradas de um determinado produto.
- O usuário deve poder criar um novo produto
- O usuário deve poder atualizar o registro de um produto já existente.
- O usuário deve poder dar entrada de novos itens no estoque ou atualizar a quantidade existente.
- O usuário deve poder deletar um produto cadastrado anteriormente.
- O usuário deve poder registrar vários produtos de uma só vez utilizando CSV

**RN**

- O relatório deve constar apenas o nome, código do produto, quantidade e tipo de operação.
- O relatório deve ser feito com base em um produto específico.
- Ao criar um novo produto, se o nome selecionado for igual a de um produto já existente, a quantidade é incrementada.
- Ao atualizar um novo produto, o único item que não poderá ser alterado é a categoria.
- Quando o usuário excluir um produto, deve ser excluído o histórico de transações também.
