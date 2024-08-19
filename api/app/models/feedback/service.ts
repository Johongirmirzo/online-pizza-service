import { prisma } from '../../config/prisma'
import { FeedbackStatus } from '../../types/feedback'

const FeedbackService = {
  async getAllFeedbacks() {
    return await prisma.feedback.findMany({
      include: { dineInFeedbacks: true, deliveryFeedbacks: true },
      orderBy: [{ created: 'desc' }],
    })
  },
  async getFeedback(id: string) {
    try {
      const feedback = await prisma.feedback.findUnique({
        where: { id },
        include: { dineInFeedbacks: true, deliveryFeedbacks: true },
      })
      return feedback
        ? { feedback, statusCode: 200, error: '' }
        : { feedback: null, statusCode: 404, error: 'Feedback not found!' }
    } catch (err: any) {
      return { feedback: null, statusCode: 400, error: 'Bad Request!' }
    }
  },
  async changeFeedbackStatus(id: string, status: FeedbackStatus) {
    try {
      const feedback = await prisma.feedback.findUnique({ where: { id } })
      if (!feedback) {
        return { statusCode: 404, error: "Feedback's not been found" }
      } else {
        await prisma.feedback.update({
          where: { id },
          data: {
            status: FeedbackStatus[status],
          },
        })
        return { statusCode: 200, error: '' }
      }
    } catch (err: any) {
      return { statusCode: 400, error: 'Bad Request!' }
    }
  },
  async deleteFeedback(id: string) {
    try {
      const feedback = await prisma.feedback.findUnique({ where: { id } })
      if (!feedback) {
        return { statusCode: 404, error: "Feedback's not been found" }
      } else {
        await prisma.feedback.delete({ where: { id } })
        return { statusCode: 204, error: '' }
      }
    } catch (err: any) {
      return { statusCode: 400, error: 'Bad Request!' }
    }
  },
}

export default FeedbackService
