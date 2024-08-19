import { Request, Response } from 'express'
import UserService from './service'
import { generateToken } from '../../utils/generateToken'
import { Role, ITokenPayload } from '../../types/token'

const UserController = {
  async login(req: Request, res: Response) {
    try {
      const { email: userEmail, password } = req.body
      const { user, statusCode, error } = await UserService.loginUser(
        userEmail,
        password
      )
      console.log('Email', userEmail, password)
      if (statusCode === 400 || statusCode === 404) {
        return res.status(statusCode).json({ errors: error })
      } else {
        if (user) {
          const { id, name, email } = user

          console.log(user)
          const {
            ACCESS_TOKEN_PRIVATE_KEY,
            ACCESS_TOKEN_EXPIRATION_TIME,
            REFRESH_TOKEN_PRIVATE_KEY,
            REFRESH_TOKEN_EXPIRATION_TIME,
          } = process.env
          const accessToken = generateToken<ITokenPayload>(
            { id, name, email, role: Role[user.role] },
            `${ACCESS_TOKEN_PRIVATE_KEY}`,
            `${ACCESS_TOKEN_EXPIRATION_TIME}`
          )
          const refreshToken = generateToken<ITokenPayload>(
            { id, name, email, role: Role[user.role] },
            `${REFRESH_TOKEN_PRIVATE_KEY}`,
            `${REFRESH_TOKEN_EXPIRATION_TIME}`
          )
          res
            .status(statusCode)
            .json({ data: { accessToken, refreshToken, user } })
        }
      }
    } catch (err: any) {
      res.status(400).json({ errors: err.message })
    }
  },
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers()
      return res.json({ data: users })
    } catch (err: any) {
      res.status(400).json({ errors: err.message })
    }
  },
  async getUser(req: Request, res: Response) {
    const id = req.params.id
    const { user, statusCode, error } = await UserService.getUser(id, req.user)
    if (statusCode === 404 || statusCode === 400 || statusCode === 403) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: user })
    }
  },
  async createUser(req: Request, res: Response) {
    const { newUser, statusCode, error } = await UserService.createNewUser(
      req.body,
      req.file
    )
    if (statusCode === 400 || statusCode === 409) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: newUser })
    }
  },
  async editUser(req: Request, res: Response) {
    const id = req.params.id
    console.log({ id })
    const { user, statusCode, error } = await UserService.editUser(
      id,
      req.body,
      req.file
    )
    if (statusCode === 409 || statusCode === 400) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: user })
    }
  },
  async deleteUser(req: Request, res: Response) {
    const id = req.params.id

    const { statusCode, error } = await UserService.deleteUserService(id)
    if (statusCode === 400 || statusCode === 404 || statusCode === 403) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).end()
    }
  },
  async changeUserStatus(req: Request, res: Response) {
    const id = req.params.id
    const { statusCode, error } = await UserService.changeUserStatus(
      id,
      req.body.status
    )
    if (statusCode === 400 || statusCode === 404 || statusCode === 403) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ message: 'User status is updated successfully!' })
    }
  },
}
export { UserController }
