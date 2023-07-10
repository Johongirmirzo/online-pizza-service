import {defineStore} from "pinia";

export const useCartStore = defineStore("cart", ()=>{
    const cartItems = useState("cart", ()=> []);

    const addCartItem = (item: any)=>{
        if(item.itemType === "Pizza"){ 
            const itemIndex = cartItems.value.findIndex(cartItem => {
                return cartItem.id === item.id && 
                (cartItem.name === item.name && 
                    cartItem.size === item.size && 
                    cartItem.sliceType.sliceType === item.sliceType.sliceType &&
                    cartItem.crustType.crustType === item.crustType.crustType &&
                    cartItem.edgeType.edgeType === item.edgeType.edgeType) &&
                    (cartItem.extraToppings.length === item.extraToppings.length &&
                    cartItem.extraToppings.every((eT, idx)=> {
                       return item.extraToppings.some((iEt, iIdx)=> (
                        eT.id === iEt.id && 
                        eT.name === iEt.name && 
                        eT.toppingAmount === iEt.toppingAmount &&
                        eT.toppingPrice === iEt.toppingPrice &&
                        eT.type === iEt.type
                        ))
                    })) &&
                    (cartItem.standardToppings.length === item.standardToppings.length &&
                    cartItem.standardToppings.every((eT, idx)=> {
                        return item.standardToppings.some((iEt, iIdx)=> (
                         eT.id === iEt.id && 
                         eT.name === iEt.name && 
                         eT.toppingAmount === iEt.toppingAmount &&
                         eT.toppingPrice === iEt.toppingPrice &&
                         eT.type === iEt.type
                         ))
                    }));
            });
            if(itemIndex > -1){
                cartItems.value = cartItems.value.map((cItem, idx) => cItem.id === item.id && idx === itemIndex  ? {...cItem, amount: cItem.amount + item.amount, total: cItem.total + item.total} : cItem);            
            } else {
                cartItems.value.push(item)
            }    
        } else if(item.itemType === "Menu Item"){
            const itemIndex = cartItems.value.findIndex(cartItem => {
                return cartItem.id === item.id &&
                       cartItem.name === item.name &&
                       cartItem.size === item.size 
            })
            if(itemIndex > -1) {
                cartItems.value = cartItems.value.map((cItem, idx)=> cItem.id === item.id && idx === itemIndex ? {...cItem, amount: cItem.amount + item.amount, total: cItem.total + item.total}: cItem)
            } else {
                cartItems.value.push(item)
            }
        } else {
            const itemIndex = cartItems.value.findIndex(cartItem =>{
                return cartItem.id === item.id &&
                       cartItem.name === item.name
            })
            if(itemIndex > -1){
                cartItems.value = cartItems.value.map((cItem, idx)=> cItem.id === item.id && idx === itemIndex ? {...cItem, amount: cItem.amount + item.amount, total: cItem.total + item.total} : cItem);
            } else {
                cartItems.value.push(item)
            }
        }
       
    }
    const editCartItem = (itemId: number, editedItem: any)=>{
        cartItems.value = cartItems.value.map((item: any) => item.id === itemId ? editedItem : item)
    }
    const removeCartItem = (itemId: string)=>{
        cartItems.value = cartItems.value.filter((item: any) => item.itemId !== itemId)
    }
    const incrementItemAmount = (itemId: string)=>{
        cartItems.value = cartItems.value.map(cartItem => cartItem.itemId === itemId ? {...cartItem, total: cartItem.total + (cartItem.total / cartItem.amount), amount: cartItem.amount + 1, } : cartItem)
    }
    const decrementItemAmount = (itemId: string)=>{
        cartItems.value = cartItems.value.map(cartItem => cartItem.itemId === itemId ? {...cartItem, total: cartItem.total - (cartItem.total / cartItem.amount), amount: cartItem.amount - 1, } : cartItem)
    }
    const calculateTotal = ()=>{
        return cartItems.value.reduce((total, el)=> total + el.total,0)
    }
    const clearCart = ()=>{
        cartItems.value = []
    }

    return {cartItems, addCartItem, editCartItem, removeCartItem, calculateTotal, clearCart, incrementItemAmount, decrementItemAmount}
}, {persist: true})