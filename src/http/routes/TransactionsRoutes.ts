import { FastifyInstance, FastifyRequest } from 'fastify'
import { GetTransactionsController } from '../controllers/GetTransactionsController'
import { GetTransactionByIdController } from '../controllers/GetTransactionByIdController'
import { CreateTransactionController } from '../controllers/CreateTransactionController'
import { TransactionSummaryController } from '../controllers/TransactionSummaryController'
import { assert } from '@/utils/asserts'
import { checkSessionIdExists } from '@/middlewares/checkSessionIdExists'

export class TransactionsRoutes {
  private _app?: FastifyInstance
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.initialize = this.initialize.bind(this)
  }

  public async initialize(app: FastifyInstance) {
    this.app = app

    this.registerHook()
    this.registerGetTransactions()
    this.registerGetTransactionById()
    this.registerTransactionSummary()
    this.registerCreateTransaction()
  }

  private get app() {
    assert(this._app, 'Fastify instance is undefined')
    return this._app
  }

  private registerHook(): void {
    this.app.addHook('preHandler', async (request: FastifyRequest) => {
      console.log(`[${request.method}] | [${request.url}]`)
    })
  }

  private set app(app: FastifyInstance) {
    this._app = app
  }

  private registerGetTransactions(): void {
    this.app.get(
      '/',
      {
        preHandler: [checkSessionIdExists],
      },
      new GetTransactionsController().execute,
    )
  }

  private registerGetTransactionById(): void {
    this.app.get(
      '/:id',
      {
        preHandler: [checkSessionIdExists],
      },
      new GetTransactionByIdController().execute,
    )
  }

  private registerTransactionSummary(): void {
    this.app.get('/summary', new TransactionSummaryController().execute)
  }

  private registerCreateTransaction(): void {
    this.app.post('/', new CreateTransactionController().execute)
  }
}
