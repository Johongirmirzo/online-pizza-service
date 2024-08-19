import bcrypt from 'bcrypt'
import fs from 'fs'
import path from 'path'
import { prisma } from '../../config/prisma'
import { Role } from '../../types/token'
import { IUser, IUserFormData, UserStatus } from '../../types/user'
import cloudinary, { options } from '../../config/cloudinary'

const UserService = {
  async loginUser(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        return { user: null, statusCode: 404, error: 'Email does not exist' }
      } else {
        if (!(await bcrypt.compare(password, user.password))) {
          return {
            user: null,
            statusCode: 400,
            error: 'Password did not match',
          }
        } else {
          return { user, statusCode: 200, error: '' }
        }
      }
    } catch (err: any) {
      return { user: null, statusCode: 400, error: 'Bad Request' }
    }
  },
  async getAllUsers() {
    return (
      await prisma.user.findMany({ orderBy: [{ created: 'desc' }] })
    ).filter((user) => Role[user.role] != Role.ADMIN)
  },
  async getUser(id: string, reqObject: any) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if (!user) {
        return { user: null, statusCode: 404, error: 'User has not been found' }
      } else {
        if (user.role === 'ADMIN' && reqObject.role !== 'ADMIN') {
          return {
            user: null,
            statusCode: 403,
            error: "ADMIN can't be retrieved",
          }
        } else {
          return { user, statusCode: 200, error: '' }
        }
      }
    } catch (err) {
      return { user: null, statusCode: 400, error: 'Bad Request!' }
    }
  },
  async createNewUser(userData: IUser, userPhotoFile: any) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber },
          ],
        },
      })
      if (user) {
        if (userPhotoFile) {
          fs.rmSync(
            path.join(
              __dirname,
              `../../assets/images/${userPhotoFile.filename}`
            )
          )
        }
        return {
          newUser: null,
          statusCode: 409,
          error: `User with this ${userData.email ? userData.email : ''} or ${
            userData.phoneNumber ? userData.phoneNumber : ''
          } already exists!`,
        }
      } else {
        let userPhoto
        if (userPhotoFile) {
          userPhoto = await cloudinary.v2.uploader.upload(
            userPhotoFile.path,
            options
          )
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10)
        const newUser = await prisma.user.create({
          data: {
            ...userData,
            password: hashedPassword,
            photo: userPhoto?.secure_url || '',
            photo_id: userPhoto?.public_id || '',
          },
        })
        return { newUser, statusCode: 201, error: '' }
      }
    } catch (err) {
      if (userPhotoFile) {
        fs.rmSync(
          path.join(__dirname, `../../assets/images/${userPhotoFile.filename}`)
        )
      }
      return { newUser: null, statusCode: 400, error: 'Bad Request!' }
    }
  },
  async editUser(id: string, userData: IUserFormData, userPhotoFile: any) {
    try {
      const userWithGivenData = await prisma.user.findFirst({
        where: {
          OR: [
            { email: userData.email },
            { phoneNumber: userData.phoneNumber },
          ],
        },
      })
      const user = await prisma.user.findUnique({ where: { id } })
      if (!user) {
        if (userPhotoFile) {
          fs.rmSync(
            path.join(
              __dirname,
              `../../assets/images/${userPhotoFile.filename}`
            )
          )
        }
        return { user: null, statusCode: 404, error: "User's not been found" }
      } else {
        let userPhoto
        let hashedPassword
        if (userWithGivenData) {
          if (
            userWithGivenData.id !== user.id &&
            (userWithGivenData.email == userData.email ||
              userWithGivenData.phoneNumber !== userData.phoneNumber)
          ) {
            return {
              user: null,
              statusCode: 409,
              error: `User with this ${userData.email ? userData.email : ''} ${
                userData.phoneNumber ? userData.phoneNumber : ''
              } already exists!`,
            }
          }
        }

        if (userData.password) {
          if (!(await bcrypt.compare(userData.password, user.password))) {
            return {
              user: null,
              statusCode: 400,
              error: 'Password is incorrect!',
            }
          } else {
            if (
              (userData.newPassword && !userData.newConfirmPassword) ||
              (!userData.newPassword && userData.newConfirmPassword)
            ) {
              return {
                user: null,
                statusCode: 400,
                error:
                  "You've to provide both new and new confirm password to change your password!",
              }
            }
            if (userData.newPassword === userData.newConfirmPassword) {
              hashedPassword = await bcrypt.hash(userData.newPassword, 10)
            } else {
              return {
                user: null,
                statusCode: 400,
                error: 'Password did not match!',
              }
            }
          }
        }

        const filteredUserData = Object.entries(userData)
          .filter((user) => !/newPassword|newConfirmPassword/i.test(user[0]))
          .reduce((obj, currEl) => ({ ...obj, [currEl[0]]: currEl[1] }), {})

        if (userPhotoFile && user.photo) {
          const imageSplit = user.photo.split('/') as []
          const imagePath = imageSplit[imageSplit.length - 1] as string
          fs.rmSync(path.join(__dirname, `../../assets/images/${imagePath}`))
          userPhoto = await cloudinary.v2.uploader.upload(
            userPhotoFile.path,
            options
          )
        } else if (userPhotoFile && !user.photo) {
          userPhoto = await cloudinary.v2.uploader.upload(
            userPhotoFile.path,
            options
          )
        }
        console.log(filteredUserData)

        const updatedUser = await prisma.user.update({
          where: { id },
          data: {
            ...filteredUserData,
            photo: userPhoto?.secure_url || user.photo,
            photo_id: userPhoto?.public_id || user.photo_id,
            password: hashedPassword || user.password,
            updated: new Date(),
          },
        })
        return { user: updatedUser, statusCode: 200, error: '' }
      }
    } catch (err) {
      console.log(err)
      if (userPhotoFile) {
        fs.rmSync(
          path.join(__dirname, `../../assets/images/${userPhotoFile.filename}`)
        )
      }
      return { user: null, statusCode: 400, error: 'Bad Request!' }
    }
  },
  async deleteUserService(id: string) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if (user?.role === 'ADMIN') {
        return { statusCode: 403, error: "ADMIN can't be deleted!" }
      } else if (!user) {
        return { statusCode: 404, error: 'User has not been found' }
      } else {
        if (user.photo && user.photo_id) {
          const imageSplit = user.photo.split('/') as []
          const imagePath = imageSplit[imageSplit.length - 1] as string
          fs.rmSync(path.join(__dirname, `../../assets/images/${imagePath}`))
          await cloudinary.v2.uploader.destroy(user.photo_id)
        }

        await prisma.user.delete({ where: { id } })
        return { statusCode: 204, error: '' }
      }
    } catch (err) {
      return { statusCode: 400, error: 'Bad Request!' }
    }
  },
  async changeUserStatus(id: string, status: UserStatus) {
    try {
      const user = await prisma.user.findUnique({ where: { id } })
      if (user?.role === 'ADMIN') {
        return { statusCode: 403, error: "ADMIN status can't be changed" }
      } else if (!user) {
        return { statusCode: 404, error: 'User has not been found' }
      } else {
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            status: UserStatus[status],
            updated: new Date(),
          },
        })
        return { statusCode: 200, error: '' }
      }
    } catch (err) {
      return { statusCode: 400, error: 'Bad Request!' }
    }
  },
}
export default UserService
