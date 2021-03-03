const productErrors = {
  nameRequired: 'O nome do produto é obrigatório!',
  imageIdRequired: 'O Id da imagem é obrigatório',
  userMustBeUuid: 'O Id do usuário deve ser um UUID!',
  userIdRequired: 'O Id do usuário é obrigatório!',
  quantityRequired: 'A quantidade do produto é obrigatória!',
  quantityLessThanOne: 'A quantidade do produto não pode ser negativo!',
  typeRequired: 'O tipo do produto é obrigatório!',
  unityRequired: 'A unidade do produto é obrigatória!',
  priceSellRequired: 'O preço de venda do produto é obrigatório!',
  priceBuyRequired: 'O preço de compra do produto é obrigatório',
  priceLessThanZero: 'O produto não pode ter preço menor que 0 reais!',
  descriptionRequired: 'A descrição do produto é obrigatória!',
  categoryRequired: 'A categoria do produto é obrigatória!',
  productAlreadyExists: 'Produto com o mesmo nome já cadastrado nessa categoria!',
  productIdRequired: 'O id do produto é obrigatório',
  transactionTypeRequired: 'O tipo da transação é obrigatório',
  outcomeMoreThanIncome: 'A quantidade de entrada não pode ser maior que o valor total atual!',
};

const categoriesErrors = {
  titleRequired: 'O nome da categoria é obrigatório!',
  categoryAlreadyExists: 'Já existe uma categoria cadastrada com o mesmo nome',
};

const usersErrors = {
  userAlreadyRegistered: 'O usuário já está cadastrado',
  loginRequired: 'O login é obrigatório!',
  passwordRequired: 'A senha é obrigatória',
  passwordMinLength: 'A senha deve ter no mínimo 6 caracteres!',
};

const sessionErrors = {
  combinationsDoesNotMatch: 'Combinação login/senha está incorreta',
  loginRequired: 'O login é obrigatório!',
  passwordRequired: 'A senha é obrigatória',
  passwordMinLength: 'A senha deve ter no mínimo 6 caracteres!',
};

export {
  productErrors, categoriesErrors, usersErrors, sessionErrors,
};
