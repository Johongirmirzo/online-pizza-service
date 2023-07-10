import {API} from "./index";
import {ENDPOINTS} from "~/config/endpoints";
import {OrderStatus} from "~/types/order"

const getOrder = async (orderId: number) => {
    return await API.get(`${ENDPOINTS.GET_ORDER}/${orderId}`)
}
const getAllCustomerOrders = async (customerId: number) => {
    return await API.get(`${ENDPOINTS.GET_ALL_CUSTOMER_ORDERS}/${customerId}`)
}

export {
    getOrder,
    getAllCustomerOrders,
}