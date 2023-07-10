import {API} from "./index";
import {ENDPOINTS} from "../config/endpoints";
import {OrderStatus} from "../types/order"

const getAllOrders = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_ORDERS)
}
const getOrder = async (orderId: number) => {
    return await API.get(`${ENDPOINTS.GET_ORDER}/${orderId}`)
}
const getAllCustomerOrders = async (customerId: number) => {
    return await API.get(`${ENDPOINTS.GET_ALL_CUSTOMER_ORDERS}/${customerId}`)
}

export {
    getAllOrders,
    getOrder,
    getAllCustomerOrders,
}