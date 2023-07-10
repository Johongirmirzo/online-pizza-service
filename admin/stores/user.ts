import {defineStore} from "pinia";
import { IUser } from "~/types/user";

export const useUserStore = defineStore("user", ()=>{
    const user = useState("user", (): IUser => ({}))

    const loginUser = (userData: IUser) => {
        user.value = userData;
    }
    const logoutUser = () => {
        user.value = {} as IUser;
    }
    const updateUserInfo = (userData: IUser) => {
        user.value = {
            ...user.value,
            ...userData,
        };
    }

    return {user, loginUser, logoutUser, updateUserInfo}
}, {persist: true})