import { Request, Response } from "express";
import FeedbackService from "./service";

const FeedbackController = {
    async getAllFeedbacks(req: Request, res: Response){
        const feedbacks = await FeedbackService.getAllFeedbacks();
        return res.json({data: feedbacks});
    },
    async getFeedback(req: Request, res: Response){
        const id = Number(req.params.id);
        const {feedback, statusCode, error} = await FeedbackService.getFeedback(id);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({data: feedback});
        }
    },
    
    async changeFeedbackStatus(req: Request, res: Response){
        const id = Number(req.params.id);
        const status = req.body.status;
        const {statusCode, error} = await FeedbackService.changeFeedbackStatus(id, status);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).json({message: "Feedback status is changed successfully!"})
        }
    },
    async deleteFeedback(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await FeedbackService.deleteFeedback(id);
        if(statusCode === 404 || statusCode === 400){
            return res.status(statusCode).json({errors: error});
        } else {
            return res.status(statusCode).end();
        }
    },
}

export default FeedbackController;