interface IRequestDTO {
  actualQuantity: number;
  newQuantity: number
}

export default function calculateTransactionTypeByQuantity({
  actualQuantity,
  newQuantity,
}: IRequestDTO): 'income' | 'outcome' {
  return actualQuantity > newQuantity ? 'outcome' : 'income';
}
