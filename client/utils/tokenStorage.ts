import {IToken} from "~/types/token"

const storeTokenToLocalStorage = (token: IToken)=>{
    localStorage.setItem("client-token", JSON.stringify(token));
}
const getTokenFromLocalStorage = ()=> process.client && JSON.parse(localStorage.getItem("client-token") || "null");
const removeTokenFromLocalStorage = ()=> {
    localStorage.removeItem("client-token")
};

export {
    storeTokenToLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage
}