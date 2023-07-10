import {Request, Response} from "express";
import MessageService from "./service";

const MessageController = {
    async getAllMessages(req: Request, res: Response){
        const messages = await MessageService.getAllMessages();
        return res.json({data: messages});
    },
    async getMessage(req: Request, res: Response){
        const id = Number(req.params.id);
        const {message, statusCode, error} = await MessageService.getMessage(id);
        if(statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: message});
        }
    },
    async deleteMessage(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await MessageService.deleteMessage(id);
        if(statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).end()
        }
    }
}
export default MessageController;