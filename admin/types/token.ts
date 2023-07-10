interface IToken {
    accessToken: string;
    refreshToken: string;
}
interface ITokenPayload {
    id: number;
    name: string;
    email: string;
    role: Role;
}
enum Role {
    ADMIN = "ADMIN",
    SUB_ADMIN = "SUB_ADMIN",
    DRIVER = "DRIVER"
}

interface IDecodedToken extends ITokenPayload{
    iat: number;
    exp: number;
}
export {
    IToken,
    ITokenPayload,
    IDecodedToken,
    Role
}