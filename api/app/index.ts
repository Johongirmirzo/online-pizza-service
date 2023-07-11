import dotenv from "dotenv";
dotenv.config()
import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import { Server } from "socket.io";
import { setAllowedOrigins } from "./utils/setAllowedOrigins";
import { 
    userRouter, 
    categoryRouter, 
    menuRouter, 
    customRouter, 
    applicantRouter,
    employeeRouter,
    messageRouter,
    reviewRouter,
    feedbackRouter,
    toppingRouter,
    orderRouter
} from "./models";
import {messageHandler} from "./models/message/route";
import {reviewHandler} from "./models/review/route";
import {feedbackHandler} from "./models/feedback/route";
import {orderHandler} from "./models/order/route";

const app = express();


app.use(cors({
    origin: setAllowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use("/api/v1.0/users", userRouter);
app.use("/api/v1.0/category", categoryRouter);
app.use("/api/v1.0/menu", menuRouter);
app.use("/api/v1.0/customer", customRouter);
app.use("/api/v1.0/applicant", applicantRouter);
app.use("/api/v1.0/employee", employeeRouter);
app.use("/api/v1.0/message", messageRouter);
app.use("/api/v1.0/review", reviewRouter);
app.use("/api/v1.0/feedback", feedbackRouter);
app.use("/api/v1.0/topping", toppingRouter);
app.use("/api/v1.0/order", orderRouter);

// setting socket-io connection 2
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: setAllowedOrigins,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }
});

const onConnection = (socket: any)=>{
    messageHandler(io, socket);
    reviewHandler(io, socket);
    feedbackHandler(io, socket);
    orderHandler(io, socket)
}

io.on("connection", onConnection);
 

const PORT = process.env.PORT || 5500;
httpServer.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`))
