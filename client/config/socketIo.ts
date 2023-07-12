import {io} from "socket.io-client";

// export const socket = io(`${process.env.SERVER_URL || "http://localhost:8800"}`);
export const socket = io("https://online-pizza-delivery-api.onrender.com");