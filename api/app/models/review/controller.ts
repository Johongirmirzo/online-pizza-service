import { Request, Response } from 'express'
import ReviewService from './service'

const ReviewController = {
  async getAllReviews(req: Request, res: Response) {
    const reviews = await ReviewService.getAllReviews()
    return res.json({ data: reviews })
  },
  async getReview(req: Request, res: Response) {
    const id = req.params.id
    const review = await ReviewService.getReview(id)
    return res.json({ data: review })
  },
  async changeReviewStatus(req: Request, res: Response) {
    const id = req.params.id
    const { statusCode, error } = await ReviewService.changeReviewStatus(
      id,
      req.body.status
    )
    if (statusCode === 404 || statusCode === 400) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ message: 'Review status is changed successfully!' })
    }
  },
  async deleteReview(req: Request, res: Response) {
    const id = req.params.id
    const { statusCode, error } = await ReviewService.deleteReview(id)
    if (statusCode === 404 || statusCode === 400) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).end()
    }
  },
}

export default ReviewController
