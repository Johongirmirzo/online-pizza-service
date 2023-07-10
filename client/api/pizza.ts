import { API } from "./index";
import { ENDPOINTS } from "~/config/endpoints";

const getAllPizzas = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_PIZZAS)
}
const getPizza = async (pizzaId: number)=>{
    return await API.get(`${ENDPOINTS.GET_PIZZA}/${pizzaId}`)
}

export {
    getAllPizzas,
    getPizza
}