import { getCustomRepository } from 'typeorm';
import { TransactionsRepository } from '../repositories/TransactionsRepository';

interface RequestDTO {
  user_id: string;
  product_id: string;
  quantity: number;
  transaction_type: 'income' | 'outcome';
}

export default class CreateTransactionHistory {
  public async execute({
    user_id, product_id, quantity, transaction_type,
  }: RequestDTO): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transaction = transactionRepository.create({
      user_id,
      product_id,
      quantity,
      transaction_type,
    });

    transactionRepository.save(transaction);
  }
}
