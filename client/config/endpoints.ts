const BASE_URL = `${process.env.SERVER_URL || "http://localhost:8800"}/api/v1.0`;
// const BASE_URL = "https://online-pizza-delivery-api.onrender.com/api/v1.0";


const ENDPOINTS = {
    LOGIN: "/customer/login",
    REGISTER: "/customer/register",
    GET_CUSTOMER: "/customer/get-customer",
    EDIT_CUSTOMER: "/customer/update-customer",

    GET_ALL_CUSTOMER_ADDRESSES: "/customer/get-all-customer-addresses",
    UPDATE_CUSTOMER_ADDRESS: "/customer/update-customer-address",
    CREATE_CUSTOMER_ADDRESS: "/customer/create-customer-address",
    DELETE_CUSTOMER_ADDRESS: "/customer/delete-customer-address",
    SET_DEFAULT_CUSTOMER_ADDRESS: "customer/set-default-customer-address",
    
    GET_ALL_CATEGORIES: "/category/get-all-categories",
    GET_CATEGORY: "/category/get-category",
    
    
    GET_ALL_DIPS: "/menu/get-all-dips",
    GET_DIP: "/menu/get-dip",

    GET_ALL_MENU_ITEMS: "/menu/get-all-menu-items",
    GET_MENU_ITEM: "/menu/get-menu-item",

    GET_ALL_PIZZAS: "/menu/get-all-pizzas",
    GET_PIZZA: "/menu/get-pizza",

    GET_ALL_CUSTOMER_ORDERS: "/order/get-all-customer-orders",
    GET_ORDER: "/order/get-order",

    CREATE_APPLICANT: "/applicant/create-applicant"
}

export {
    BASE_URL,
    ENDPOINTS
}