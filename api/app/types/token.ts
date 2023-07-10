export interface ITokenPayload {
    id: number;
    name: string;
    email: string;
    role: Role;
}
export enum Role {
    ADMIN = "ADMIN",
    SUB_ADMIN = "SUB_ADMIN",
    DRIVER = "DRIVER"
}

export interface IDecodedToken extends ITokenPayload{
    iat: number;
    exp: number;
}