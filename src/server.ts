import cookie from '@fastify/cookie'
import Fastify, { FastifyInstance } from 'fastify'
import { env } from './env'
import { TransactionsRoutes } from './http/routes/TransactionsRoutes'

enum ServerRoutes {
  'TRANSACTIONS' = 'transactions',
}

export class Server {
  private readonly app = Fastify({ logger: false })
  private readonly PORT = env.PORT
  private readonly HOST = '0.0.0.0'

  public start(): void {
    this.registerCookie()
    this.registerRoutes()
    this.listen()
  }

  private registerCookie(): void {
    this.app.register(cookie)
  }

  private registerRoutes(): void {
    this.app.register(new TransactionsRoutes().initialize, {
      prefix: ServerRoutes.TRANSACTIONS,
    })
  }

  private async listen(): Promise<void> {
    try {
      await this.performListen()
    } catch (error) {
      this.app.log.error(error)
    }
  }

  private async performListen(): Promise<void> {
    await this.app.listen({
      port: this.PORT,
      host: this.HOST,
    })

    console.log('HTTP Server Running 🚀')
  }

  public getAppInstanceForTesting(): FastifyInstance {
    this.registerCookie()
    this.registerRoutes()
    return this.app
  }
}
