import { Role } from "./token";

export interface IUserLoginData {
    email: string;
    password: string;
}

export interface IUser {
    name: string;
    email: string;
    phoneNumber: string;
    role: Role;
    password: string;
}
export interface IUserFormData extends IUser{
    newPassword: string;
    newConfirmPassword: string;
}
export interface IEditUser {
    name?: string;
    email?: string;
    phoneNumber: string;
    role?: Role;
    password?: string;
}

export enum UserStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
}