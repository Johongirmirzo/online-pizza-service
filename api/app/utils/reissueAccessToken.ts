import jwt from "jsonwebtoken";
import { generateToken } from "./generateToken";
import decodeToken from "./decodeToken";
import {ITokenPayload} from "../types/token"

const reissueAccessToken = (token: string)=>{
    const {
        REFRESH_TOKEN_PRIVATE_KEY,
        ACCESS_TOKEN_PRIVATE_KEY,
        ACCESS_TOKEN_EXPIRATION_TIME,
    } = process.env;
    const {decoded} = decodeToken(token, `${REFRESH_TOKEN_PRIVATE_KEY}`);
    if(!decoded){
        return false;
    }
    const accessToken = generateToken<ITokenPayload>(decoded, `${ACCESS_TOKEN_PRIVATE_KEY}`, `${ACCESS_TOKEN_EXPIRATION_TIME}`)
    return accessToken;
}

export default reissueAccessToken;