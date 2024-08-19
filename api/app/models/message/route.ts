import { Router } from 'express'
import { prisma } from '../../config/prisma'
import { message } from '../../validations'
import { validateSocketData } from '../../middleware/validateSocketData'
import { verifyUser } from '../../middleware/verifyUser'
import { isUserAdmin } from '../../middleware/isAdmin'
import MessageController from './controller'
import { isAllowedToAccess } from '../../middleware/isAllowedToAccess'

const router = Router()

export const messageHandler = (io: any, socket: any) => {
  socket.on('create-message', async (data: any) => {
    const errors = await validateSocketData(message, data)
    if (errors) {
      socket.emit('create-message-error', errors)
    } else {
      const newMessage = await prisma.message.create({
        data: {
          ...data,
          date: new Date(),
        },
      })
      console.log(newMessage)
      io.emit('new-message', newMessage)
    }
  })
}

router.get(
  '/get-all-messages',
  verifyUser,
  isAllowedToAccess,
  MessageController.getAllMessages
)
router.get(
  '/get-message/:id',
  verifyUser,
  isAllowedToAccess,
  MessageController.getMessage
)
router.delete(
  '/delete-message/:id',
  verifyUser,
  isUserAdmin,
  MessageController.deleteMessage
)

export default router
