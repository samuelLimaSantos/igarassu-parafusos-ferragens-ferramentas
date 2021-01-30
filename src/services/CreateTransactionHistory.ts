import { getRepository, getManager } from 'typeorm';
import TransactionModel from '../models/Transactions';

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
    const transactionRepository = getRepository(TransactionModel);

    const transaction = transactionRepository.create({
      user_id,
      product_id,
      quantity,
      transaction_type,
    });

    transactionRepository.save(transaction);
  }
}
