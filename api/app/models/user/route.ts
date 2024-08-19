import { Router } from 'express'
import { UserController } from './controller'
import { validateData } from '../../middleware/validations'
import { uploadImage } from '../../middleware/uploadImage'
import { userLogin } from '../../validations'
import { isAdminstrative } from '../../middleware/isAdminstrative'
import { verifyUser } from '../../middleware/verifyUser'
import { isUserAdmin } from '../../middleware/isAdmin'

const router = Router()

router.get(
  '/get-all-users',
  verifyUser,
  isUserAdmin,
  UserController.getAllUsers
)
router.get('/get-user/:id', verifyUser, isAdminstrative, UserController.getUser)
router.post('/login', validateData(userLogin), UserController.login)
router.post(
  '/create-user/',
  verifyUser,
  isUserAdmin,
  uploadImage.single('user-photo'),
  UserController.createUser
)
router.patch(
  '/edit-user/:id',
  verifyUser,
  isAdminstrative,
  uploadImage.single('user-photo'),
  UserController.editUser
)
router.delete(
  '/delete-user/:id',
  verifyUser,
  isUserAdmin,
  UserController.deleteUser
)
router.patch(
  '/change-user-status/:id',
  verifyUser,
  isUserAdmin,
  UserController.changeUserStatus
)

export default router
