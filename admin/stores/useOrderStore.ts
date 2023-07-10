import { defineStore } from "pinia";
import {IOrder} from "~/types/order";

export const useOrderStore = defineStore("order-restaurant", ()=>{
    const orders = useState("orders", ()=> []);

    const storeOrder = (order: IOrder) => {
        orders.value.push(order);
    }
    const deleteOrder = (orderId: number) => {
        orders.value = orders.value.filter((order)=> order.id !== orderId);
    }
    const getOrder = (orderId: number)=> orders.value((order: IOrder) => order.id === orderId)!;

    const clearAllOrders = ()=>{
        orders.value = []
    }

    return {orders, storeOrder, getOrder, deleteOrder, clearAllOrders}
}, {persist: true})