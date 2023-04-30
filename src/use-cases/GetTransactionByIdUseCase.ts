import { TransactionsRepository } from '../repositories/TransactionsRepository'

interface GetTransactionByIdUseCaseRequest {
  id: string
  sessionId: string
}

interface GetTransactionByIdUseCaseResponse {
  id: string
  title: string
  amount: number
  created_at: string
  session_id?: string
}

export class GetTransactionByIdUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  public async execute({
    id,
    sessionId,
  }: GetTransactionByIdUseCaseRequest): Promise<GetTransactionByIdUseCaseResponse | null> {
    return this.transactionsRepository.findByIdAndSessionId({
      id,
      sessionId,
    })
  }
}
