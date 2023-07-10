import { Request, Response, NextFunction } from "express";

export const validateReqParamForId = (req: Request, res: Response, next: NextFunction)=>{
    const id = Number(req.params.id);
    if(isNaN(id)){
        return res.status(400).json({errors: "Please provide only integer for url paramater of id"})
    }
    next()
}

