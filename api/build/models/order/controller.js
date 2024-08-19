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
const service_1 = __importDefault(require("./service"));
const OrderController = {
    getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield service_1.default.getAllOrders();
            return res.json({ data: orders });
        });
    },
    getAllCustomerOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const customerOrders = yield service_1.default.getAllCustomerOrders(id);
            return res.json({ data: customerOrders });
        });
    },
    getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const order = yield service_1.default.getOrder(id);
            return res.json({ data: order });
        });
    },
};
exports.default = OrderController;
