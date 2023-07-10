import axios from "axios";
import {BASE_URL} from "../config/endpoints";
import { getTokenFromLocalStorage } from "~/utils/tokenStorage";

export const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
})

API.interceptors.request.use( config =>{
    const token = getTokenFromLocalStorage();
    if(token){
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token.accessToken}`,
            "X-refreshtoken": token.refreshToken
        }
    }
    return config;
}, error =>{
    return Promise.reject(error);
})
