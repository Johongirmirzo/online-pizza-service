import { prisma } from '../../config/prisma'
import { IReview, ReviewStatus } from '../../types/review'

const ReviewService = {
  async getAllReviews() {
    return []
  },
  async getReview(customerId: string) {
    await prisma.review.findFirst({ where: { customerId } })
  },
  async changeReviewStatus(reviewId: string, status: ReviewStatus) {
    try {
      const review = await prisma.review.findUnique({ where: { id: reviewId } })
      if (!review) {
        return { statusCode: 404, erorr: 'Review has not been found' }
      } else {
        await prisma.review.update({
          where: { id: reviewId },
          data: {
            status: ReviewStatus[status],
          },
        })
        return { statusCode: 200, erorr: '' }
      }
    } catch (err: any) {
      console.log(err)
      return { statusCode: 400, error: 'Bad Request!' }
    }
  },
  async deleteReview(reviewId: string) {
    try {
      const review = await prisma.review.findUnique({ where: { id: reviewId } })
      if (!review) {
        return { statusCode: 404, erorr: 'Review has not been found' }
      } else {
        await prisma.review.delete({
          where: { id: reviewId },
        })
        return { statusCode: 204, erorr: '' }
      }
    } catch (err: any) {
      return { statusCode: 400, error: 'Bad Request!' }
    }
  },
}

export default ReviewService
