import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface GetTransactionsUseCaseRequest {
  sessionId: string
}

interface GetTransactionsUseCaseResponse {
  id: string
  title: string
  amount: number
  created_at: string
  session_id?: string
}

export class GetTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  public async execute({
    sessionId,
  }: GetTransactionsUseCaseRequest): Promise<GetTransactionsUseCaseResponse[]> {
    return this.transactionsRepository.findMany(sessionId)
  }
}
