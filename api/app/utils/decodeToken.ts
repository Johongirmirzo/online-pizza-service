import jwt from "jsonwebtoken";
import {IDecodedToken} from "../types/token";

const decodeToken = (token: string, privateKey: string)=>{  
    try {
        const {id, name, email, role} = jwt.verify(token, privateKey) as IDecodedToken;
        return {
            decoded: {id, name, email, role},
            isExpired: false
        }
        
    }catch(err: any){
        return {
            decoded: null,
            isExpired: err.message === "jwt expired"  
        }
    }
    
}

export default decodeToken;