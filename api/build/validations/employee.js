"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeEmergencyContact = exports.editEmployeeEmergencyContact = exports.employeeEditLeaveDay = exports.employeeLeaveDay = exports.employeeEditNote = exports.employeeNote = void 0;
const yup_1 = require("yup");
const employeeEmergencyContact = (0, yup_1.object)({
    fullname: (0, yup_1.string)()
        .min(5, "Minimum fullname length must be 5")
        .max(40, "Maximum fullname length must be 40")
        .required("Fullname is required!"),
    relationship: (0, yup_1.string)()
        .min(3, "Minimum relationship length must be 3")
        .max(25, "Maximum relationship length must be 25")
        .required("Relationship is required!"),
    phoneNumber: (0, yup_1.string)()
        .length(12, "Phone number length must be 12 e.g 998991001020")
        .required("Phone number is required!"),
    workPhone: (0, yup_1.string)()
        .length(12, "Phone number length must be 12 e.g 998991001020"),
    email: (0, yup_1.string)()
        .email("Email must have @")
        .min(10, "Minimum name length must be 10")
        .max(50, "Maximum name length must be 50")
        .required("Email is required!"),
    addressLine1: (0, yup_1.string)()
        .min(10, "Minimum address line 1 length must be 10")
        .max(50, "Maximum address line 1 length must be 50")
        .required("Address line 1 is required!"),
    addressLine2: (0, yup_1.string)()
        .min(10, "Minimum address line 2 length must be 10")
        .max(50, "Maximum address line 2 length must be 50"),
    notes: (0, yup_1.string)()
        .min(5, "Minimum note length must be 5")
        .max(500, "Maximum note length must be 500"),
    contactType: (0, yup_1.string)()
        .matches(/primary|secondary|least_important/i, "Contact type can be PRIMARY, SECONDARY, or LEAST_IMPORTANT")
        .required("Contact type is required")
});
exports.employeeEmergencyContact = employeeEmergencyContact;
const editEmployeeEmergencyContact = (0, yup_1.object)({
    fullname: (0, yup_1.string)()
        .min(5, "Minimum fullname length must be 5")
        .max(40, "Maximum fullname length must be 40"),
    relationship: (0, yup_1.string)()
        .min(3, "Minimum relationship length must be 3")
        .max(25, "Maximum relationship length must be 25"),
    phoneNumber: (0, yup_1.string)()
        .length(12, "Phone number length must be 12 e.g 998991001020"),
    workPhone: (0, yup_1.string)()
        .length(12, "Phone number length must be 12 e.g 998991001020"),
    email: (0, yup_1.string)()
        .email("Email must have @")
        .min(10, "Minimum name length must be 10")
        .max(50, "Maximum name length must be 50"),
    addressLine1: (0, yup_1.string)()
        .min(10, "Minimum address line 1 length must be 10")
        .max(50, "Maximum address line 1 length must be 50"),
    addressLine2: (0, yup_1.string)()
        .min(10, "Minimum address line 2 length must be 10")
        .max(50, "Maximum address line 2 length must be 50"),
    notes: (0, yup_1.string)()
        .min(5, "Minimum note length must be 5")
        .max(500, "Maximum note length must be 500"),
    contactType: (0, yup_1.string)()
        .matches(/primary|secondary|least_important/i, "Contact type can be PRIMARY, SECONDARY, or LEAST_IMPORTANT")
});
exports.editEmployeeEmergencyContact = editEmployeeEmergencyContact;
const employeeNote = (0, yup_1.object)({
    note: (0, yup_1.string)()
        .min(25, "Minimum note length must be 25")
        .max(250, "Maximum note length must be 250")
        .required("Note is required!"),
    date: (0, yup_1.date)()
        .required("Date is required"),
    employeeId: (0, yup_1.string)()
        .required("Employee is required")
});
exports.employeeNote = employeeNote;
const employeeEditNote = (0, yup_1.object)({
    note: (0, yup_1.string)()
        .min(25, "Minimum note length must be 25")
        .max(250, "Maximum note length must be 250"),
    date: (0, yup_1.date)(),
    employeeId: (0, yup_1.string)()
});
exports.employeeEditNote = employeeEditNote;
const employeeLeaveDay = (0, yup_1.object)({
    from: (0, yup_1.date)()
        .typeError("Please provide a value")
        .required("From date is required!"),
    to: (0, yup_1.date)()
        .typeError("Please provide a value")
        .required("To date is required!"),
    reason: (0, yup_1.string)()
        .min(5, "Minimum reason length must be 5")
        .max(30, "Maximum reason length must be 30")
        .required("Reason is required!"),
    leaveType: (0, yup_1.string)()
        .matches(/casual_leave|hospitalization|lop|paternity_leave|medical_leave|family|other/i, "Please choose one of the options")
        .required("Leave type is required!"),
    employeeId: (0, yup_1.string)()
        .required("Employee is required")
});
exports.employeeLeaveDay = employeeLeaveDay;
const employeeEditLeaveDay = (0, yup_1.object)({
    from: (0, yup_1.date)()
        .typeError("Please provide a value"),
    to: (0, yup_1.date)()
        .typeError("Please provide a value"),
    reason: (0, yup_1.string)()
        .min(5, "Minimum reason length must be 5")
        .max(30, "Maximum reason length must be 30"),
    leaveType: (0, yup_1.string)()
        .matches(/casual_leave|hospitalization|lop|paternity_leave|medical_leave|family|other/i, "Please choose one of the options"),
    // employeeId:
    //     string()
});
exports.employeeEditLeaveDay = employeeEditLeaveDay;
