import { KnexTransactionsRepository } from '@/repositories/knex/KnexTransactionsRepository'
import { GetTransactionByIdUseCase } from '../GetTransactionByIdUseCase'

export function makeGetTransactionByIdUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  return new GetTransactionByIdUseCase(transactionsRepository)
}
