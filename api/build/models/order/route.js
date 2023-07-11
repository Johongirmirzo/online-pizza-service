"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderHandler = void 0;
const express_1 = require("express");
const prisma_1 = require("../../config/prisma");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const controller_1 = __importDefault(require("./controller"));
const orderHandler = (io, socket) => {
    socket.on("create-order", (orderData) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Server order received", orderData);
        try {
            const orderItems = JSON.parse(orderData.orderItems);
            const updateItemType = (id, itemAmount, itemType) => __awaiter(void 0, void 0, void 0, function* () {
                let item;
                switch (itemType) {
                    case "pizza":
                        item = yield prisma_1.prisma.pizza.findUnique({ where: { id } });
                        if (item) {
                            yield prisma_1.prisma.pizza.update({
                                where: { id },
                                data: {
                                    soldAmount: Number(item.soldAmount) + Number(itemAmount)
                                }
                            });
                        }
                        break;
                    case "menuItem":
                        item = yield prisma_1.prisma.menuItem.findUnique({ where: { id } });
                        if (item) {
                            yield prisma_1.prisma.menuItem.update({
                                where: { id },
                                data: {
                                    soldAmount: Number(item.soldAmount) + Number(itemAmount)
                                }
                            });
                        }
                        break;
                    case "dip":
                        item = yield prisma_1.prisma.dip.findUnique({ where: { id } });
                        if (item) {
                            yield prisma_1.prisma.dip.update({
                                where: { id },
                                data: {
                                    soldAmount: Number(item.soldAmount) + Number(itemAmount)
                                }
                            });
                        }
                        break;
                }
            });
            orderItems.forEach((orderItem) => __awaiter(void 0, void 0, void 0, function* () {
                const currentItem = orderItem.itemType === "Dip" ? "dip" : orderItem.itemType === "Pizza" ? "pizza" : "menuItem";
                yield updateItemType(orderItem.id, orderItem.amount, currentItem);
            }));
            console.log("Order is being created!");
            const newOrder = yield prisma_1.prisma.order.create({
                data: Object.assign({}, orderData)
            });
            console.log("New Order is created and sent to client", newOrder);
            io.emit("new-order", newOrder);
        }
        catch (err) {
            socket.emit("create-order-error", "Something Went Wrong!");
        }
    }));
    socket.on("change-order-status", (orderData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma_1.prisma.order.update({
                where: { id: orderData.orderId },
                data: {
                    orderStatus: orderData.status
                }
            });
            io.emit("new-order-status", orderData);
        }
        catch (err) {
            socket.emit("change-order-status-error", "Something Went Wrong!");
        }
    }));
    socket.on("change-payment-status", (orderData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield prisma_1.prisma.order.update({
                where: { id: orderData.orderId },
                data: {
                    paymentStatus: orderData.status
                }
            });
            io.emit("new-payment-status", orderData);
        }
        catch (err) {
            socket.emit("change-payment-status-error", "Something Went Wrong!");
        }
    }));
};
exports.orderHandler = orderHandler;
const router = (0, express_1.Router)();
router.get("/get-all-orders", controller_1.default.getAllOrders);
router.get("/get-all-customer-orders/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getAllCustomerOrders);
router.get("/get-order/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getOrder);
exports.default = router;
