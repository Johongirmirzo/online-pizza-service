"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const setAllowedOrigins_1 = require("./utils/setAllowedOrigins");
const models_1 = require("./models");
const route_1 = require("./models/message/route");
const route_2 = require("./models/review/route");
const route_3 = require("./models/feedback/route");
const route_4 = require("./models/order/route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: setAllowedOrigins_1.setAllowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/api/v1.0/users", models_1.userRouter);
app.use("/api/v1.0/category", models_1.categoryRouter);
app.use("/api/v1.0/menu", models_1.menuRouter);
app.use("/api/v1.0/customer", models_1.customRouter);
app.use("/api/v1.0/applicant", models_1.applicantRouter);
app.use("/api/v1.0/employee", models_1.employeeRouter);
app.use("/api/v1.0/message", models_1.messageRouter);
app.use("/api/v1.0/review", models_1.reviewRouter);
app.use("/api/v1.0/feedback", models_1.feedbackRouter);
app.use("/api/v1.0/topping", models_1.toppingRouter);
app.use("/api/v1.0/order", models_1.orderRouter);
// setting socket-io connection 2
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: setAllowedOrigins_1.setAllowedOrigins,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }
});
const onConnection = (socket) => {
    (0, route_1.messageHandler)(io, socket);
    (0, route_2.reviewHandler)(io, socket);
    (0, route_3.feedbackHandler)(io, socket);
    (0, route_4.orderHandler)(io, socket);
};
io.on("connection", onConnection);
const PORT = process.env.PORT || 5500;
httpServer.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
