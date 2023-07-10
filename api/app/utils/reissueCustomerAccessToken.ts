import jwt from "jsonwebtoken";
import { generateToken } from "./generateToken";
import decodeCustomerToken from "./decodeCustomerToken";
import {ICustomerToken} from "../types/customer";

const reissueCustomerAccessToken = (token: string)=>{
    const {
        REFRESH_TOKEN_PRIVATE_KEY,
        ACCESS_TOKEN_PRIVATE_KEY,
        ACCESS_TOKEN_EXPIRATION_TIME,
    } = process.env;
    const {decoded} = decodeCustomerToken(token, `${REFRESH_TOKEN_PRIVATE_KEY}`);
    if(!decoded){
        return false;
    }
    const accessToken = generateToken<ICustomerToken>(decoded, `${ACCESS_TOKEN_PRIVATE_KEY}`, `${ACCESS_TOKEN_EXPIRATION_TIME}`)
    return accessToken;
}

export default reissueCustomerAccessToken;