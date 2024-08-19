"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const prisma_1 = require("../../config/prisma");
const cloudinary_1 = __importStar(require("../../config/cloudinary"));
const applicant_1 = require("../../types/applicant");
const EmployeeService = {
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.employee.findMany({ orderBy: [{ created: 'desc' }] });
        });
    },
    getEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield prisma_1.prisma.employee.findUnique({ where: { id } });
            return !employee
                ? { error: 'User has not been found!', statusCode: 404, employee: null }
                : { error: '', statusCode: 200, employee };
        });
    },
    createEmployee(data, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let emergancyContacts;
                const employee = yield prisma_1.prisma.employee.findFirst({
                    where: {
                        OR: [{ phoneNumber: data.phoneNumber }, { email: data.email }],
                    },
                });
                if (!employee) {
                    console.log(emergancyContacts);
                    if (data === null || data === void 0 ? void 0 : data.emergancyContacts) {
                        emergancyContacts = JSON.parse(data.emergancyContacts);
                    }
                    const employeePhoto = yield cloudinary_1.default.v2.uploader.upload(file.path, cloudinary_1.options);
                    const newEmployee = yield prisma_1.prisma.employee.create({
                        data: Object.assign(Object.assign({}, data), { role: applicant_1.ApplicantRole[data.role], maritalStatus: applicant_1.MarriageStatus[data.maritalStatus], photo: employeePhoto.secure_url, photo_id: employeePhoto.public_id, birthDate: new Date(data.birthDate), salary: Number(data.salary), leaveAmount: 0, emergancyContacts: emergancyContacts ? emergancyContacts : [] }),
                    });
                    return { newEmployee, statusCode: 201, error: '' };
                }
                else {
                    return {
                        newEmployee: null,
                        statusCode: 400,
                        error: `Employee with phone number: [${data.phoneNumber}] or email: [${data.email}] already exists!`,
                    };
                }
            }
            catch (err) {
                console.log(err);
                return { newEmployee: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    editEmployee(id, employeeData, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({ where: { id } });
                const employeeWithGivenData = yield prisma_1.prisma.employee.findFirst({
                    where: {
                        OR: [
                            { email: employeeData === null || employeeData === void 0 ? void 0 : employeeData.email },
                            { phoneNumber: employeeData === null || employeeData === void 0 ? void 0 : employeeData.phoneNumber },
                        ],
                    },
                });
                if (!employee) {
                    if (file) {
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${file.fileName}`));
                    }
                    return { statusCode: 404, error: "Employee's not been found!" };
                }
                else {
                    if (employeeWithGivenData) {
                        if (employee.id !== employeeWithGivenData.id &&
                            ((employeeData === null || employeeData === void 0 ? void 0 : employeeData.email) === employeeWithGivenData.email ||
                                (employeeData === null || employeeData === void 0 ? void 0 : employeeData.phoneNumber) === employeeWithGivenData.phoneNumber)) {
                            return {
                                statusCode: 409,
                                error: `Employee with email: [${employee.email}] or phone: ${employee.phoneNumber} already exists!`,
                            };
                        }
                    }
                    const employeeParsedData = {
                        birthDate: (employeeData === null || employeeData === void 0 ? void 0 : employeeData.birthDate)
                            ? new Date(employeeData === null || employeeData === void 0 ? void 0 : employeeData.birthDate)
                            : employee.birthDate,
                        salary: (employeeData === null || employeeData === void 0 ? void 0 : employeeData.salary)
                            ? Number(employeeData === null || employeeData === void 0 ? void 0 : employeeData.salary)
                            : employee.salary,
                        emergancyContacts: (employeeData === null || employeeData === void 0 ? void 0 : employeeData.emergancyContacts)
                            ? JSON.parse(employeeData === null || employeeData === void 0 ? void 0 : employeeData.emergancyContacts)
                            : employee.emergancyContacts,
                    };
                    console.log(employeeData);
                    const imageSplit = employee === null || employee === void 0 ? void 0 : employee.photo.split('/');
                    const imgPath = imageSplit[imageSplit.length - 1];
                    if (file) {
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(employee.photo_id);
                        const newPhoto = yield cloudinary_1.default.v2.uploader.upload(file.path, cloudinary_1.options);
                        yield prisma_1.prisma.employee.update({
                            where: { id },
                            data: Object.assign(Object.assign(Object.assign(Object.assign({}, employeeData), { photo: newPhoto.secure_url, photo_id: newPhoto.public_id }), employeeParsedData), { updated: new Date() }),
                        });
                        return { statusCode: 200, error: '' };
                    }
                    else {
                        yield prisma_1.prisma.employee.update({
                            where: { id },
                            data: Object.assign(Object.assign(Object.assign({}, employeeData), employeeParsedData), { updated: new Date() }),
                        });
                        return { statusCode: 200, error: '' };
                    }
                }
            }
            catch (err) {
                console.log(err);
                if (file) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${file.fileName}`));
                }
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({ where: { id } });
                if (!employee) {
                    return { statusCode: 404, error: 'Employee has not been found!' };
                }
                else {
                    const imageSplit = employee.photo.split('/');
                    const imgPath = imageSplit[imageSplit.length - 1];
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                    yield cloudinary_1.default.v2.uploader.destroy(employee.photo_id);
                    yield prisma_1.prisma.employee.delete({ where: { id } });
                    return { statusCode: 204, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    getAllEmergencyContacts(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({ where: { id } });
                if (!employee) {
                    return {
                        emergencyContacts: null,
                        statusCode: 404,
                        error: 'Employee has not been found',
                    };
                }
                else {
                    return {
                        emergencyContacts: employee.emergancyContacts,
                        statusCode: 200,
                        error: '',
                    };
                }
            }
            catch (err) {
                return { emergencyContacts: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    createEmergencyContact(id, emergencyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id },
                    select: {
                        emergancyContacts: true,
                    },
                });
                console.log(employee);
                if (!employee) {
                    return {
                        newEmergencyContact: null,
                        statusCode: 404,
                        error: 'Employee has not been found',
                    };
                }
                else {
                    if (employee.emergancyContacts.length > 3) {
                        return {
                            newEmergencyContact: null,
                            statusCode: 400,
                            error: 'Maximum number of emergency contacts are 4',
                        };
                    }
                    else {
                        const newEmergencyContact = yield prisma_1.prisma.employee.update({
                            where: { id },
                            data: {
                                emergancyContacts: [
                                    ...employee.emergancyContacts,
                                    Object.assign(Object.assign({}, emergencyData), { id: (0, uuid_1.v4)(), notes: '', addressLine2: '', created: `${new Date()}`, updated: `${new Date()}` }),
                                ],
                            },
                        });
                        return {
                            newEmergencyContact: newEmergencyContact.emergancyContacts[newEmergencyContact.emergancyContacts.length - 1],
                            statusCode: 201,
                            error: '',
                        };
                    }
                }
            }
            catch (err) {
                return {
                    newEmergencyContact: null,
                    statusCode: 400,
                    error: 'Bad Request!',
                };
            }
        });
    },
    editEmergencyContact(employeeId, emergencyContactId, emergencyData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                    select: {
                        emergancyContacts: true,
                    },
                });
                if (!employee) {
                    return { statusCode: 404, error: 'Employee has not been found' };
                }
                else {
                    employee.emergancyContacts = employee.emergancyContacts.map((ec) => ec.id === emergencyContactId ? Object.assign(Object.assign({}, ec), emergencyData) : ec);
                    yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            emergancyContacts: employee.emergancyContacts,
                        },
                    });
                    return {
                        statusCode: 200,
                        error: 'Emergency contact is updated successfully!',
                    };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    deleteEmergencyContact(employeeId, emergencyContactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                    select: {
                        emergancyContacts: true,
                    },
                });
                if (!employee) {
                    return { statusCode: 404, error: 'Employee has not been found' };
                }
                else {
                    const emergencyContactIndex = employee.emergancyContacts.findIndex((e) => e.id === emergencyContactId);
                    if (emergencyContactIndex < 0) {
                        return {
                            statusCode: 404,
                            error: `Emergency contact with the id: [${emergencyContactId}] does not exist!`,
                        };
                    }
                    employee.emergancyContacts.splice(emergencyContactIndex, 1);
                    yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            emergancyContacts: employee.emergancyContacts,
                        },
                    });
                    return { statusCode: 204, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    getAllEmployeeNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.employee.findMany({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    employeeNotes: true,
                },
            });
        });
    },
    getEmployeeNote(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                    select: { employeeNotes: true },
                });
                return employee
                    ? { employeeNote: employee, statusCode: 200, error: '' }
                    : {
                        employeeNote: null,
                        statusCode: 404,
                        error: "Employee's not been found!",
                    };
            }
            catch (err) {
                return { employeeNote: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    createEmployeeNote(employeeId, employeeNoteData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                    select: {
                        employeeNotes: true,
                    },
                });
                console.log(employee);
                if (!employee) {
                    return {
                        newEmployeeNote: null,
                        statusCode: 404,
                        error: 'Employee has not been found',
                    };
                }
                else {
                    const newEmployeeNote = yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            employeeNotes: [
                                ...employee.employeeNotes,
                                Object.assign({ id: (0, uuid_1.v4)() }, employeeNoteData),
                            ],
                        },
                    });
                    return {
                        newEmployeeNote: newEmployeeNote.employeeNotes[newEmployeeNote.employeeNotes.length - 1],
                        statusCode: 201,
                        error: '',
                    };
                }
            }
            catch (err) {
                return { newEmployeeNote: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    editEmployeeNote(noteId, employeeId, employeeNoteData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                    select: {
                        employeeNotes: true,
                    },
                });
                if (!employee) {
                    return { statusCode: 404, error: 'Employee has not been found' };
                }
                else {
                    employee.employeeNotes = employee.employeeNotes.map((ec) => ec.id === noteId ? Object.assign(Object.assign({}, ec), employeeNoteData) : ec);
                    yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            employeeNotes: employee.employeeNotes,
                        },
                    });
                    return {
                        statusCode: 200,
                        error: 'Emergency contact is updated successfully!',
                    };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    deleteEmployeeNote(noteId, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log({ noteId, employeeId });
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                    select: {
                        employeeNotes: true,
                    },
                });
                console.log('Employee', employee);
                if (!employee) {
                    return { statusCode: 404, error: 'Employee has not been found' };
                }
                else {
                    const emergencyContactIndex = employee === null || employee === void 0 ? void 0 : employee.employeeNotes.findIndex((e) => e.id === noteId);
                    if (emergencyContactIndex < 0) {
                        return {
                            statusCode: 404,
                            error: `Employee note with the id: [${noteId}] does not exist!`,
                        };
                    }
                    employee === null || employee === void 0 ? void 0 : employee.employeeNotes.splice(emergencyContactIndex, 1);
                    yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            employeeNotes: employee === null || employee === void 0 ? void 0 : employee.employeeNotes,
                        },
                    });
                    return { statusCode: 204, error: '' };
                }
            }
            catch (err) {
                console.log('Delete note errrzz', err);
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    getAllEmployeeLeaveDays() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.employee.findMany({
                select: { id: true, firstname: true, lastname: true, leaveDays: true },
            });
        });
    },
    getEmployeeLeaveDay(leaveDayId, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                    select: { leaveDays: true },
                });
                if (!employee) {
                    return {
                        employeeLeaveDays: null,
                        statusCode: 404,
                        error: 'Employee has not been found',
                    };
                }
                else {
                    const leaveDay = employee.leaveDays.find((leaveDay) => leaveDay.id === leaveDayId);
                    return { employeeLeaveDays: leaveDay, statusCode: 200, error: '' };
                }
            }
            catch (err) {
                return { employeeLeaveDays: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    createEmployeeLeaveDay(employeeId, leaveDayData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                });
                if (!employee) {
                    return {
                        newEmployeeNote: null,
                        statusCode: 404,
                        error: 'Employee has not been found',
                    };
                }
                else {
                    const newEmployeeNote = yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            leaveDays: [
                                ...employee.leaveDays,
                                Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, leaveDayData), { status: 'NEW' }),
                            ],
                        },
                    });
                    return {
                        newEmployeeLeaveDay: newEmployeeNote.leaveDays[newEmployeeNote.leaveDays.length - 1],
                        statusCode: 201,
                        error: '',
                    };
                }
            }
            catch (err) {
                return { newEmployeeNote: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    editEmployeeLeaveDay(employeeLeaveDayId, employeeId, employeeLeaveDayData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                });
                if (!employee) {
                    return {
                        newEmployeeNote: null,
                        statusCode: 404,
                        error: 'Employee has not been found',
                    };
                }
                else {
                    employee.leaveDays = employee.leaveDays.map((ec) => ec.id === employeeLeaveDayId ? Object.assign(Object.assign({}, ec), employeeLeaveDayData) : ec);
                    yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            leaveDays: employee.leaveDays,
                        },
                    });
                    return { statusCode: 200, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    changeEmployeeLeaveDayStatus(leaveDayId, employeeId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                });
                if (!employee) {
                    return { statusCode: 404, error: 'Employee has not been found' };
                }
                else {
                    employee.leaveDays = employee.leaveDays.map((leaveDay) => leaveDay.id === leaveDayId ? Object.assign(Object.assign({}, leaveDay), { status }) : leaveDay);
                    yield prisma_1.prisma.employee.update({
                        where: { id: employeeId },
                        data: {
                            leaveDays: employee.leaveDays,
                        },
                    });
                    return { statusCode: 200, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    deleteEmployeeLeaveDay(leaveDayId, employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield prisma_1.prisma.employee.findUnique({
                    where: { id: employeeId },
                });
                if (!employee) {
                    return { statusCode: 404, error: "Employee leave day's not been found" };
                }
                else {
                    const leaveDayIndex = employee.leaveDays.findIndex((leaveDay) => leaveDay.id === leaveDayId);
                    if (leaveDayIndex !== -1) {
                        employee.leaveDays.splice(leaveDayIndex, 1);
                        yield prisma_1.prisma.employee.update({
                            where: { id: employeeId },
                            data: {
                                leaveDays: employee.leaveDays,
                            },
                        });
                        return { statusCode: 204, error: '' };
                    }
                    else {
                        return {
                            statusCode: 400,
                            error: 'Employee leave day does not exist!',
                        };
                    }
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
};
exports.default = EmployeeService;
