import {API} from "./index";
import { ENDPOINTS } from "~/config/endpoints";

const getAllUsers = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_USERS);
}
const getUser = async (userId: string)=>{
    return await API.get(`${ENDPOINTS.GET_USER}/${userId}`);
}
const createUser = async (formData: any)=>{
    return await API.post(ENDPOINTS.CREATE_USER, formData)
}
const changeUserStatus  = async (userId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_USER_STATUS}/${userId}`, {status})
}
const editUser = async (userId: string, formData: any)=>{
    return await API.patch(`${ENDPOINTS.EDIT_USER}/${userId}`, formData)
}
const deleteUser = async (userId: number) => {
    return await API.delete(`${ENDPOINTS.DELETE_USER}/${userId}`)
}

export {
    getAllUsers,
    getUser,
    createUser,
    editUser,
    deleteUser,
    changeUserStatus
}