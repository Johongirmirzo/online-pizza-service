import {API} from "./index";
import {ENDPOINTS} from "../config/endpoints";
import {IToppingFormData} from "../types/topping";


const getAllToppings = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_TOPPINGS)
};

const getTopping = async (toppingId: string) => {
    return await API.get(`${ENDPOINTS.GET_TOPPING}/${toppingId}`)
};

const createTopping = async (toppingData: IToppingFormData)=>{
    return await API.post(ENDPOINTS.CREATE_TOPPING, toppingData)
};

const editTopping = async (toppingId: string, toppingData: IToppingFormData)=>{
    return await API.patch(`${ENDPOINTS.EDIT_TOPPING}/${toppingId}`, toppingData)
};

const deleteTopping = async (toppingId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_TOPPING}/${toppingId}`)
};


export {
    getAllToppings,
    getTopping,
    createTopping,
    editTopping,
    deleteTopping
}