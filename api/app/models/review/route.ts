import { Router } from "express";
import { review } from "../../validations";
import { validateSocketData } from "../../middleware/validateSocketData";
import { prisma } from "../../config/prisma";
import { verifyUser } from "../../middleware/verifyUser";
import { isUserAdmin } from "../../middleware/isAdmin";
import { validateReqParamForId } from "../../middleware/validateReqParamForId";
import ReviewController from "./controller";

const router = Router();


export const reviewHandler = async (io: any, socket: any)=>{
    socket.on("create-review", async (reviewData: any)=>{
        const errors = await validateSocketData(review, reviewData);
        if(errors){
            socket.emit("create-review-errors", errors);
        } else { 
            await prisma.review.create({
                data: {
                    ...reviewData,
                }
            });
            const latestReviews = await prisma.review.findMany({orderBy: {date: "desc"}, take: 5});
            
            io.emit("latest-reviews", latestReviews)
        }
        
    });
    
    const latestReviews = await prisma.review.findMany({orderBy: {date: "desc"}, take: 5});
    io.emit("latest-reviews", latestReviews)

}


router.get("/get-all-reviews", verifyUser, isUserAdmin, ReviewController.getAllReviews)
router.get("/get-review/:id", validateReqParamForId, ReviewController.getReview);
router.patch("/change-review-status/:id", verifyUser, isUserAdmin, validateReqParamForId, ReviewController.changeReviewStatus)
router.delete("/delete-review/:id", verifyUser, isUserAdmin, validateReqParamForId, ReviewController.deleteReview)


export default router;