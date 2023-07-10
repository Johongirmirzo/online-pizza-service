import {API} from "./index";
import { ENDPOINTS } from "~/config/endpoints";

const getAllCategories = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_CATEGORIES)
}
const getCategory = async (categoryId: number) => {
    return await API.get(`${ENDPOINTS.GET_CATEGORY}/${categoryId}`)
}

export {
    getAllCategories,
    getCategory
}