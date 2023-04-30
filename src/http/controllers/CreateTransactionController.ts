import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { randomUUID } from 'node:crypto'
import { makeCreateTransactionUseCase } from '@/use-cases/factories/makeCreateTransactionUseCase'
import { assert } from '@/utils/asserts'

const createTransactionBodySchema = z.object({
  title: z.string(),
  amount: z.number(),
  type: z.enum(['credit', 'debit']),
})

type TransactionBodySchema = z.infer<typeof createTransactionBodySchema>

export class CreateTransactionController {
  private _request?: FastifyRequest
  private _reply?: FastifyReply
  private SEVEN_DAYS_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7
  private COOKIE_NAME = 'sessionId'

  constructor() {
    this.bindMethod()
  }

  private bindMethod() {
    this.execute = this.execute.bind(this)
  }

  public async execute(request: FastifyRequest, reply: FastifyReply) {
    const transactionDTO = this.parseBodyRequestOrThrow(request.body)
    this.request = request
    this.reply = reply

    const createTransactionUseCase = makeCreateTransactionUseCase()
    await createTransactionUseCase.execute({
      ...transactionDTO,
      sessionId: this.createSessionIdCookieIfNotExists(),
    })

    return reply.status(201).send()
  }

  private parseBodyRequestOrThrow(body: unknown): TransactionBodySchema {
    return createTransactionBodySchema.parse(body)
  }

  private get request(): FastifyRequest {
    assert(this._request, 'FastifyRequest is undefined')
    return this._request
  }

  private set request(aRequest: FastifyRequest) {
    this._request = aRequest
  }

  private get reply(): FastifyReply {
    assert(this._reply, 'FastifyReply is undefined')
    return this._reply
  }

  private set reply(aReply: FastifyReply) {
    this._reply = aReply
  }

  private createSessionIdCookieIfNotExists(): string {
    return this.hasSessionIdCookie()
      ? this.sessionId
      : this.createSessionIdCookie()
  }

  private get sessionId(): string {
    assert(this.request.cookies.sessionId, 'SessionId is undefined')
    return this.request.cookies.sessionId
  }

  private hasSessionIdCookie(): boolean {
    return Boolean(this.request.cookies.sessionId)
  }

  private createSessionIdCookie(): string {
    const sessionId = randomUUID()
    this._reply!.cookie(this.COOKIE_NAME, sessionId, {
      path: '/',
      maxAge: this.SEVEN_DAYS_IN_MILLISECONDS,
    })
    return sessionId
  }
}
