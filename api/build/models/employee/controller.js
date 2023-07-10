"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const EmployeeController = {
    getAllEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employees = yield service_1.default.getAllEmployees();
            res.json({ data: employees });
        });
    },
    getEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { error, statusCode, employee } = yield service_1.default.getEmployee(id);
            if (statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: employee });
            }
        });
    },
    createEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newEmployee, error, statusCode } = yield service_1.default.createEmployee(req.body, req.file);
            if (error) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newEmployee });
            }
        });
    },
    editEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { error, statusCode } = yield service_1.default.editEmployee(id, req.body, req.file);
            if (statusCode === 404 || statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Employee is edited successfully!" });
            }
        });
    },
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { error, statusCode } = yield service_1.default.deleteEmployee(id);
            if (statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
    getAllEmergencyContacts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { emergencyContacts, statusCode, error } = yield service_1.default.getAllEmergencyContacts(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: emergencyContacts });
            }
        });
    },
    createEmergencyContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { newEmergencyContact, statusCode, error } = yield service_1.default.createEmergencyContact(id, req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newEmergencyContact });
            }
        });
    },
    editEmergencyContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, emergencyContactId } = req.params;
            const { statusCode, error } = yield service_1.default.editEmergencyContact(Number(id), emergencyContactId, req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Emergency contact is updated successfully!" });
            }
        });
    },
    deleteEmergencyContact(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, emergencyContactId } = req.params;
            const { statusCode, error } = yield service_1.default.deleteEmergencyContact(Number(id), emergencyContactId);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
    getAllEmployeeNotes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeNotes = yield service_1.default.getAllEmployeeNotes();
            res.json({ data: employeeNotes });
        });
    },
    getEmployeeNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { employeeNote, statusCode, error } = yield service_1.default.getEmployeeNote(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: employeeNote });
            }
        });
    },
    createEmployeeNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { newEmployeeNote, statusCode, error } = yield service_1.default.createEmployeeNote(id, req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newEmployeeNote });
            }
        });
    },
    editEmployeeNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { noteId, employeeId } = req.params;
            const { statusCode, error } = yield service_1.default.editEmployeeNote(noteId, Number(employeeId), req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Emergency contact is updated successfully!" });
            }
        });
    },
    deleteEmployeeNote(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { noteId, employeeId } = req.params;
            const { statusCode, error } = yield service_1.default.deleteEmployeeNote(noteId, Number(employeeId));
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
    getAllEmployeeLeaveDays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeLeaveDays = yield service_1.default.getAllEmployeeLeaveDays();
            res.json({ data: employeeLeaveDays });
        });
    },
    getEmployeeLeaveDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { leaveDayId, employeeId } = req.params;
            const { employeeLeaveDays, statusCode, error } = yield service_1.default.getEmployeeLeaveDay(leaveDayId, Number(employeeId));
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: employeeLeaveDays });
            }
        });
    },
    createEmployeeLeaveDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { newEmployeeLeaveDay, statusCode, error } = yield service_1.default.createEmployeeLeaveDay(id, req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newEmployeeLeaveDay });
            }
        });
    },
    changeEmployeeLeaveDayStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { leaveDayId, employeeId } = req.params;
            const { statusCode, error } = yield service_1.default.changeEmployeeLeaveDayStatus(leaveDayId, Number(employeeId), req.body.status);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: { message: "Employee status is changed successfully!" } });
            }
        });
    },
    editEmployeeLeaveDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { leaveDayId, employeeId } = req.params;
            console.log({ leaveDayId, employeeId });
            const { statusCode, error } = yield service_1.default.editEmployeeLeaveDay(leaveDayId, Number(employeeId), req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Employee leave day is updated successfully!" });
            }
        });
    },
    deleteEmployeeLeaveDay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { leaveDayId, employeeId } = req.params;
            console.log({ leaveDayId, employeeId });
            const { statusCode, error } = yield service_1.default.deleteEmployeeLeaveDay(leaveDayId, Number(employeeId));
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
};
exports.default = EmployeeController;
