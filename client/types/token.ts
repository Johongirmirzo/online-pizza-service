interface IToken {
    accessToken: string;
    refreshToken: string;
}
interface ITokenPayload {
    id: number;
    phone: string;
    status: Status;   
}
enum Status {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED"
}

interface IDecodedToken extends ITokenPayload{
    iat: number;
    exp: number;
}
export {
    IToken,
    ITokenPayload,
    IDecodedToken,
    Status
}