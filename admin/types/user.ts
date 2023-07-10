interface ICreateUserFormData {
    'user-photo': IPhotoFile;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    c_password: string;
    role: IUserRole;
    status?: UserStatus;
}
interface IPhotoFile {
    lastModified: number;
    lastModofiedDate: string;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}
interface IUser {
    id: number;
    email: string;
    name: string;
    password: string;
    phoneNumber: string;
    photo: string;
    photo_id: string;
    role: IUserRole;
    status: UserStatus;
}
interface IEditUserFormData extends IUser {
    'user-photo': IPhotoFile;
    newPassword: string;
    newConfirmPassword: string;
}

enum IUserRole {
    SUB_ADMIN="SUB_ADMIN",
    DRIVER="DRIVER"
}
enum UserStatus {
    PENDING="PENDING",
    ACTIVE="ACTIVE",
    BLOCKED="BLOCKED"
}

export {
    ICreateUserFormData,
    IEditUserFormData,
    IUserRole,
    IPhotoFile,
    IUser,
    UserStatus
}
