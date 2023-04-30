import { knex } from '@/database'
import { CreateTransactionDTO } from '@/interfaces/CreateTransactionDTO'
import {
  FindByIdAndSessionIdParams,
  TransactionsRepository,
} from '../TransactionsRepository'
import { TransactionDTO } from '@/interfaces/TransactionDTO'
import { SummaryDTO } from '@/interfaces/SummaryDTO'

export class KnexTransactionsRepository implements TransactionsRepository {
  private readonly database = knex

  public async create(params: CreateTransactionDTO): Promise<void> {
    await this.database('transactions').insert(params)
  }

  public async findByIdAndSessionId({
    id,
    sessionId,
  }: FindByIdAndSessionIdParams): Promise<TransactionDTO | null> {
    const transaction = await this.database('transactions')
      .select()
      .where({ id, session_id: sessionId })
      .first()
    return transaction ?? null
  }

  public async findMany(sessionId: string): Promise<TransactionDTO[]> {
    return this.database('transactions').where('session_id', sessionId).select()
  }

  public async summary(): Promise<SummaryDTO | null> {
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .first()
    return summary ?? null
  }
}
