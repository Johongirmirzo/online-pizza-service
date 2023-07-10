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
        console.log(addressId, editedAddress)
        customerAddresses.value = customerAddresses.value.map((customerAddress: ICustomerAddress)=> {
            console.log(customerAddress.id, addressId)
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
        currentActiveCustomerAddress.value = customerAddresses.value.find((customerAddress: ICustomerAddress)=> customerAddress.id === addressId)!
    }
    const setCurrentOrderType = (orderType: string)=>{
        currentOrderType.value = orderType
    }
    return {customerAddresses, currentActiveCustomerAddress, currentOrderType, addCustomerAddress, updateCustomerAddress, deleteCustomerAddress, setCurrentActiveCustomerAddress, setCurrentOrderType}
}, {persist: true})