import { KnexTransactionsRepository } from '@/repositories/knex/KnexTransactionsRepository'
import { GetTransactionsUseCase } from '../GetTransactionsUseCase'

export function makeGetTransactionsUseCase() {
  const transactionsRepository = new KnexTransactionsRepository()
  return new GetTransactionsUseCase(transactionsRepository)
}
