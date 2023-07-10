import { IPhotoFile } from "./user";

interface IEmployeeFormData {
  employeePhoto: IPhotoFile;
  firstname: string;
  lastname: string;
  email: string;   
  phoneNumber: string;         
  salary: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  birthDate: string;  
  maritalStatus: MarriageStatus
  role: ApplicantRole;
  gender: Gender;
  emergancyContacts: IEmergencyContact[];
};

interface IEmployee extends IEmployeeFormData {
  id: number;
}

interface IEmergencyContact {
  fullname: string;
  relationship: string;
  phoneNumber: string;
  workPhone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  notes: string;
  contactType: string;
}

interface IEmployeeLeaveDayFormData {
  leaveType: EmployeeLeaveType;
  from: string;
  to: string;
  numberOfDays: string;
  reason: string;
  employeeId: number;
  
}
interface IEmployeeLeaveDay extends IEmployeeLeaveDayFormData {
  id: string;
  fullname: string;
  status: EmployeeLeaveStatus;
}

interface IEmployeeNoteFormData {
  date: string;
  note: string;
  employeeId: number;
}
interface IEmployeeNote extends IEmployeeNoteFormData {
  id: number;
}

interface INote {
  noteId: string;
  fullname: string;
  date: string;
  note: string;
  employeeId: number;
}

enum ApplicantRole {
    TEAM_MEMBER="TEAM_MEMBER",
    DRIVER="DRIVER",
    MANAGER="MANAGER",
    AREA_COACH="AREA_COACH",
  }
enum MarriageStatus {
    MARRIED="MARRIED",
    SINGLE="SINGLE",
}
enum Gender {
  MALE="MALE",
  FEMALE="FEMALE",
}

enum EmployeeLeaveType {
  CASUAL_LEAVE="CASUAL_LEAVE",
  HOSPITALIZATION="HOSPITALIZATION",
  LOP="LOP",
  PATERNITY_LEAVE="PATERNITY_LEAVE",
  MEDICAL_LEAVE="MEDICAL_LEAVE",
  FAMILY="FAMILY",
}

enum EmployeeLeaveStatus {
  NEW="NEW",
  APPROVED="APPROVED",
  DECLINED="DECLINED",
}

export {
    IEmployee,
    IEmployeeFormData,
    IEmergencyContact,
    IEmployeeLeaveDay,
    IEmployeeNote,
    IEmployeeNoteFormData,
    IEmployeeLeaveDayFormData,
    INote,
    ApplicantRole,
    MarriageStatus,
    EmployeeLeaveStatus,
    Gender
}