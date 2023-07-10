import {object, string, date, array, number} from "yup";

const createEmployeeEmergencyContact = object({
    id:
        string()
        .required("Employee id is required"),
    fullname: 
        string()
        .min(5, "Minimum fullname length must be 5")
        .max(40, "Maximum fullname length must be 40")
        .required("Fullname is required!"),
    relationship: 
        string()
        .min(3, "Minimum relationship length must be 3")
        .max(25, "Maximum relationship length must be 25")
        .required("Relationship is required!"),
    phoneNumber:
        string()
        .length(12, "Phone number length must be 12 e.g 998991001020")
        .required("Phone number is required!"),
    workPhone:
        string(),
    email:
        string()
        .email("Email must have @")
        .min(10, "Minimum email length must be 10")
        .max(50, "Maximum email length must be 50")
        .required("Email is required!"),
    addressLine1:
        string()
        .min(10, "Minimum address line 1 length must be 10")
        .max(50, "Maximum address line 1 length must be 50")
        .required("Address line 1 is required!"),
    addressLine2:
        string(),
    notes:
        string(),
    contactType:
        string()
        .matches(/primary|secondary|least_important/i, "Contact type can be PRIMARY, SECONDARY, or LEAST_IMPORTANT")
        .required("Contact type is required")
})
const editEmployeeEmergencyContact = object({
    fullname: 
        string()
        .min(5, "Minimum fullname length must be 5")
        .max(40, "Maximum fullname length must be 40"),
    relationship: 
        string()
        .min(3, "Minimum relationship length must be 3")
        .max(25, "Maximum relationship length must be 25"),
    phoneNumber:
        string()
        .length(12, "Phone number length must be 12 e.g 998991001020"),
    workPhone:
        string(),
    email:
        string()
        .email("Email must have @")
        .min(10, "Minimum email length must be 10")
        .max(50, "Maximum email length must be 50"),
    addressLine1:
        string()
        .min(10, "Minimum address line 1 length must be 10")
        .max(50, "Maximum address line 1 length must be 50"),
    addressLine2:
        string(),
    notes:
        string(),
    contactType:
        string()
        .matches(/primary|secondary|least_important/i, "Contact type can be PRIMARY, SECONDARY, or LEAST_IMPORTANT")
});

const createEmployee = object({
    employeePhoto:
        string()
        .required("Employee photo is required"),
    firstname: 
        string()
        .min(2, "Minimum length of firstname must be 2")
        .max(30, "Maximum length of firstname must be 30")
        .required("Firstname is required"),
    lastname: 
        string()
        .min(2, "Minimum length of lastname must be 2")
        .max(30, "Maximum length of lastname must be 30")
        .required("Lastname is required"),
    phoneNumber: 
        string()
        .length(12, "Phone number length must be 12. eg. 998911001020")
        .required("Phone number is required"),
    email: 
        string()
        .email("Email must contain @")
        .min(10, "Minimum length of email must be 10")
        .max(50, "Maximum length of email must be 30")
        .required("Email is required"),
    role: 
        string()
        .matches(/team_member|driver|manager|area_coach/i, "Please choose one of the options")
        .required("Employee role is required"),
    gender:
        string()
        .matches(/male|female/i, "Choose MALE or FEMALE please")
        .required("Gender is required"),
    salary: 
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum salary amount must be 0")
        .max(15000, "Maximum salary amount must be 15000")
        .required("Salary is required"),
    city: 
        string()
        .min(2, "Minimum city length must be 2")
        .max(50, "Maximum city length must be 50")
        .required("City is required"),
    maritalStatus: 
        string()
        .matches(/single|married/i, "Marital status is required")
        .required("Marital status is required"),
    addressLine1: 
        string()
        .max(50, "Maximum length of address line 1 must be 50")
        .required("Address line 1 is required"),
    addressLine2:
        string()
        .max(50, "Maximum length of address line 2 must be 50"),
    
    birthDate: 
        date()
        .typeError("Please provide valid date")
        .required("Employee birthdate is required"),
    emergancyContacts: 
        array().of(createEmployeeEmergencyContact)
});
const editEmployee = object({
    firstname: 
        string()
        .min(2, "Minimum length of firstname must be 2")
        .max(30, "Maximum length of firstname must be 30"),
    lastname: 
        string()
        .min(2, "Minimum length of lastname must be 2")
        .max(30, "Maximum length of lastname must be 30"),
    phoneNumber: 
        string()
        .length(12, "Phone number length must be 12. eg. 998911001020"),
    email: 
        string()
        .email("Email must contain @")
        .min(10, "Minimum length of email must be 10")
        .max(50, "Maximum length of email must be 30"),
    role: 
        string()
        .matches(/team_member|driver|manager|area_coach/i, "Please choose one of the options"),
    gender:
        string()
        .matches(/male|female/i, "Choose MALE or FEMALE please"),
    salary: 
        number()
        .typeError("Please provide a value")
        .min(0, "Minimum salary amount must be 0")
        .max(15000, "Maximum salary amount must be 15000"),
    city: 
        string()
        .min(2, "Minimum city length must be 2")
        .max(50, "Maximum city length must be 50"),
    maritalStatus: 
        string()
        .matches(/single|married/i, "Marital status is required"), 
    addressLine1: 
        string()
        .max(50, "Maximum length of address line 1 must be 50"),
    addressLine2:
        string()
        .max(50, "Maximum length of address line 2 must be 50"),
    birthDate: 
        date(),
    emergancyContacts: 
        array()
        .of(editEmployeeEmergencyContact)
});


const createEmployeeNote = object({
    note:
        string()
        .min(25, "Minimum note length must be 25")
        .max(250, "Maximum note length must be 250")
        .required("Note is required!"),
    date:
        date()
        .typeError("Please provide a value")
        .required("Date is required"),
    employeeId:
        string()
        .required("Employee is required") 

});
const editEmployeeNote = object({
    note:
        string()
        .min(25, "Minimum note length must be 25")
        .max(250, "Maximum note length must be 250"),
    date:
        date()
        .typeError("Please provide a value"),
    employeeId:
        string()
})

const createEmployeeLeaveDay = object({
    from: 
        date()
        .typeError("Please provide a value")
        .required("From date is required!"),
    to: 
        date()
        .typeError("Please provide a value")
        .required("To date is required!"),
    reason:
        string()
        .min(5, "Minimum reason length must be 5")
        .max(30, "Maximum reason length must be 30")
        .required("Reason is required!"),
    leaveType: 
        string()
        .matches(/casual_leave|hospitalization|lop|paternity_leave|medical_leave|family|other/i, "Please choose one of the options")
        .required("Leave type is required!"),
    employeeId:
        string()
        .required("Employee is required")  
})
const editEmployeeLeaveDay = object({
    from: 
        date()
        .typeError("Please provide a value"),
    to: 
        date()
        .typeError("Please provide a value"),
    reason:
        string()
        .min(5, "Minimum reason length must be 5")
        .max(30, "Maximum reason length must be 30"),
    leaveType: 
        string()
        .matches(/casual_leave|hospitalization|lop|paternity_leave|medical_leave|family|other/i, "Please choose one of the options"),
    employeeId:
        string()
})

export {
    createEmployee,
    editEmployee,
    createEmployeeEmergencyContact,
    editEmployeeEmergencyContact,
    createEmployeeLeaveDay,
    editEmployeeLeaveDay,
    createEmployeeNote,
    editEmployeeNote,
}