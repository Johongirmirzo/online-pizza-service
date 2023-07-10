import { object, string, date, number } from "yup";

const employeeEmergencyContact = object({
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
        string()
        .length(12, "Phone number length must be 12 e.g 998991001020"),
    email:
        string()
        .email("Email must have @")
        .min(10, "Minimum name length must be 10")
        .max(50, "Maximum name length must be 50")
        .required("Email is required!"),
    addressLine1:
        string()
        .min(10, "Minimum address line 1 length must be 10")
        .max(50, "Maximum address line 1 length must be 50")
        .required("Address line 1 is required!"),
    addressLine2:
        string()
        .min(10, "Minimum address line 2 length must be 10")
        .max(50, "Maximum address line 2 length must be 50"),
    notes:
        string()
        .min(5, "Minimum note length must be 5")
        .max(500, "Maximum note length must be 500"),
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
        string()
        .length(12, "Phone number length must be 12 e.g 998991001020"),
    email:
        string()
        .email("Email must have @")
        .min(10, "Minimum name length must be 10")
        .max(50, "Maximum name length must be 50"),
    addressLine1:
        string()
        .min(10, "Minimum address line 1 length must be 10")
        .max(50, "Maximum address line 1 length must be 50"),
    addressLine2:
        string()
        .min(10, "Minimum address line 2 length must be 10")
        .max(50, "Maximum address line 2 length must be 50"),
    notes:
        string()
        .min(5, "Minimum note length must be 5")
        .max(500, "Maximum note length must be 500"),
    contactType:
        string()
        .matches(/primary|secondary|least_important/i, "Contact type can be PRIMARY, SECONDARY, or LEAST_IMPORTANT")
})

const employeeNote = object({
    note:
        string()
        .min(25, "Minimum note length must be 25")
        .max(250, "Maximum note length must be 250")
        .required("Note is required!"),
    date:
        date()
        .required("Date is required"),
    employeeId:
        string()
        .required("Employee is required")       
});
const employeeEditNote = object({
    note:
        string()
        .min(25, "Minimum note length must be 25")
        .max(250, "Maximum note length must be 250"),
    date:
        date(),
    employeeId:
        string()
})

const employeeLeaveDay = object({
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
const employeeEditLeaveDay = object({
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
    // employeeId:
    //     string()
})

export {
    employeeNote,
    employeeEditNote,
    employeeLeaveDay,
    employeeEditLeaveDay,
    editEmployeeEmergencyContact,
    employeeEmergencyContact
}