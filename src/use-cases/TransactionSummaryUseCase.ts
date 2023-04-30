import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface TransactionSummaryUseCaseResponse {
  amount: number
}

export class TransactionSummaryUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  public async execute(): Promise<TransactionSummaryUseCaseResponse | null> {
    return this.transactionsRepository.summary()
  }
}
