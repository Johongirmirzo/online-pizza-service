import { Router } from "express";
import { prisma } from "../../config/prisma";
import { IOrder, PaymentMethod, PaymentStatus, OrderType, OrderStatus } from "../../types/order";
import { validateReqParamForId } from "../../middleware/validateReqParamForId";
import OrderController from "./controller"
 
export const orderHandler = (io: any, socket: any)=>{
    socket.on("create-order", async(orderData: IOrder)=>{
        try {
            const orderItems = JSON.parse(orderData.orderItems);

            const updateItemType = async (id: number, itemAmount: number, itemType: string)=>{
                let item;
                switch(itemType) {
                    case "pizza":
                        item = await prisma.pizza.findUnique({where: {id}});
                        if(item){
                            await prisma.pizza.update({
                                where: {id},
                                data: {
                                    soldAmount: item.soldAmount + itemAmount
                                }
                            })
                        }
                        break;
                    case "menuItem":
                        item = await prisma.menuItem.findUnique({where: {id}});
                        if(item){
                            await prisma.menuItem.update({
                                where: {id},
                                data: {
                                    soldAmount: item.soldAmount + itemAmount
                                }
                            })
                        }
                        break;
                    case "dip":
                        item = await prisma.dip.findUnique({where: {id}});
                        if(item){
                            await prisma.dip.update({
                                where: {id},
                                data: {
                                    soldAmount: item.soldAmount + itemAmount
                                }
                            })
                        }
                        break;
                }
            }
             
            orderItems.forEach(async(orderItem: any) => {
                const currentItem = orderItem.itemType === "Dip" ? "dip" : orderItem.itemType === "Pizza" ? "pizza" : "menuItem"
                await updateItemType(orderItem.id, orderItem.amount, currentItem)
            });
            
            const newOrder = await prisma.order.create({
                data: {
                    ...orderData
                }
            })
            io.emit("new-order", newOrder)
        }catch(err: any){
            socket.emit("create-order-error", "Something Went Wrong!")
        }
    });

    socket.on("change-order-status", async(orderData: {orderId: number, status: OrderStatus})=>{
        try {
            await prisma.order.update({
                where: {id: orderData.orderId},
                data: {
                    orderStatus: orderData.status
                }
            });
             
            io.emit("new-order-status", orderData)
        }catch(err){
            socket.emit("change-order-status-error", "Something Went Wrong!")
        }
    })
    socket.on("change-payment-status", async(orderData: {orderId: number, status: PaymentStatus})=>{
        try {
            await prisma.order.update({
                where: {id: orderData.orderId},
                data: {
                    paymentStatus: orderData.status
                }
            });
             
            io.emit("new-payment-status", orderData)
        }catch(err){
            socket.emit("change-payment-status-error", "Something Went Wrong!")
        }
    })
}

const router = Router();

router.get("/get-all-orders", OrderController.getAllOrders);
router.get("/get-all-customer-orders/:id", validateReqParamForId, OrderController.getAllCustomerOrders);
router.get("/get-order/:id", validateReqParamForId, OrderController.getOrder);



export default router;