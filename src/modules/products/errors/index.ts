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
  outcomeMoreThanIncome: 'A quantidade de saída não pode ser maior que o valor total atual!',
  pageRequired: 'O número da página é obrigatória!',
  productNotFound: 'Produto não encontrado',
  ncmShRequired: 'O NCM/SH do produto é obrigatório',
};

export { productErrors };
