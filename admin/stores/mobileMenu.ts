import { defineStore } from "pinia";

export const useMobileMenuStore = defineStore("mobile-menu", ()=>{
    const isMenuToggled = useState("mobile-menu", ():boolean => (false));

    const toggleMenu = ()=>{
        isMenuToggled.value = !isMenuToggled.value;
    }

    return {isMenuToggled, toggleMenu}
})