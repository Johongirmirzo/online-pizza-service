import { Request, Response, NextFunction } from "express"
import decodeToken from "../utils/decodeCustomerToken";
import reissueAccessToken from "../utils/reissueCustomerAccessToken";
import {ICustomerToken} from "../types/customer"


export const verifyCustomer = async (req: Request, res: Response, next: NextFunction)=>{
    const authHeader = req.headers.authorization;
    if(authHeader){
        const accessToken = authHeader?.split("Bearer ")[1];
        const refreshToken = req.headers["x-refreshtoken"] as string;
        if(accessToken){
            const decodedToken = decodeToken(accessToken, `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`);
            if(decodedToken.decoded) {
                req.customer = decodedToken.decoded as ICustomerToken;
                return next();
            }
            if(refreshToken && decodedToken.isExpired) {
                const newAccessToken = reissueAccessToken(refreshToken);
                if(newAccessToken){
                    const decodedToken = decodeToken(newAccessToken, `${process.env.ACCESS_TOKEN_PRIVATE_KEY}`);
                    req.customer = decodedToken.decoded as ICustomerToken;
                    return next();
                }
            } else {
                return res.status(401).json({isLoginRequired: true, message: "You're unauthenticated! Please login"})
            }
        } else {
            return res.status(401).json({isLoginRequired: true, message: "You're unauthenticated! Please login"})
        }
    } else {
        return res.status(401).json({isLoginRequired: true, message: "Auth header is missing, please login!"})
    }
    
     
}