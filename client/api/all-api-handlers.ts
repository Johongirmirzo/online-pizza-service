import {getAllPizzas, getPizza} from "./pizza";
import {getAllDips, getDip} from "./dip";
import {getAllMenuItems, getMenuItem} from "./menuItem";
import { getAllCategories, getCategory } from "./category";
import { getCustomer, loginCustomer, registerCustomer, editCustomer } from "./customer";
import { getAllAddresses, createaCustomerAddress, editCustomerAddress, deleteCustomerAddress } from "./customer-address"
import { getAllCustomerOrders, getOrder } from "./order";

export {
    getAllPizzas,
    getAllDips,
    getAllMenuItems,
    getPizza,
    getDip,
    getMenuItem,
    getAllCategories,
    getCategory,
    loginCustomer, 
    registerCustomer, 
    editCustomer,
    getAllAddresses,
    createaCustomerAddress,
    editCustomerAddress,
    deleteCustomerAddress,
    getAllCustomerOrders, 
    getOrder,
    getCustomer
}