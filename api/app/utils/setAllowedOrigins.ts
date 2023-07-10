const allowedDomains = [process.env.CLIENT_URL || "http://localhost:3000", process.env.ADMIN_URL || "http://localhost:3001"]
export const setAllowedOrigins = (origin: any, callback: any) =>{
    if (!origin) return callback(null, true);

    if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access!. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
    }
    console.log("Access control enabled", allowedDomains.indexOf(origin))
    return callback(null, true);
}