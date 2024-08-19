import { Request, Response } from 'express'
import ApplicantService from './service'

const ApplicantController = {
  async getAllApplicants(req: Request, res: Response) {
    const applicants = await ApplicantService.getAllApplicants()
    return res.json({ data: applicants })
  },
  async getApplicant(req: Request, res: Response) {
    const id = req.params.id
    const { applicant, statusCode, error } =
      await ApplicantService.getApplicant(id)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      res.json({ data: applicant })
    }
  },
  async createApplicant(req: Request, res: Response) {
    const { newApplicant, statusCode, error } =
      await ApplicantService.createApplicant(req.body, req.files)
    if (!newApplicant) {
      return res.status(statusCode).json({ errors: error })
    }
    return res.status(201).json({ data: newApplicant })
  },

  async changeApplicantStatus(req: Request, res: Response) {
    const id = req.params.id
    const { status } = req.body
    const { error, statusCode } = await ApplicantService.changeApplicantStatus(
      id,
      status
    )
    if (statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    }
    return res.status(statusCode).json({
      message: `Application status is changed to ${status} successfully!`,
    })
  },
  async deleteApplicant(req: Request, res: Response) {
    const id = req.params.id
    const { statusCode, error } = await ApplicantService.deleteApplicant(id)
    if (statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    }
    return res.status(statusCode).end()
  },
}

export default ApplicantController
