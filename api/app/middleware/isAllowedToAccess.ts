import { Request, Response, NextFunction } from "express"

export const isAllowedToAccess = (req: Request, res: Response, next: NextFunction)=>{
    switch(req.user.role){
        case "ADMIN":
        case "SUB_ADMIN":
            next();
            break;
        default:
            res.status(403).json({message: "You are not admin or sub admin! You can't access this resource"})
    }
}