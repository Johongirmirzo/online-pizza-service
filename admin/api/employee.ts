import {API} from "./index";
import {ENDPOINTS} from "~/config/endpoints";
import {IEmployeeLeaveDayFormData, IEmployeeNoteFormData} from "~/types/employee"

const getAllEmployees = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_EMPLOYEES);
}
const getEmployee = async (employeeId: string)=>{
    return await API.get(`${ENDPOINTS.GET_EMPLOYEE}/${employeeId}`);
}
const createEmployee = async (employeeData: any)=>{
    return await API.post(ENDPOINTS.CREATE_EMPLOYEE, employeeData)
}
const editEmployee = async (employeeId: string, employeeData: any)=>{
    return await API.patch(`${ENDPOINTS.EDIT_EMPLOYEE}/${employeeId}`, employeeData)
}
const deleteEmployee = async (employeeId: string)=>{
    return await API.delete(`${ENDPOINTS.DELETE_EMPLOYEE}/${employeeId}`)
}

const getAllEmployeeNotes = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_EMPLOYEE_NOTES)
}
const getEmployeeNote = async (employeeNoteId: string)=>{
    return await API.get(`${ENDPOINTS.GET_EMPLOYEE_NOTE}/${employeeNoteId}`)
}
const createEmployeeNote = async (employeeId: number, employeeNote: IEmployeeNoteFormData)=>{
    return await API.post(`${ENDPOINTS.CREATE_EMPLOYEE_NOTE}/${employeeId}`, employeeNote)
}
const editEmployeeNote = async (employeeNoteId: string, employeeId: number, employeeNote: IEmployeeNoteFormData)=>{
    return await API.patch(`${ENDPOINTS.EDIT_EMPLOYEE_NOTE}/${employeeNoteId}/${employeeId}`, employeeNote)
}
const deleteEmployeeNote = async (noteId: string, employeeId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_EMPLOYEE_NOTE}/${noteId}/${employeeId}`)
}

const getAllEmployeeLeaveDays = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_EMPLOYEE_LEAVE_DAYS)
};
const getEmployeeLeaveDay = async (leaveDayId: string, employeeId: string)=>{
    return await API.get(`${ENDPOINTS.GET_EMPLOYEE_LEAVE_DAY}/${leaveDayId}/${employeeId}`)
};
const createEmployeeLeaveDay = async (employeeId: number, leaveDayData: IEmployeeLeaveDayFormData)=>{
    return await API.post(`${ENDPOINTS.CREATE_EMPLOYEE_LEAVE_DAY}/${employeeId}`, leaveDayData)
};
const changeEmployeeLeaveStatus = async (leaveDayId: string, employeeId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_EMPLOYEE_LEAVE_STATUS}/${leaveDayId}/${employeeId}`, {status})
}
const editEmployeeLeaveDay = async (leaveDayId: string, employeeId: number, leaveDayData: IEmployeeLeaveDayFormData)=>{
    console.log({leaveDayId, employeeId})
    return await API.patch(`${ENDPOINTS.EDIT_EMPLOYEE_LEAVE_DAY}/${leaveDayId}/${employeeId}`, leaveDayData)
};
const deleteEmployeeLeaveDay = async (leaveDayId: string, employeeId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_EMPLOYEE_LEAVE_DAY}/${leaveDayId}/${employeeId}`)
};


export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    editEmployee,
    deleteEmployee,

    getAllEmployeeNotes,
    getEmployeeNote,
    createEmployeeNote,
    changeEmployeeLeaveStatus,
    editEmployeeNote,
    deleteEmployeeNote,

    getAllEmployeeLeaveDays,
    getEmployeeLeaveDay,
    createEmployeeLeaveDay,
    editEmployeeLeaveDay,
    deleteEmployeeLeaveDay,
}