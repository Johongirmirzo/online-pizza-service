import path from "path";
import fs from "fs";
import {v4 as uuid} from "uuid";
import { prisma } from "../../config/prisma";
import cloudinary, { options } from "../../config/cloudinary";
import { IEmployee, IEmployeeData, IEmergencyContact } from "../../types/employee"
import { MarriageStatus, ApplicantRole } from "../../types/applicant"

const EmployeeService = {
    async getAllEmployees() {
        return await prisma.employee.findMany({orderBy: [{created: "desc"}]});
    },
    async getEmployee(id: number) {
        const employee = await prisma.employee.findUnique({ where: { id } });
        return !employee ? { error: "User has not been found!", statusCode: 404, employee: null } : { error: "", statusCode: 200, employee }
    },
    async createEmployee(data: IEmployee, file: any) {
        try {
            let emergancyContacts;
            const employee = await prisma.employee.findFirst({
                where: {
                    OR: [
                        { phoneNumber: data.phoneNumber },
                        { email: data.email },
                    ]
                }
            });
            if (!employee) {
                console.log(emergancyContacts)
                if(data?.emergancyContacts){
                    emergancyContacts = JSON.parse(data.emergancyContacts); 
                }
                 
                const employeePhoto = await cloudinary.v2.uploader.upload(file.path, options);
                const newEmployee = await prisma.employee.create({
                    data: {
                        ...data,
                        role: ApplicantRole[data.role],
                        maritalStatus: MarriageStatus[data.maritalStatus],
                        photo: employeePhoto.secure_url,
                        photo_id: employeePhoto.public_id,
                        birthDate: new Date(data.birthDate),
                        salary: Number(data.salary),
                        leaveAmount: 0,
                        emergancyContacts: emergancyContacts ? emergancyContacts : [],
                    }
                });
                return { newEmployee, statusCode: 201, error: "" }
            } else {
                return { newEmployee: null, statusCode: 400, error: `Employee with phone number: [${data.phoneNumber}] or email: [${data.email}] already exists!` }
            }
        } catch (err: any) {
            console.log(err)
            return { newEmployee: null, statusCode: 400, error: "Bad Request!" }
        }
    },
    async editEmployee(id: number, employeeData: any, file: any) {
        try {
            const employee = await prisma.employee.findUnique({ where: { id } });
            const employeeWithGivenData = await prisma.employee.findFirst({
                where: {
                    OR: [
                        {email: employeeData?.email},
                        {phoneNumber: employeeData?.phoneNumber},
                    ]
                }
            });
            if(!employee){
                if(file){
                    fs.rmSync(path.join(__dirname, `../../assets/images/${file.fileName}`))
                }
                return {statusCode: 404, error: "Employee's not been found!"}
            } else {
                if(employeeWithGivenData){
                    if(employee.id !== employeeWithGivenData.id && (
                       employeeData?.email === employeeWithGivenData.email ||
                       employeeData?.phoneNumber === employeeWithGivenData.phoneNumber                        
                    )) {
                        return {statusCode: 409, error: `Employee with email: [${employee.email}] or phone: ${ employee.phoneNumber} already exists!`}
                    }
                }
                const employeeParsedData = {
                    birthDate: employeeData?.birthDate ? new Date(employeeData?.birthDate) : employee.birthDate,
                    salary: employeeData?.salary ? Number(employeeData?.salary) : employee.salary,
                    emergancyContacts: employeeData?.emergancyContacts ? JSON.parse(employeeData?.emergancyContacts) : employee.emergancyContacts
                }
                console.log(employeeData)
    
                const imageSplit = employee?.photo.split("/") as [];
                const imgPath = imageSplit[imageSplit.length - 1] as string
                

                if (file) {
                    fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`))
                    await cloudinary.v2.uploader.destroy(employee.photo_id);
                    const newPhoto = await cloudinary.v2.uploader.upload(file.path, options);
                     
                    await prisma.employee.update({
                        where: { id },
                        data: {
                            ...employeeData,
                            photo: newPhoto.secure_url,
                            photo_id: newPhoto.public_id,
                            ...employeeParsedData,
                            updated: new Date()
                        }
                    })
    
                        return { statusCode: 200, error: "" }
                } else {
                    await prisma.employee.update({
                        where: { id },
                        data: {
                            ...employeeData,
                           ...employeeParsedData,
                           updated: new Date()
                        }
                    })
                    return { statusCode: 200, error: "" }
                }
            }
        } catch (err: any) {
            console.log(err)
            if(file){
                fs.rmSync(path.join(__dirname, `../../assets/images/${file.fileName}`))
            }
            return { statusCode: 400, error: "Bad Request!" }
        }
    },
    async deleteEmployee(id: number) {
        try {
            const employee = await prisma.employee.findUnique({ where: { id } });
            if (!employee) {
                return { statusCode: 404, error: "Employee has not been found!" }
            } else {
                const imageSplit = employee.photo.split("/") as [];
                const imgPath = imageSplit[imageSplit.length - 1] as string
                
                fs.rmSync(path.join(__dirname, `../../assets/images/${imgPath}`));

                await cloudinary.v2.uploader.destroy(employee.photo_id)
                await prisma.employee.delete({ where: { id } });
                return { statusCode: 204, error: "" }
            }
        } catch(err){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },

    async getAllEmergencyContacts(id: number) {
        try {
            const employee = await prisma.employee.findUnique({where: {id}});
            if(!employee) {
                return {emergencyContacts: null, statusCode: 404, error: "Employee has not been found"}
            } else {
                return {emergencyContacts: employee.emergancyContacts, statusCode: 200, error: ""}
            }
        }catch(err: any){
            return {emergencyContacts: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async createEmergencyContact(id: number, emergencyData: IEmergencyContact) {
        try {
            const employee = await prisma.employee.findUnique({
                where: {id}, 
                select: {
                    emergancyContacts: true
                }});
                console.log(employee)
                if(!employee) {
                    return {newEmergencyContact: null, statusCode: 404, error: "Employee has not been found"}
                } else {
                    if(employee.emergancyContacts.length > 3){
                        return {newEmergencyContact: null, statusCode: 400, error: "Maximum number of emergency contacts are 4"}
                    } else {
                        const newEmergencyContact = await prisma.employee.update({
                            where: {id},
                            data: {
                                emergancyContacts: [...employee.emergancyContacts, {...emergencyData, id: uuid(), notes: "", addressLine2: "", created: `${new Date()}`, updated: `${new Date()}`}]
                            }
                        })
                        return {newEmergencyContact: newEmergencyContact.emergancyContacts[newEmergencyContact.emergancyContacts.length - 1], statusCode: 201, error: ""}
                    }
                }
        }catch(err: any){
            return {newEmergencyContact: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async editEmergencyContact(employeeId: number, emergencyContactId: string, emergencyData: IEmergencyContact) {
        try {
            const employee = await prisma.employee.findUnique({
                where: {id: employeeId}, 
                select: {
                    emergancyContacts: true
            }});
            if(!employee) {
                return {statusCode: 404, error: "Employee has not been found"}
            } else {
                employee.emergancyContacts = employee.emergancyContacts.map((ec: any) => ec.id === emergencyContactId ? {...ec, ...emergencyData}: ec)
                await prisma.employee.update({
                    where: {id: employeeId},
                    data: {
                        emergancyContacts: employee.emergancyContacts
                    }
                })
                return {statusCode: 200, error: "Emergency contact is updated successfully!"}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }   
    },
    async deleteEmergencyContact(employeeId: number, emergencyContactId: string) {
        try {
            const employee = await prisma.employee.findUnique({
                where: {id: employeeId}, 
                select: {
                    emergancyContacts: true
            }});
            if(!employee) {
                return {statusCode: 404, error: "Employee has not been found"}
            } else {
                const emergencyContactIndex = employee.emergancyContacts.findIndex((e: any) => e.id === emergencyContactId);
                if(emergencyContactIndex < 0){
                    return {statusCode: 404, error: `Emergency contact with the id: [${emergencyContactId}] does not exist!`}
                }
                employee.emergancyContacts.splice(emergencyContactIndex, 1);
                await prisma.employee.update({
                    where: {id: employeeId},
                    data: {
                        emergancyContacts: employee.emergancyContacts
                    }
                })
                return {statusCode: 204, error: ""}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },

    async getAllEmployeeNotes() {
        return await prisma.employee.findMany({select: {id: true, firstname: true, lastname: true, employeeNotes: true}});
    },
    async getEmployeeNote(employeeId: number){
        try {
            const employee = await prisma.employee.findUnique({where: {id: employeeId}, select: {employeeNotes: true}});
            return employee ? {employeeNote: employee, statusCode: 200, error: ""} : {employeeNote: null, statusCode: 404, error: "Employee's not been found!"};
        }catch(err){
            return {employeeNote: null, statusCode: 400, error: "Bad Request!"}
        }   
    },
    async createEmployeeNote(employeeId: number, employeeNoteData: any) {
        try {
            const employee = await prisma.employee.findUnique({
                where: {id: employeeId}, 
                select: {
                    employeeNotes: true
                }});
                console.log(employee)
                if(!employee) {
                    return {newEmployeeNote: null, statusCode: 404, error: "Employee has not been found"}
                } else {
                    const newEmployeeNote = await prisma.employee.update({
                        where: {id: employeeId},
                        data: {
                            employeeNotes: [...employee.employeeNotes, {id: uuid(), ...employeeNoteData}]
                        }
                    })
                    return {newEmployeeNote: newEmployeeNote.employeeNotes[newEmployeeNote.employeeNotes.length - 1], statusCode: 201, error: ""}
                }
        }catch(err: any){
            return {newEmployeeNote: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async editEmployeeNote(noteId: string, employeeId: number, employeeNoteData: any) {
        try {
            const employee = await prisma.employee.findUnique({
                where: {id: employeeId}, 
                select: {
                    employeeNotes: true
            }});
            if(!employee) {
                return {statusCode: 404, error: "Employee has not been found"}
            } else {
                employee.employeeNotes = employee.employeeNotes.map((ec: any) => ec.id === noteId ? {...ec, ...employeeNoteData}: ec)
                await prisma.employee.update({
                    where: {id: employeeId},
                    data: {
                        employeeNotes: employee.employeeNotes
                    }
                })
                return {statusCode: 200, error: "Emergency contact is updated successfully!"}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }   
    },
    async deleteEmployeeNote(noteId: string, employeeId: number) {
        try {
            console.log({noteId, employeeId})
            
            const employee = await prisma.employee.findUnique({
                where: {id: employeeId}, 
                select: {
                    employeeNotes: true
            }});
            console.log("Employee", employee)
            if(!employee) {
                return {statusCode: 404, error: "Employee has not been found"}
            } else {
                const emergencyContactIndex = employee?.employeeNotes.findIndex((e: any) => e.id === noteId);
                if(emergencyContactIndex < 0){
                    return {statusCode: 404, error: `Employee note with the id: [${noteId}] does not exist!`}
                }
                employee?.employeeNotes.splice(emergencyContactIndex, 1);
                await prisma.employee.update({
                    where: {id: employeeId},
                    data: {
                        employeeNotes: employee?.employeeNotes
                    }
                })
                return {statusCode: 204, error: ""}
            }
        }catch(err: any){
            console.log("Delete note errrzz", err)
            return {statusCode: 400, error: "Bad Request!"}
        }
    },

    async getAllEmployeeLeaveDays() {
        return await prisma.employee.findMany({select: {id: true, firstname: true, lastname: true, leaveDays: true}});
    },
    async getEmployeeLeaveDay(leaveDayId: string, employeeId: number) {
        try {
            const employee = await prisma.employee.findUnique({where: {id: employeeId}, select: {leaveDays: true}});
            if(!employee) {
                return {employeeLeaveDays: null, statusCode: 404, error: "Employee has not been found"}
            } else {
                const leaveDay = employee.leaveDays.find((leaveDay: any)=> leaveDay.id === leaveDayId);

                return {employeeLeaveDays: leaveDay, statusCode: 200, error: ""}
            }
        }catch(err: any){
            return {employeeLeaveDays: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async createEmployeeLeaveDay(employeeId: number, leaveDayData: any) {
        try {
            const employee = await prisma.employee.findUnique({where: {id: employeeId}})
            if(!employee) {
                return {newEmployeeNote: null, statusCode: 404, error: "Employee has not been found"}
            } else {
                
                const newEmployeeNote = await prisma.employee.update({
                    where: {id: employeeId},
                    data: {
                        leaveDays: [...employee.leaveDays, {id: uuid(), ...leaveDayData, status: "NEW"}]                        
                    }
                })
                return {newEmployeeLeaveDay: newEmployeeNote.leaveDays[newEmployeeNote.leaveDays.length - 1], statusCode: 201, error: ""}
            }
        }catch(err: any){
            return {newEmployeeNote: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async editEmployeeLeaveDay(employeeLeaveDayId: string, employeeId: number, employeeLeaveDayData: any) {
        try {
            const employee = await prisma.employee.findUnique({where: {id: employeeId}})
            if(!employee) {
                return {newEmployeeNote: null, statusCode: 404, error: "Employee has not been found"}
            } else {                
                
                employee.leaveDays = employee.leaveDays.map((ec: any) => ec.id === employeeLeaveDayId ? {...ec, ...employeeLeaveDayData}: ec)
                await prisma.employee.update({
                    where: {id: employeeId},
                    data: {
                        leaveDays: employee.leaveDays
                    }
                })
                return {statusCode: 200, error: ""}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }   
    },
    async changeEmployeeLeaveDayStatus(leaveDayId: string, employeeId: number, status: string) {
        try {
            const employee = await prisma.employee.findUnique({where: {id: employeeId}});
            if(!employee) {
                return {statusCode: 404, error: "Employee has not been found"}
            } else {
                employee.leaveDays = employee.leaveDays.map((leaveDay: any) => leaveDay.id === leaveDayId ? {...leaveDay, status} : leaveDay);
                await prisma.employee.update({
                    where: {id: employeeId},
                    data: {
                        leaveDays: employee.leaveDays
                    }
                })
                return {statusCode: 200, error: ""}
            }
        }catch(err: any){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },
    async deleteEmployeeLeaveDay(leaveDayId: string, employeeId: number){
        try {
            const employee = await prisma.employee.findUnique({where: {id: employeeId}});
            if(!employee){
                return {statusCode: 404, error: "Employee leave day's not been found"}
            } else {
                const leaveDayIndex = employee.leaveDays.findIndex((leaveDay: any) => leaveDay.id === leaveDayId);
                
                if(leaveDayIndex !== -1){
                    employee.leaveDays.splice(leaveDayIndex, 1);
                    await prisma.employee.update({
                        where: {id: employeeId},
                        data: {
                                leaveDays: employee.leaveDays
                            }
                        })
                    return {statusCode: 204, error: ""}
                } else {
                    return {statusCode: 400, error: "Employee leave day does not exist!"};
                }
            }
        }catch(err){
            return {statusCode: 400, error: "Bad Request!"}
        }
    }
}

export default EmployeeService;