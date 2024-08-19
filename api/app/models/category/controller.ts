import { Request, Response } from 'express'
import CategoryService from './service'

const CategoryController = {
  async getAllCategories(req: Request, res: Response) {
    const categories = await CategoryService.getAllCategories()
    return res.json({ data: categories })
  },
  async getCategory(req: Request, res: Response) {
    const id = req.params.id
    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json({ errors: 'Invalid id, please provide only integers!' })
    }
    const category = await CategoryService.getCategory(id)
    if (!category) {
      return res
        .status(404)
        .json({ errors: 'Category with the given id does not exist' })
    }
    return res.json({ data: category })
  },
  async createCategory(req: Request, res: Response) {
    const { newCategory, statusCode, error } =
      await CategoryService.createCategory(req.body, req.file)

    if (statusCode === 400 || statusCode === 409) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: newCategory })
    }
  },
  async editCategory(req: Request, res: Response) {
    const id = req.params.id
    const { statusCode, error } = await CategoryService.editCategory(
      id,
      req.body,
      req.file
    )
    if (statusCode === 400 || statusCode === 404 || statusCode === 409) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ data: { message: 'Category is edited successfully' } })
    }
  },
  async deleteCategory(req: Request, res: Response) {
    const id = req.params.id
    const { statusCode, error } = await CategoryService.deleteCategory(id)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).end()
    }
  },
}

export default CategoryController
