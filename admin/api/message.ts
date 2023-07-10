import {API} from "./index";
import {ENDPOINTS} from "../config/endpoints";

const getAllMessages = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_MESSAGES)
}
const getMessage = async (messageId: number) => {
    return await API.get(`${ENDPOINTS.GET_MESSAGE}/${messageId}`)
}
const deleteMessage = async (messageId: number) => {
    return await API.delete(`${ENDPOINTS.DELETE_MESSAGE}/${messageId}`)
}

export {
    getAllMessages,
    getMessage,
    deleteMessage
}