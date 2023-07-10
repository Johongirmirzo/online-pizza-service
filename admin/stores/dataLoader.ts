import { defineStore } from "pinia";

export const useDataLoaderStore = defineStore("data-loader", ()=>{
    const isLoading = ref(false);

    const toggleLoader = ()=>{
        isLoading.value = !isLoading.value;
    }

    return {isLoading, toggleLoader}

})