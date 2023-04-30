import { CreateTransactionDTO } from '../interfaces/CreateTransactionDTO'
import { SummaryDTO } from '../interfaces/SummaryDTO'
import { TransactionDTO } from '../interfaces/TransactionDTO'

export interface FindByIdAndSessionIdParams {
  id: string
  sessionId: string
}

export interface TransactionsRepository {
  create(params: CreateTransactionDTO): Promise<void>

  findByIdAndSessionId(
    params: FindByIdAndSessionIdParams,
  ): Promise<TransactionDTO | null>

  findMany(sessionId: string): Promise<TransactionDTO[]>

  summary(): Promise<SummaryDTO | null>
}
