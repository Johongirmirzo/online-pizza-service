import { MarriageStatus, ApplicantRole } from "./applicant";

export interface IEmployee {
  firstname: string;
  lastname: string;
  email: string;      
  phoneNumber: string;         
  role: ApplicantRole;
  salary: number;
  city: string;
  gender: Gender;
  addressLine1: string;
  addressLine2?: string;
  maritalStatus: MarriageStatus
  birthDate: string;
  emergancyContacts?: string;
}
export interface IEmployeeData extends IEmployee {
  leaveDays: ILeaveDay[]
}
interface ILeaveDay {
  id: string;
  from: string;
  to: string;
  reason: string;
  status: string;
  leaveType: string;
  numberOfDays: string;
  employeeId: number;
}

export interface IEmergencyContact {
  id: string;
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

enum Gender {
  MALE="MALE",
  FEMALE="FEMALE"
}