import { z } from 'zod'
import { FastifyRequest } from 'fastify'
import { makeGetTransactionByIdUseCase } from '@/use-cases/factories/makeGetTransactionByIdUseCase'
import { assert } from '@/utils/asserts'

const getTransactionParamsSchema = z.object({
  id: z.string().uuid(),
})

type TransactionIdSchema = z.infer<typeof getTransactionParamsSchema>

export class GetTransactionByIdController {
  private _request?: FastifyRequest
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest) {
    const { id } = this.parseParamIdOrThrow(request.params)
    this.request = request

    const getTransactionByIdUseCase = makeGetTransactionByIdUseCase()
    const transaction = await getTransactionByIdUseCase.execute({
      id,
      sessionId: this.sessionId,
    })

    return { transaction }
  }

  private parseParamIdOrThrow(params: unknown): TransactionIdSchema {
    return getTransactionParamsSchema.parse(params)
  }

  private get request(): FastifyRequest {
    if (!this._request) throw new Error('Request is undefined')
    return this._request
  }

  private set request(request: FastifyRequest) {
    this._request = request
  }

  private get sessionId(): string {
    assert(this.request.cookies.sessionId, 'Session id is undefined')
    return this.request.cookies.sessionId
  }
}
