import { Router } from 'express'
import { verifyUser } from '../../middleware/verifyUser'
import { isAllowedToAccess } from '../../middleware/isAllowedToAccess'
import { uploadImage } from '../../middleware/uploadImage'
import MenuController from './controller'
import { isUserAdmin } from '../../middleware/isAdmin'

const router = Router()

router.get('/get-all-dips', MenuController.getAllDips)
router.get('/get-dip/:id', MenuController.getDip)
router.post(
  '/create-dip',
  verifyUser,
  isAllowedToAccess,
  uploadImage.single('dip-photo'),
  MenuController.createDip
)
router.patch(
  '/edit-dip/:id',
  verifyUser,
  isAllowedToAccess,
  uploadImage.single('dip-photo'),
  MenuController.editDip
)
router.patch(
  '/change-dip-status/:id',
  verifyUser,
  isAllowedToAccess,
  MenuController.changeDipStatus
)
router.delete(
  '/delete-dip/:id',
  verifyUser,
  isUserAdmin,
  MenuController.deleteDip
)

router.get('/get-all-menu-items', MenuController.getAllMenuItems)
router.get('/get-menu-item/:id', MenuController.getMenuItem)
router.post(
  '/create-menu-item',
  verifyUser,
  isAllowedToAccess,
  uploadImage.fields([
    { name: 'small' },
    { name: 'medium' },
    { name: 'large' },
  ]),
  MenuController.createMenuItem
)
router.patch(
  '/edit-menu-item/:id',
  verifyUser,
  isAllowedToAccess,
  uploadImage.fields([
    { name: 'small' },
    { name: 'medium' },
    { name: 'large' },
  ]),
  MenuController.editMenuItem
)
router.patch(
  '/change-menu-item-status/:id',
  verifyUser,
  isAllowedToAccess,
  MenuController.changeMenuItemStatus
)
router.delete(
  '/delete-menu-item/:id',
  verifyUser,
  isUserAdmin,
  MenuController.deleteMenuItem
)

router.get('/get-all-pizzas', MenuController.getAllPizzas)
router.get('/get-pizza/:id', MenuController.getPizza)
router.post(
  '/create-pizza',
  verifyUser,
  isUserAdmin,
  uploadImage.fields([
    { name: 'small' },
    { name: 'medium' },
    { name: 'large' },
  ]),
  MenuController.createPizza
)
router.patch(
  '/edit-pizza/:id',
  verifyUser,
  isUserAdmin,
  uploadImage.fields([
    { name: 'small' },
    { name: 'medium' },
    { name: 'large' },
  ]),
  MenuController.editPizza
)
router.patch(
  '/change-pizza-status/:id',
  verifyUser,
  isUserAdmin,
  MenuController.changePizzaStatus
)
router.delete(
  '/delete-pizza/:id',
  verifyUser,
  isUserAdmin,
  MenuController.deletePizza
)

export default router
