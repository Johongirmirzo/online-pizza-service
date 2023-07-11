import {Request, Response} from "express"
import CustomerService from "./service"
import { generateToken } from "../../utils/generateToken";
import { ICustomerToken, CustomerStatus } from "../../types/customer"

const CustomerController = {
    async getAllCustomers(req: Request, res: Response){
        const customers = await CustomerService.getAllCustomers();
        res.json({data: customers});
    },
    async getCustomer(req: Request, res: Response){
        const id = Number(req.params.id);
        const {customer, statusCode, error} = await CustomerService.getCustomer(id);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.json({data: customer});
        }
    },
    async loginCustomer(req: Request, res: Response){
        try {
            const {customer, statusCode, error} = await CustomerService.loginCustomer(req.body);
            if(statusCode === 400 && !customer) {
                return res.status(statusCode).json({errors: error});
            } else {
                if(customer){
                    const {id, phone, status} = customer;
                    const {
                    ACCESS_TOKEN_PRIVATE_KEY, 
                    ACCESS_TOKEN_EXPIRATION_TIME,
                    REFRESH_TOKEN_PRIVATE_KEY,
                    REFRESH_TOKEN_EXPIRATION_TIME
                } = process.env; 
                    const accessToken = generateToken<ICustomerToken>({id, phone, status: CustomerStatus[status]}, `${ACCESS_TOKEN_PRIVATE_KEY}`, `${ACCESS_TOKEN_EXPIRATION_TIME}`)
                    const refreshToken = generateToken<ICustomerToken>({id, phone, status: CustomerStatus[status]}, `${REFRESH_TOKEN_PRIVATE_KEY}`, `${REFRESH_TOKEN_EXPIRATION_TIME}`)     
                    res.json({data: {accessToken, refreshToken, customer}});
                }
            }
        }catch(err: any){
            res.status(400).json({errors: err.message});
        }
    },
    async registerCustomer(req: Request, res: Response){      
        const {newCustomer, statusCode, error} = await CustomerService.registerCustomer(req.body);
        if(statusCode === 400 || statusCode === 409){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: newCustomer})
        }
    },

    async updateCustomer(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await CustomerService.updateCustomer(id, req.body);
        if(statusCode === 400 || statusCode === 404){
            return res.status(400).json({errors: error})
        } else {
            return res.json({data: {message: `Data has changed successfully`}})
        }
    },
    async changeCustomerStatus(req: Request, res: Response){
        const id = Number(req.params.id);
        const {status} = req.body;
        const {statusCode, error} = await CustomerService.changeCustomerStatus(id, status);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.json({message: "Customer status changed successfully!"})
        }
    },
    async deleteCustomer(req: Request, res: Response){
        const id = Number(req.params.id);
        if(isNaN(id)){
            return res.status(400).json({errors: "Please provide only integer for id"})
        }
        const {statusCode, error} = await CustomerService.deleteCustomer(id);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(204).end()
        }
    },
    async getAllCustomerAddresses(req: Request, res: Response){
        const id = Number(req.params.id);
        const customerAddresses = await CustomerService.getAllCustomerAddresses(id);
        return res.json({data: customerAddresses})
    },
    async createCustomerAddress(req: Request, res: Response){
        const id = Number(req.params.id);
        const {newAddress, statusCode, error} = await CustomerService.createCustomerAddress(id, req.body)
        if(statusCode === 400){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({data: newAddress})
        }
    },
    
    async updateCustomerAddress(req: Request, res: Response){
        const addressId = Number(req.params.addressId);
        const customerId = Number(req.params.customerId);
        const {statusCode, error} = await CustomerService.updateCustomerAddress(addressId, customerId, req.body);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({message: "Customer address is updated successfully!"})
        }
    },

    async setDefaultCustomerAddress(req: Request, res: Response){
        const addressId = Number(req.params.addressId);
        const customerId = Number(req.params.customerId);
        const {statusCode, error} = await CustomerService.setDefaultCustomerAddress(addressId, customerId);
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).json({message: "Default customer address is set successfully!"})
        }
    },

    async deleteCustomerAddress(req: Request, res: Response){
        const id = Number(req.params.id);
        const {statusCode, error} = await CustomerService.deleteCustomerAddress(id)
        if(statusCode === 400 || statusCode === 404){
            return res.status(statusCode).json({errors: error})
        } else {
            return res.status(statusCode).end()
        }
    },
}

export default CustomerController