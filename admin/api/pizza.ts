import {API} from "./index";
import {ENDPOINTS} from "../config/endpoints";

const getAllPizzas = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_PIZZAS)
}
const getPizza = async (pizzaId: string) => {
    return await API.get(`${ENDPOINTS.GET_PIZZA}/${pizzaId}`)
}
const createPizza = async (pizzaFormData: any)=>{
    return await API.post(ENDPOINTS.CREATE_PIZZA, pizzaFormData)
}
const editPizza = async (pizzaId: string, pizzaFormData: any) => {
    return await API.patch(`${ENDPOINTS.EDIT_PIZZA}/${pizzaId}`, pizzaFormData)
}
const changePizzaStatus = async (pizzaId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_PIZZA_STATUS}/${pizzaId}`, {status})
}
const deletePizza = async (pizzaId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_PIZZA}/${pizzaId}`)
}

export {
    getAllPizzas,
    getPizza,
    createPizza,
    editPizza,
    changePizzaStatus,
    deletePizza
}