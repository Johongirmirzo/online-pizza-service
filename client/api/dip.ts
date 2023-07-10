import { API } from "./index";
import { ENDPOINTS } from "~/config/endpoints";

const getAllDips = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_DIPS)
}
const getDip = async (pizzaId: number)=>{
    return await API.get(`${ENDPOINTS.GET_DIP}/${pizzaId}`)
}

export {
    getAllDips,
    getDip
}