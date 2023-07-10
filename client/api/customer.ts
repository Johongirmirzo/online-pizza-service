import { API } from "./index";
import { ENDPOINTS } from "~/config/endpoints";
import {IRegisterFormData} from "~/types/customer"

const getCustomer = async (customerId: number) => {
    return await API.get(`${ENDPOINTS.GET_CUSTOMER}/${customerId}`);
}
const loginCustomer = async (loginFormData: any)=>{
    return await API.post(ENDPOINTS.LOGIN, loginFormData)
}
const registerCustomer = async (registerFormData: IRegisterFormData)=>{
    return await API.post(ENDPOINTS.REGISTER, registerFormData)
}
const editCustomer = async (customerId: number, customerData: any)=>{
    return await API.patch(`${ENDPOINTS.EDIT_CUSTOMER}/${customerId}`, customerData)
}

export {
    getCustomer,
    loginCustomer,
    registerCustomer,
    editCustomer
}