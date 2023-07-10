import { 
    driver_not_allowed_route_pathes,
    sub_admin_not_allowed_route_pathes
} from "~/config/prohibitedRoutes"
import {IToken, IDecodedToken } from "~/types/token"
import { decodeToken } from "~/utils/decodeToken"

export default defineNuxtRouteMiddleware((to, from)=>{
    if(process.server)return;
    const parsedToken = JSON.parse(localStorage.getItem("admin-token") || "{}") as IToken
    let decodedToken;
    if(Object.keys(parsedToken).length){
        decodedToken = decodeToken(parsedToken.accessToken) as IDecodedToken;
    }
    if(!decodedToken){
        return abortNavigation()
    }
   
    if(!Object.keys(decodedToken).length){
        if(from.name !== to.name){
            return navigateTo(from.path)
        }
        if(to.path !== "/"){
            return navigateTo("/")
        }
    }

    switch(decodedToken.role){
        case "SUB_ADMIN":
                if(sub_admin_not_allowed_route_pathes.includes(to.name as string)){
                    if(from.name !== to.name){
                        return navigateTo(from.path)
                    }
                    if(to.path !== "/"){
                        return navigateTo("/")
                    }
                }
            break;
        case "DRIVER":
                if(driver_not_allowed_route_pathes.includes(to.name as string)){
                    if(from.name !== to.name){
                        return navigateTo(from.path)
                    } 
                    if(to.path !== "/"){
                        return navigateTo("/")
                    }
                }
            break;
    }
})