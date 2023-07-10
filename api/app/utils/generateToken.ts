import jwt from "jsonwebtoken"
import {ITokenPayload} from "../types/token";


export const generateToken  = <T extends {}>(payload: T, privateKey: string, expirationTime: string)=>{
    return jwt.sign(payload, privateKey, {expiresIn: expirationTime})
}