export interface IApplicant {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
    birthDate: string;
    passportNumber: string;
    noticePeriod: string;
    dateOfJoining: string;
    education: Education;
    martialStatus: MarriageStatus;
    source: string;
    experiences: [];
    languages: [];
    computerSkills:[];
    role: ApplicantRole;
    hasBankAccount: boolean;
    bankAccountName?: string;
}
export interface ITeamMember {
    employmentType: EmploymentType;

}
export interface IDriver {
    employmentType: EmploymentType;
    drivingLicence: DrivingLicense;
    licenseNumber:  string;
}
export interface IManager {
    panNumber: string;
    panPhoto: string;
    currentEmployer: string;
    currentRole: string;
    currentCTC: string;
    currentLocation: string;
}

export enum Gender {
    MALE="MALE",
    FEMALE="FEMALE",
}
export enum Education {
    NO_EDUCATION="NO_EDUCATION",
    HIGH_SCHOOL="HIGH_SCHOOL",
    GRADUATE="GRADUATE",
    POST_GRADUATE="POST_GRADUATE"
}
export enum MarriageStatus {
    MARRIED="MARRIED",
    SINGLE="SINGLE"
}
export enum ApplicantRole {
    TEAM_MEMBER="TEAM_MEMBER",
    DRIVER="DRIVER",
    MANAGER="MANAGER",
    AREA_COACH="AREA_COACH"
}
export enum EmploymentType {
    FULL_TIME="FULL_TIME",
    PART_TIME="PART_TIME"
}
export enum DrivingLicense {
    A1="A1",
    A="A",
    B="B",
    C="C"
}
export enum ApplicantStatus {
    PENDING="PENDING",
    ACCEPTED="ACCEPTED",
    REJECTED="REJECTED"
}