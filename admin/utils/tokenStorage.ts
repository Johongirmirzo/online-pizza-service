import {IToken} from "~/types/token"

const storeTokenToLocalStorage = (token: IToken)=>{
    localStorage.setItem("admin-token", JSON.stringify(token));
}
const getTokenFromLocalStorage = ()=> process.client && JSON.parse(localStorage.getItem("admin-token") || "null");
const removeTokenFromLocalStorage = ()=> {
    localStorage.removeItem("admin-token")
};

export {
    storeTokenToLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage
}