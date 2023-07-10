import {ref} from "vue";

export const useModal = ()=>{
    const isModalOpen = ref(false);
    const currentActiveScreen = ref(1);
    
    const toggleModal = ()=>{
        isModalOpen.value = !isModalOpen.value;
        currentActiveScreen.value = 1;
    }
    const moveToNextScreen = ()=>{
        if(currentActiveScreen.value < 3){
            currentActiveScreen.value = currentActiveScreen.value+1;
        }
    }
    return {
        isModalOpen,
        currentActiveScreen,
        toggleModal,
        moveToNextScreen
    }
}