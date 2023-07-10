import {API} from "./index";
import { ENDPOINTS } from "~/config/endpoints";

const getAllReviews = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_REVIEWS);
}
const changeReviewStatus = async (reviewId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_REVIEW_STATUS}/${reviewId}`, {status});
}
export {
    getAllReviews,
    changeReviewStatus
}