import {defineStore} from "pinia";
import { ICustomer } from "~/types/customer";

export const useCustomerStore = defineStore("customer", ()=>{
    const customer = useState("customer", ():ICustomer => ({}));

    const loginCustomer = (customerData: ICustomer) => {
        customer.value = customerData;
    }
    const logoutCustomer = () => {
        customer.value = {} as ICustomer;
    }
    const updateCustomerInfo = (customerData: ICustomer) => {
        customer.value = {
            ...customer.value,
            ...customerData,
        };
    }

    return {customer, loginCustomer, logoutCustomer, updateCustomerInfo}
}, {persist: true})