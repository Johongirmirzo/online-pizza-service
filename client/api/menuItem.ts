import { API } from "./index";
import { ENDPOINTS } from "~/config/endpoints";

const getAllMenuItems = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_MENU_ITEMS)
}
const getMenuItem = async (pizzaId: number)=>{
    return await API.get(`${ENDPOINTS.GET_MENU_ITEM}/${pizzaId}`)
}

export {
    getAllMenuItems,
    getMenuItem
}