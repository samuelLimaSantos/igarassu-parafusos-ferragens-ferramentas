import { Transaction } from '../../infra/typeorm/entities/Transaction';

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
  incomes: number;
  outcomes: number;
}

interface IIncomesAndOutcomes {
  incomes: number;
  outcomes: number;
}

interface ITransactionRepository {
  findTransactionByIdPaginated({ page, product_id }: IListTransactionsDTO)
    : Promise<IFindTransactionByIdPaginatedResponse>;
  createTransaction({
    product_id, quantity, transaction_type, user_id,
  }: ICreateTransactionDTO): Transaction

  saveTransaction(transaction: Transaction): Promise<void>;
  saveMultipleTransactions(transactions: Transaction[]): Promise<void>
  getIncomesAndOutcomesById(product_id: string): Promise<IIncomesAndOutcomes>

}

export {
  IListTransactionsDTO,
  ITransactionRepository,
  ICreateTransactionDTO,
  IListTransactionsResponse,
  IFindTransactionByIdPaginatedResponse,
  IIncomesAndOutcomes,
};
