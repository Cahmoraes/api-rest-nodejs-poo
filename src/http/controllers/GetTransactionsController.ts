import { makeGetTransactionsUseCase } from '@/use-cases/factories/makeGetTransactionsUseCase'
import { assert } from '@/utils/asserts'
import { FastifyReply, FastifyRequest } from 'fastify'

export class GetTransactionsController {
  private _request?: FastifyRequest
  private _reply?: FastifyReply
  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    this.request = request
    this.reply = reply

    const getTransactionsUseCase = makeGetTransactionsUseCase()
    const transactions = await getTransactionsUseCase.execute({
      sessionId: this.sessionId,
    })
    return { transactions }
  }

  private get request(): FastifyRequest {
    if (!this._request) throw new Error('Request is undefined')
    return this._request
  }

  private set request(request: FastifyRequest) {
    this._request = request
  }

  private get reply(): FastifyReply {
    if (!this._reply) throw new Error('Reply is undefined')
    return this._reply
  }

  private set reply(reply: FastifyReply) {
    this._reply = reply
  }

  private get sessionId(): string {
    assert(this.request.cookies.sessionId, 'Session id is undefined')
    return this.request.cookies.sessionId
  }
}
