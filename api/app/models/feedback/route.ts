import {Router} from "express";
import { prisma } from "../../config/prisma";
import { verifyUser } from "../../middleware/verifyUser";
import { isUserAdmin } from "../../middleware/isAdmin";
import { validateSocketData } from "../../middleware/validateSocketData";
import { createFeedbackSchema } from "../../validations";
import { validateReqParamForId } from "../../middleware/validateReqParamForId";
import { IFeedback, Gender, FeedbackOn, VisitAmount } from "../../types/feedback";
import FeedbackController from "./controller";


const router = Router();

export const feedbackHandler = async (io: any, socket: any)=>{

    socket.on("create-feedback", async (data: any)=>{
        const errors = await validateSocketData(createFeedbackSchema, data);
        if(errors) {
            socket.emit("create-feedback-errors", errors);
        } else {
            const feedbackData = Object.entries(data).filter(d => d[0] !== "feedbackTypeData").reduce((obj, el)=>{
                return {...obj, [el[0]]: el[1]}
            }, {}) as IFeedback; 
            if(feedbackData.type === "DINE_IN"){
                const newFeedback = await prisma.feedback.create({
                    data: {
                        ...feedbackData,
                        gender: Gender[feedbackData.gender],
                        dineInFeedbacks: 
                        {
                            create: {
                                ...data.feedbackTypeData,
                                dateOfVisit: new Date(data.feedbackTypeData.dateOfVisit),
                                visitAmount: data.feedbackTypeData.visitAmount
                            }
                        }
                    }
                });
                io.emit("new-feedback", newFeedback)
            }
            if(feedbackData.type === "DELIVERY"){
                const newFeedback = await prisma.feedback.create({
                    data: {
                        ...feedbackData,
                        gender: Gender[feedbackData.gender],
                        deliveryFeedbacks: 
                        {
                            create: {
                                ...data.feedbackTypeData,
                                dateOfOrder: new Date(data.feedbackTypeData.dateOfOrder),
                                feedbackOn: data.feedbackTypeData.feedbackOn
                            }
                        }
                    }
                });
                io.emit("new-feedback", newFeedback)
            }
        }
    })
}

router.get("/get-all-feedbacks", verifyUser, isUserAdmin, FeedbackController.getAllFeedbacks)
router.get("/get-feedback/:id", verifyUser, isUserAdmin, validateReqParamForId, FeedbackController.getFeedback)
router.patch("/change-feedback-status/:id", verifyUser, isUserAdmin, validateReqParamForId, FeedbackController.changeFeedbackStatus)
router.delete("/delete-feedback/:id", verifyUser, isUserAdmin, validateReqParamForId, FeedbackController.deleteFeedback)

export default router;