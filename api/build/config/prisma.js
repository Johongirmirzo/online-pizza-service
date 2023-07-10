"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
// export const prisma = new PrismaClient({
//     errorFormat: 'pretty',
//     log: [
//       { level: 'query', emit: 'event' },
//       { level: 'warn', emit: 'event' },
//       { level: 'info', emit: 'event' },
//       { level: 'error', emit: 'event' },
//     ],
//   })
// prisma.$on("query", e=>{
//   console.log("Query:",e)
// })
// prisma.$on('warn', (e) => {
//   console.log("Warn:", e)
// })
// prisma.$on('info', (e) => {
//   console.log("Info:", e)
// })
// prisma.$on('error', (e) => {
//   console.log("Error:", e)
// })
