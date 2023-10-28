"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAllowedOrigins = void 0;
const allowedDomains = [process.env.CLIENT_URL || "https://online-pizza-delivery.netlify.app", process.env.ADMIN_URL || "https://online-pizza-delivery-admin.netlify.app/"];
const setAllowedOrigins = (origin, callback) => {
    if (!origin)
        return callback(null, true);
    console.log("Allowed Domains", allowedDomains);
    console.log("Current Visiting Website URL " + origin);
    if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access!. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
    }
    console.log("Access control enabled", allowedDomains.indexOf(origin));
    return callback(null, true);
};
exports.setAllowedOrigins = setAllowedOrigins;
