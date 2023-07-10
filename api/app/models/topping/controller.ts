import {Request, Response} from "express"
import ToppingService from "./service"

const ToppingController = {
    async getAllToppings(req: Request, res: Response){
        const toppings = await ToppingService.getAllToppings();
        return res.json({data: toppings});
    },
    async getTopping(req: Request, res: Response){
        const id = Number(req.params.id);
        const {topping, statusCode, error} = await ToppingService.getTopping(id);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({data: topping})
        }
    },
    async createTopping(req: Request, res: Response){
        const {newTopping, statusCode, error} = await ToppingService.createTopping(req.body);
        if(statusCode === 400 || statusCode === 404 || statusCode === 409){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({data: newTopping})
        }
    },
    async editTopping(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await ToppingService.editTopping(id, req.body);
        if(statusCode === 400 || statusCode === 404 || statusCode === 409){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({message: "Topping is edited successfully!"})
        }
    },
    async deleteTopping(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await ToppingService.deleteTopping(id)
        if(statusCode === 400 || statusCode === 404 || statusCode === 409){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).end()
        }
    },
}

export default ToppingController;