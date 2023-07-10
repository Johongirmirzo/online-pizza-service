import { Request, Response, NextFunction } from "express"

export const isAdminstrative = (req: Request, res: Response, next: NextFunction)=>{
    switch(req.user.role){
        case "ADMIN":
        case "SUB_ADMIN":
        case "DRIVER":
            next();
            break;
        default:
            res.status(403).json({message: "You are not admin, sub admin or driver! You can't access this resource"})
    }
}