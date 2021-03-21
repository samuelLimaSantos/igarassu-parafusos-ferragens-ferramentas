import { Transaction } from '../../model/Transaction';

interface IListTransactionsDTO{
  page: number;
  product_id: string;
}

interface ICreateTransactionDTO {
  user_id: string;
  product_id: string;
  quantity: number;
  transaction_type: 'income' | 'outcome'
}

interface IFindTransactionByIdPaginatedResponse {
  transactions: Transaction[],
  count: number
}

interface IListTransactionsResponse {
  transactions: Transaction[];
  totalTransactions: number;
  totalPages: number;
  previousPage: number | null;
  nextPage: number | null;
  totalTransactionsActualPage: number;
  productActualQuantity: number | undefined;
}

interface ITransactionRepository {
  findTransactionByIdPaginated({ page, product_id }: IListTransactionsDTO)
    : Promise<IFindTransactionByIdPaginatedResponse>;
  createTransaction({
    product_id, quantity, transaction_type, user_id,
  }: ICreateTransactionDTO): Transaction

  saveTransaction(transaction: Transaction): Promise<void>;
  saveMultipleTransactions(transactions: Transaction[]): Promise<void>

}

export {
  IListTransactionsDTO,
  ITransactionRepository,
  ICreateTransactionDTO,
  IListTransactionsResponse,
  IFindTransactionByIdPaginatedResponse,
};
