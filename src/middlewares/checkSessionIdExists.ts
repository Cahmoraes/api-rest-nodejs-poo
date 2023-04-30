import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  if (!hasSession()) {
    return replyUnauthorized()
  }

  function hasSession() {
    return request.cookies.sessionId
  }

  function replyUnauthorized() {
    return reply.status(401).send({
      message: 'Unauthorized',
    })
  }
}
