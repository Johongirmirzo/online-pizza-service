import jwt from "jsonwebtoken";
import {ICustomerDecodedToken} from "../types/customer";

const decodeCustomerToken = (token: string, privateKey: string)=>{  
    try {
        const {id, phone, status} = jwt.verify(token, privateKey) as ICustomerDecodedToken;
        return {
            decoded: {id, phone, status},
            isExpired: false
        }
        
    }catch(err: any){
        return {
            decoded: null,
            isExpired: err.message === "jwt expired"  
        }
    }
    
}

export default decodeCustomerToken;