import { KnexTransactionsRepository } from '@/repositories/knex/KnexTransactionsRepository'
import { CreateTransactionUseCase } from '../CreateTransactionUseCase'

export function makeCreateTransactionUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  return new CreateTransactionUseCase(transactionsRepository)
}
