import { Router } from 'express'
import { verifyUser } from '../../middleware/verifyUser'
import { isAllowedToAccess } from '../../middleware/isAllowedToAccess'
import { validateData } from '../../middleware/validations'
import { topping, editTopping } from '../../validations'
import ToppingController from './controller'

const router = Router()

router.get(
  '/get-all-toppings',
  verifyUser,
  isAllowedToAccess,
  ToppingController.getAllToppings
)
router.get(
  '/get-topping/:id',
  verifyUser,
  isAllowedToAccess,
  ToppingController.getTopping
)
router.post(
  '/create-topping',
  verifyUser,
  isAllowedToAccess,
  validateData(topping),
  ToppingController.createTopping
)
router.patch(
  '/edit-topping/:id',
  verifyUser,
  isAllowedToAccess,
  validateData(editTopping),
  ToppingController.editTopping
)
router.delete(
  '/delete-topping/:id',
  verifyUser,
  isAllowedToAccess,
  ToppingController.deleteTopping
)

export default router
