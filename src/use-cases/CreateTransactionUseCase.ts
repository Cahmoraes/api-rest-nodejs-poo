import { randomUUID } from 'node:crypto'
import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface CreateTransactionUseCaseRequest {
  title: string
  amount: number
  type: 'credit' | 'debit'
  sessionId?: string
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  public async execute({
    title,
    amount,
    type,
    sessionId,
  }: CreateTransactionUseCaseRequest): Promise<void> {
    await this.transactionsRepository.create({
      id: randomUUID(),
      title,
      amount: this.isCredit(type) ? amount : this.toNegative(amount),
      session_id: sessionId,
    })
  }

  private isCredit(
    type: CreateTransactionUseCaseRequest['type'],
  ): type is 'credit' {
    return type === 'credit'
  }

  private toNegative(aNumber: number): number {
    return aNumber * -1
  }
}
