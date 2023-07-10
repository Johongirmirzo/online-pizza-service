const getUserOrderType = ()=> process.client && localStorage.getItem("order-type");
const storeUserOrderType = (orderType: string)=> localStorage.setItem("order-type", orderType);

export {
    getUserOrderType,
    storeUserOrderType,
}