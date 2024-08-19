import { prisma } from '../../config/prisma'

const MessageService = {
  async getAllMessages() {
    return await prisma.message.findMany({ orderBy: [{ date: 'desc' }] })
  },
  async getMessage(messageId: string) {
    try {
      const message = await prisma.message.findUnique({
        where: { id: messageId },
      })
      if (!message) {
        return {
          message: null,
          statusCode: 404,
          error: 'Message has not been found!',
        }
      } else {
        return { message, statusCode: 200, error: '' }
      }
    } catch (err: any) {
      return { message: null, statusCode: 400, error: 'Bad Request!' }
    }
  },
  async deleteMessage(messageId: string) {
    try {
      const message = await prisma.message.findUnique({
        where: { id: messageId },
      })
      if (!message) {
        return { statusCode: 404, error: 'Message has not been found!' }
      } else {
        await prisma.message.delete({ where: { id: messageId } })
        return { statusCode: 204, error: '' }
      }
    } catch (err: any) {
      return { statusCode: 400, error: 'Bad Request!' }
    }
  },
}

export default MessageService
