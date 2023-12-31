"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = exports.toppingRouter = exports.feedbackRouter = exports.reviewRouter = exports.messageRouter = exports.employeeRouter = exports.applicantRouter = exports.customRouter = exports.menuRouter = exports.categoryRouter = exports.userRouter = void 0;
const route_1 = __importDefault(require("./user/route"));
exports.userRouter = route_1.default;
const route_2 = __importDefault(require("./category/route"));
exports.categoryRouter = route_2.default;
const route_3 = __importDefault(require("./menu/route"));
exports.menuRouter = route_3.default;
const route_4 = __importDefault(require("./customer/route"));
exports.customRouter = route_4.default;
const route_5 = __importDefault(require("./applicant/route"));
exports.applicantRouter = route_5.default;
const route_6 = __importDefault(require("./employee/route"));
exports.employeeRouter = route_6.default;
const route_7 = __importDefault(require("./message/route"));
exports.messageRouter = route_7.default;
const route_8 = __importDefault(require("./review/route"));
exports.reviewRouter = route_8.default;
const route_9 = __importDefault(require("./feedback/route"));
exports.feedbackRouter = route_9.default;
const route_10 = __importDefault(require("./topping/route"));
exports.toppingRouter = route_10.default;
const route_11 = __importDefault(require("./order/route"));
exports.orderRouter = route_11.default;
