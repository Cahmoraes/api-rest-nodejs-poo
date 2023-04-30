import { KnexTransactionsRepository } from '@/repositories/knex/KnexTransactionsRepository'
import { TransactionSummaryUseCase } from '../TransactionSummaryUseCase'

export function makeTransactionSummaryUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  return new TransactionSummaryUseCase(transactionsRepository)
}
