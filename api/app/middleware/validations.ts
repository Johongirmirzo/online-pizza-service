import { Request, Response, NextFunction } from "express";

const validateData = ((data: any)=> async (req: Request, res: Response, next: NextFunction) => {
    try {         
        await data.validate(req.body, {abortEarly: false})
        return next();
    }catch(err: any){
        return res.status(400).json({errors: err.errors})
    }
})

export {
    validateData
}