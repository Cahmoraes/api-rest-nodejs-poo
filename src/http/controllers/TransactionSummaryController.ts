import { makeTransactionSummaryUseCase } from '@/use-cases/factories/makeTransactionSummaryUseCase'

export class TransactionSummaryController {
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute() {
    const transactionSummaryUseCase = makeTransactionSummaryUseCase()
    const summary = await transactionSummaryUseCase.execute()
    return { summary }
  }
}
