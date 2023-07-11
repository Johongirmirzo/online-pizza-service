import {API} from "./index";
import {ENDPOINTS} from "../config/endpoints";
import {CustomerStatus} from "../types/customer"

const getAllCustomers = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_CUSTOMERS)
};
const getCustomer = async (customerId: string)=>{
    return await API.get(`${ENDPOINTS.GET_CUSTOMER}/${customerId}`);
};
const getAllCustomerAddresses = async (customerId: number)=>{
    return await API.get(`${ENDPOINTS.GET_ALL_CUSTOMER_ADDRESSES}/${customerId}`);
}
const changeCustomerStatus = async (customerId: number, customerStatus: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_CUSTOMER_STATUS}/${customerId}`, {status: customerStatus})
};
const deleteCustomer = async (customerId: string)=>{
    return await API.delete(`${ENDPOINTS.DELETE_CUSTOMER}/${customerId}`)
};

export {
    getAllCustomers,
    getCustomer,
    getAllCustomerAddresses,
    changeCustomerStatus,
    deleteCustomer
}