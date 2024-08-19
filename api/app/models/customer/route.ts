import { Router } from 'express'
import { isUserAdmin } from '../../middleware/isAdmin'
import { verifyUser } from '../../middleware/verifyUser'
import {
  limitApiRequestByHours,
  rateLimitMessages,
} from '../../middleware/rateLimiter'
import { verifyCustomer } from '../../middleware/verifyCustomer'
import { validateData } from '../../middleware/validations'
import {
  loginCustomer,
  registerCustomer,
  editCustomer,
  createCustomerAddressFormData,
  editCustomerAddressFormData,
} from '../../validations'
import CustomerController from './controller'

const router = Router()

router.get('/get-all-customers', CustomerController.getAllCustomers)
router.get('/get-customer/:id', CustomerController.getCustomer)
router.post(
  '/login',
  validateData(loginCustomer),
  CustomerController.loginCustomer
)
router.post(
  '/register',
  validateData(registerCustomer),
  limitApiRequestByHours(6, 1, rateLimitMessages.customerRegister(6)),
  CustomerController.registerCustomer
)
router.patch(
  '/update-customer/:id',
  verifyCustomer,
  validateData(editCustomer),
  CustomerController.updateCustomer
)
router.patch(
  '/change-customer-status/:id',
  verifyUser,
  isUserAdmin,
  CustomerController.changeCustomerStatus
)
router.delete(
  '/delete-customer/:id',
  verifyUser,
  isUserAdmin,
  CustomerController.deleteCustomer
)

router.get(
  '/get-all-customer-addresses/:id',
  CustomerController.getAllCustomerAddresses
)
router.patch(
  '/update-customer-address/:addressId/:customerId',
  validateData(editCustomerAddressFormData),
  CustomerController.updateCustomerAddress
)
router.patch(
  '/set-default-customer-address/:addressId/:customerId',
  CustomerController.setDefaultCustomerAddress
)
router.post(
  '/create-customer-address/:id',
  validateData(createCustomerAddressFormData),
  CustomerController.createCustomerAddress
)
router.delete(
  '/delete-customer-address/:id',
  CustomerController.deleteCustomerAddress
)

export default router
