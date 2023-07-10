import {API} from "./index";
import {ENDPOINTS} from "~/config/endpoints";

const getAllDips = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_DIPS)
}
const getDip = async (dipId: string)=>{
    return await API.get(`${ENDPOINTS.GET_DIP}/${dipId}`)
}
const createDip = async (dipData: any)=>{
    return await API.post(ENDPOINTS.CREATE_DIP, dipData)
}
const editDip = async (dipId: string, dipData: any)=>{
    return await API.patch(`${ENDPOINTS.EDIT_DIP}/${dipId}`, dipData)
}
const changeDipStatus = async (dipId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_DIP_STATUS}/${dipId}`, {status})
}
const deleteDip = async (dipId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_DIP}/${dipId}`)
}

const getAllMenuItems = async ()=>{
    return await API.get(ENDPOINTS.GET_ALL_MENU_ITEMS)
}
const getMenuItem = async (menuItemId: string)=>{
    return await API.get(`${ENDPOINTS.GET_MENU_ITEM}/${menuItemId}`)
}
const createMenuItem = async (menuItemData: any)=>{
    return await API.post(ENDPOINTS.CREATE_MENU_ITEM, menuItemData)
}
const editMenuItem = async (menuItemId: string, menuItemData: any)=>{
    return await API.patch(`${ENDPOINTS.EDIT_MENU_ITEM}/${menuItemId}`, menuItemData)
}
const changeMenuItemStatus = async (menuItemId: number, status: string)=>{
    return await API.patch(`${ENDPOINTS.CHANGE_MENU_ITEM_STATUS}/${menuItemId}`, {status})
}
const deleteMenuItem = async (menuItemId: number)=>{
    return await API.delete(`${ENDPOINTS.DELETE_MENU_ITEM}/${menuItemId}`)
}

export {
    getAllDips,
    getDip,
    createDip,
    editDip,
    changeDipStatus,
    deleteDip,

    getAllMenuItems,
    getMenuItem,
    createMenuItem,
    editMenuItem,
    changeMenuItemStatus,
    deleteMenuItem
}