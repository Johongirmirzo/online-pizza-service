import { Request, Response, NextFunction } from "express"

export const isUserAdmin = (req: Request, res: Response, next: NextFunction)=>{
    if(req.user.role !== "ADMIN"){
        res.status(403).json({message: "You are not admin! You can't access this resource"})
    } else {
        next();
    }
}