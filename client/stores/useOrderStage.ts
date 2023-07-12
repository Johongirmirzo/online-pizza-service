import { defineStore } from "pinia";

export const useOrderStageStore = defineStore("order-stage", ()=>{
    const currentOrderStage = useState("order-stage", ()=> 0);

    const setCurrentOrderStage = (orderStage: number)=>{
        currentOrderStage.value = orderStage;
    }

    const resetOrderStage = ()=>{
        currentOrderStage.value = 0;
    }
    return {currentOrderStage, setCurrentOrderStage, resetOrderStage}
}, {persist: true})