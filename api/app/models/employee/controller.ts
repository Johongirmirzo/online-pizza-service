import { Request, Response } from 'express'
import EmployeeService from './service'

const EmployeeController = {
  async getAllEmployees(req: Request, res: Response) {
    const employees = await EmployeeService.getAllEmployees()
    res.json({ data: employees })
  },
  async getEmployee(req: Request, res: Response) {
    const id = req.params.id
    const { error, statusCode, employee } = await EmployeeService.getEmployee(
      id
    )

    if (statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: employee })
    }
  },
  async createEmployee(req: Request, res: Response) {
    const { newEmployee, error, statusCode } =
      await EmployeeService.createEmployee(req.body, req.file)
    if (error) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: newEmployee })
    }
  },
  async editEmployee(req: Request, res: Response) {
    const id = req.params.id
    const { error, statusCode } = await EmployeeService.editEmployee(
      id,
      req.body,
      req.file
    )
    if (statusCode === 404 || statusCode === 400 || statusCode === 409) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ message: 'Employee is edited successfully!' })
    }
  },
  async deleteEmployee(req: Request, res: Response) {
    const id = req.params.id
    const { error, statusCode } = await EmployeeService.deleteEmployee(id)
    if (statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).end()
    }
  },

  async getAllEmergencyContacts(req: Request, res: Response) {
    const id = req.params.id
    const { emergencyContacts, statusCode, error } =
      await EmployeeService.getAllEmergencyContacts(id)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: emergencyContacts })
    }
  },
  async createEmergencyContact(req: Request, res: Response) {
    const id = req.params.id
    const { newEmergencyContact, statusCode, error } =
      await EmployeeService.createEmergencyContact(id, req.body)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: newEmergencyContact })
    }
  },
  async editEmergencyContact(req: Request, res: Response) {
    const { id, emergencyContactId } = req.params
    const { statusCode, error } = await EmployeeService.editEmergencyContact(
      id,
      emergencyContactId,
      req.body
    )
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ message: 'Emergency contact is updated successfully!' })
    }
  },
  async deleteEmergencyContact(req: Request, res: Response) {
    const { id, emergencyContactId } = req.params
    const { statusCode, error } = await EmployeeService.deleteEmergencyContact(
      id,
      emergencyContactId
    )
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).end()
    }
  },

  async getAllEmployeeNotes(req: Request, res: Response) {
    const employeeNotes = await EmployeeService.getAllEmployeeNotes()
    res.json({ data: employeeNotes })
  },
  async getEmployeeNote(req: Request, res: Response) {
    const id = req.params.id
    const { employeeNote, statusCode, error } =
      await EmployeeService.getEmployeeNote(id)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: employeeNote })
    }
  },
  async createEmployeeNote(req: Request, res: Response) {
    const id = req.params.id
    const { newEmployeeNote, statusCode, error } =
      await EmployeeService.createEmployeeNote(id, req.body)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: newEmployeeNote })
    }
  },
  async editEmployeeNote(req: Request, res: Response) {
    const { noteId, employeeId } = req.params
    const { statusCode, error } = await EmployeeService.editEmployeeNote(
      noteId,
      employeeId,
      req.body
    )
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ message: 'Emergency contact is updated successfully!' })
    }
  },
  async deleteEmployeeNote(req: Request, res: Response) {
    const { noteId, employeeId } = req.params
    const { statusCode, error } = await EmployeeService.deleteEmployeeNote(
      noteId,
      employeeId
    )
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).end()
    }
  },

  async getAllEmployeeLeaveDays(req: Request, res: Response) {
    const employeeLeaveDays = await EmployeeService.getAllEmployeeLeaveDays()
    res.json({ data: employeeLeaveDays })
  },
  async getEmployeeLeaveDay(req: Request, res: Response) {
    const { leaveDayId, employeeId } = req.params
    const { employeeLeaveDays, statusCode, error } =
      await EmployeeService.getEmployeeLeaveDay(leaveDayId, employeeId)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: employeeLeaveDays })
    }
  },
  async createEmployeeLeaveDay(req: Request, res: Response) {
    const id = req.params.id
    const { newEmployeeLeaveDay, statusCode, error } =
      await EmployeeService.createEmployeeLeaveDay(id, req.body)
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).json({ data: newEmployeeLeaveDay })
    }
  },
  async changeEmployeeLeaveDayStatus(req: Request, res: Response) {
    const { leaveDayId, employeeId } = req.params
    const { statusCode, error } =
      await EmployeeService.changeEmployeeLeaveDayStatus(
        leaveDayId,
        employeeId,
        req.body.status
      )
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ data: { message: 'Employee status is changed successfully!' } })
    }
  },
  async editEmployeeLeaveDay(req: Request, res: Response) {
    const { leaveDayId, employeeId } = req.params
    console.log({ leaveDayId, employeeId })
    const { statusCode, error } = await EmployeeService.editEmployeeLeaveDay(
      leaveDayId,
      employeeId,
      req.body
    )
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res
        .status(statusCode)
        .json({ message: 'Employee leave day is updated successfully!' })
    }
  },
  async deleteEmployeeLeaveDay(req: Request, res: Response) {
    const { leaveDayId, employeeId } = req.params
    console.log({ leaveDayId, employeeId })
    const { statusCode, error } = await EmployeeService.deleteEmployeeLeaveDay(
      leaveDayId,
      employeeId
    )
    if (statusCode === 400 || statusCode === 404) {
      return res.status(statusCode).json({ errors: error })
    } else {
      return res.status(statusCode).end()
    }
  },
}

export default EmployeeController
