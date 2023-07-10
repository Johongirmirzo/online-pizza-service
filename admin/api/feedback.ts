import {API} from "./index";
import {ENDPOINTS} from "../config/endpoints";

const getAllFeedbacks = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_FEEDBACKS);
};
const getFeedback = async (feedbackId: number)=>{
    return await API.get(`${ENDPOINTS.GET_FEEDBACK}/${feedbackId}`);
};
const changeFeedbackStatus = async (feedbackId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_FEEDBACK_STATUS}/${feedbackId}`, {status})
};
const deleteFeedback = async (feedbackId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_FEEDBACK}/${feedbackId}`);
};

export {
    getAllFeedbacks,
    getFeedback,
    changeFeedbackStatus,
    deleteFeedback
}