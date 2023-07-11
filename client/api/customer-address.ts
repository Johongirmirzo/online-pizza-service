import {API} from "./index";
import { ENDPOINTS } from "~/config/endpoints";
import { ICustomerAddressFormData } from "~/types/customer-address";

const getAllAddresses = async (customerId: number)=>{
    return await API.get(`${ENDPOINTS.GET_ALL_CUSTOMER_ADDRESSES}/${customerId}`)
}
const createaCustomerAddress = async (customerId: number, customerAddress: ICustomerAddressFormData)=>{
    return await API.post(`${ENDPOINTS.CREATE_CUSTOMER_ADDRESS}/${customerId}`, customerAddress)
}
const editCustomerAddress = async (addressId: number, customerId: number, customerAddress: ICustomerAddressFormData)=>{
    return await API.patch(`${ENDPOINTS.UPDATE_CUSTOMER_ADDRESS}/${addressId}/${customerId}`, customerAddress)
}
const setDefaultCustomerAddress = async (addressId: number, customerId: number) => {
    return await API.patch(`${ENDPOINTS.SET_DEFAULT_CUSTOMER_ADDRESS}/${addressId}/${customerId}`)
}
const deleteCustomerAddress = async (addressId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_CUSTOMER_ADDRESS}/${addressId}`)
}

export {
    getAllAddresses,
    createaCustomerAddress,
    editCustomerAddress,
    setDefaultCustomerAddress,
    deleteCustomerAddress
}