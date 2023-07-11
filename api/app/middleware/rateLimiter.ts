import rateLimit from 'express-rate-limit'

export const limitApiRequestByHours = (hours: number, allowedApiRequestWithinTime: number, message: string)=>
rateLimit({
	windowMs: hours *  60 * 60 * 1000,
	max: allowedApiRequestWithinTime,
    message,
	standardHeaders: true, 
	legacyHeaders: false
})

export const rateLimitMessages = {
	customerLogin: (hours: number)=> `Too many login attempts, You can login again in ${hours} hours!`,
	adminLogin: (hours: number)=> `Too many login attempts, You can login again in ${hours} hours!`,
	customerRegister: (hours: number)=> `You've reached ${hours} hourly limit!, You can create a new account in ${hours} hours!`,
	sendMessage: (hours: number)=> `You've exceeded reached ${hours} hourly limit!, You can send message again in ${hours} hours!`
}