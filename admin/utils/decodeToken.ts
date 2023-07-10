import jwt_decode from "jwt-decode";

export const decodeToken = (token: string)=> jwt_decode(token);