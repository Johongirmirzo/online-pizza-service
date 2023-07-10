"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = exports.OrderType = exports.PaymentMethod = exports.PaymentStatus = void 0;
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["CARD"] = "CARD";
})(PaymentMethod || (PaymentMethod = {}));
exports.PaymentMethod = PaymentMethod;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["APPROVED"] = "APPROVED";
    PaymentStatus["DECLINED"] = "DECLINED";
})(PaymentStatus || (PaymentStatus = {}));
exports.PaymentStatus = PaymentStatus;
var OrderType;
(function (OrderType) {
    OrderType["DELIVERY"] = "DELIVERY";
    OrderType["PICKUP"] = "PICKUP";
})(OrderType || (OrderType = {}));
exports.OrderType = OrderType;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["ORDER_NOT_CONFIRMED"] = "ORDER_NOT_CONFIRMED";
    OrderStatus["ORDER_CANCELLED"] = "ORDER_CANCELLED";
    OrderStatus["ORDER_CONFIRMED"] = "ORDER_CONFIRMED";
    OrderStatus["ORDER_BEING_PREPARED"] = "ORDER_BEING_PREPARED";
    OrderStatus["ORDER_BOXED"] = "ORDER_BOXED";
    OrderStatus["ORDER_DELIVERED"] = "ORDER_DELIVERED";
    OrderStatus["ORDER_PICKED_UP"] = "ORDER_PICKED_UP";
})(OrderStatus || (OrderStatus = {}));
exports.OrderStatus = OrderStatus;
