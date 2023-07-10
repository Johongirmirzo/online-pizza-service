import {API} from "./index";
import {ENDPOINTS} from "../config/endpoints";

const getCategory = async (categoryId: string)=>{
    return await API.get(`${ENDPOINTS.GET_CATEGORY}/${categoryId}`)
}
const getAllCategories = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_CATEGORIES)
}
const createCategory = async (formData: any)=>{
    return await API.post(ENDPOINTS.CREATE_CATEGORY, formData)
}
const editCategory = async (categoryId: number, formData: any)=>{
    return await API.patch(`${ENDPOINTS.EDIT_CATEGORY}/${categoryId}`, formData)
}
const deleteCategory = async (categoryId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_CATEGORY}/${categoryId}`)
}



export {
    getCategory,
    getAllCategories,
    createCategory,
    editCategory,
    deleteCategory
}