import { defineStore } from "pinia";
import { ICustomerAddress, ICustomerAddressFormData } from "~/types/customer-address";

export const useCustomerAddress = defineStore("customer-address", ()=>{
    const customerAddresses = useState("customer-addresses", ():ICustomerAddress[]=> ([]));
    const currentActiveCustomerAddress = useState("current-customer-address", ():ICustomerAddress => ({}))
    const currentOrderType = useState("current-order-type", ():string => "")

    const addCustomerAddress = (address: ICustomerAddress)=>{
        customerAddresses.value.push(address);
    }
    const updateCustomerAddress = (addressId: number, editedAddress: ICustomerAddress)=>{
        customerAddresses.value = customerAddresses.value.map((customerAddress: ICustomerAddress)=> {
            return customerAddress.id === addressId ? editedAddress : customerAddress
        })
    }
    const deleteCustomerAddress = (addressId: number)=>{
        customerAddresses.value = customerAddresses.value.filter((customerAddress: ICustomerAddress)=> customerAddress.id !== addressId)
        if(currentActiveCustomerAddress.value.id === addressId){
            currentActiveCustomerAddress.value = {}
            currentOrderType.value = "Pickup"
        }
    }
    const setCurrentActiveCustomerAddress = (addressId: number)=>{
        console.log("Acrivv", addressId, 999)
        customerAddresses.value = customerAddresses.value.map((customerAddress: ICustomerAddress)=> customerAddress.id === addressId ? {...customerAddress, isDefault: true} : {...customerAddress, isDefault: false})
        currentActiveCustomerAddress.value = customerAddresses.value.find((customerAddress: ICustomerAddress)=> customerAddress.id === addressId)!
    }
    const setCurrentOrderType = (orderType: string)=>{
        currentOrderType.value = orderType
    }
    const resetCustomerAddress = ()=>{
        customerAddresses.value = [];
        currentActiveCustomerAddress.value = {};
        currentOrderType.value = "Pickup"
    }
    return {customerAddresses, currentActiveCustomerAddress, currentOrderType, addCustomerAddress, updateCustomerAddress, deleteCustomerAddress, setCurrentActiveCustomerAddress, setCurrentOrderType, resetCustomerAddress}
}, {persist: true})