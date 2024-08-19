import { Router } from 'express'
import { isUserAdmin } from '../../middleware/isAdmin'
import { verifyUser } from '../../middleware/verifyUser'
import { uploadImage } from '../../middleware/uploadImage'
import { validateData } from '../../middleware/validations'
import EmployeeController from './controller'
import {
  employeeEmergencyContact,
  editEmployeeEmergencyContact,
  employeeLeaveDay,
  employeeEditLeaveDay,
  employeeNote,
  employeeEditNote,
} from '../../validations/employee'

const router = Router()

router.get(
  '/get-all-employees',
  verifyUser,
  isUserAdmin,
  EmployeeController.getAllEmployees
)
router.get(
  '/get-employee/:id',
  verifyUser,
  isUserAdmin,
  EmployeeController.getEmployee
)
router.post(
  '/create-employee',
  verifyUser,
  isUserAdmin,
  uploadImage.single('employeePhoto'),
  EmployeeController.createEmployee
)
router.patch(
  '/edit-employee/:id',
  verifyUser,
  isUserAdmin,
  uploadImage.single('employeePhoto'),
  EmployeeController.editEmployee
)
router.delete(
  '/delete-employee/:id',
  verifyUser,
  isUserAdmin,
  EmployeeController.deleteEmployee
)

router.get(
  '/get-all-employee-emergency-contacts/:id',
  verifyUser,
  isUserAdmin,
  EmployeeController.getAllEmergencyContacts
)
router.post(
  '/create-employee-emergency-contact/:id',
  verifyUser,
  isUserAdmin,
  validateData(employeeEmergencyContact),
  EmployeeController.createEmergencyContact
)
router.patch(
  '/edit-employee-emergency-contact/:id/:emergencyContactId',
  verifyUser,
  isUserAdmin,
  validateData(editEmployeeEmergencyContact),
  EmployeeController.editEmergencyContact
)
router.delete(
  '/delete-employee-emergency-contact/:id/:emergencyContactId',
  verifyUser,
  isUserAdmin,
  EmployeeController.deleteEmergencyContact
)

router.get(
  '/get-all-employee-notes',
  verifyUser,
  isUserAdmin,
  EmployeeController.getAllEmployeeNotes
)
router.get(
  '/get-employee-note/:id',
  verifyUser,
  isUserAdmin,
  EmployeeController.getEmployeeNote
)
router.post(
  '/create-employee-note/:id',
  verifyUser,
  isUserAdmin,
  validateData(employeeNote),
  EmployeeController.createEmployeeNote
)
router.patch(
  '/edit-employee-note/:noteId/:employeeId',
  verifyUser,
  isUserAdmin,
  validateData(employeeEditNote),
  EmployeeController.editEmployeeNote
)
router.delete(
  '/delete-employee-note/:noteId/:employeeId',
  verifyUser,
  isUserAdmin,
  EmployeeController.deleteEmployeeNote
)

router.get(
  '/get-all-employee-leave-days',
  verifyUser,
  isUserAdmin,
  EmployeeController.getAllEmployeeLeaveDays
)
router.get(
  '/get-employee-leave-day/:leaveDayId/:employeeId',
  verifyUser,
  isUserAdmin,
  EmployeeController.getEmployeeLeaveDay
)
router.post(
  '/create-employee-leave-day/:id',
  verifyUser,
  isUserAdmin,
  validateData(employeeLeaveDay),
  EmployeeController.createEmployeeLeaveDay
)
router.patch(
  '/change-employee-leave-status/:leaveDayId/:employeeId',
  verifyUser,
  isUserAdmin,
  EmployeeController.changeEmployeeLeaveDayStatus
)
router.patch(
  '/edit-employee-leave-day/:leaveDayId/:employeeId',
  verifyUser,
  isUserAdmin,
  validateData(employeeEditLeaveDay),
  EmployeeController.editEmployeeLeaveDay
)
router.delete(
  '/delete-employee-leave-day/:leaveDayId/:employeeId',
  verifyUser,
  isUserAdmin,
  EmployeeController.deleteEmployeeLeaveDay
)

export default router
