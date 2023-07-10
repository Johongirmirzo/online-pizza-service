import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma"
import { CustomerStatus, IRegisterCustomerFormData, ILoginCustomerFormData } from "../../types/customer";
import {ICustomerAddressFormData} from "../../types/customer-address";

const CustomerService = {
    async getAllCustomers() {
        return await prisma.customer.findMany({orderBy: [{created: "desc"}]});
    },
    async getCustomer(id: number) {
        try {
            const customer = await prisma.customer.findUnique({ where: { id } });
            if(!customer) {
                return {customer:null, statusCode: 404, error: "Customer's not been found!"}
            } else {
                return {customer, statusCode: 200, error: ""}
            }
        }catch(err){
            return {customer:null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async loginCustomer(customerData: ILoginCustomerFormData) {
        try {
            const customer = await prisma.customer.findFirst({ where: {AND: [{ phone: `${customerData.phone}`}, {email: customerData.email}]} });
            console.log(customer);
            if (!customer) {
                return {customer: null, statusCode: 400, error: "Wrong Credentials!"}
            } 
            if(!(await bcrypt.compare(customerData.password, customer.password))){
                return {customer: null, statusCode: 400, error: "Wrong Password!"}
            }
            
            return {customer, statusCode: 200, error: ""};
        }catch(err){
            console.log(err)
            return {customer: null, statusCode: 400, error: "Bad Request!"}
        }
    },
    async registerCustomer(customerData: IRegisterCustomerFormData) {
        try {
            const customer = await prisma.customer.findFirst({ where: {OR: [{ phone: `${customerData.phone}` },{email: customerData.email}]} });
            if (customer) {
                return {newCustomer: null, statusCode: 409, error: "Customer with this phone number or email already exists!"}
            } else {
                const customerRegisterData = {
                    name: customerData.name,
                    email: customerData.email,
                    phone: `${customerData.phone}`,
                }
                const hashedPassword = await bcrypt.hash(customerData.password, 10)
                const newCustomer = await prisma.customer.create({
                    data: {
                        ...customerRegisterData,
                        password: hashedPassword,
                    }
                })
                return {newCustomer, statusCode: 201, error: ""};
            }
        }catch(err: any){
            console.log(err)
            return {newCustomer: null, statusCode: 400, error: "Bad Request!"}
        }
    },
 
    async updateCustomer(id: number, customerData: any){
       try {
            const customer = await prisma.customer.findUnique({where: {id}});
            if(!customer) {
                return {statusCode: 404, error: "Customer has not been found!"}
            } else {
                let hashedPassword
                if(customerData.password && customerData.newPassword && customerData.newConfirmPassword) {
                    if(!(await bcrypt.compare(customerData.password, customer.password))){
                        return {statusCode: 400, error: "Password is incorrect!"}
                    }
                    if(customerData.newPassword !== customerData.newConfirmPassword){
                        return {statusCode: 400, error: "Password did not match!"}
                    }
                    hashedPassword = await bcrypt.hash(customerData.newPassword, 10)
                }
                const newDate = {
                    name: customerData.name,
                    email: customerData.email,
                    status: customerData.status,
                    gender: customerData.gender,
                    phone: customerData.phone,
                    birthDate: customerData.birthDate,
                    password: customerData.password
                }

                await prisma.customer.update({where: {id}, data: {...newDate, password: hashedPassword ?? customer.password, updated: new Date()}})
                return {statusCode: 200, error: ""}
            }
       } catch(err){
            console.log(err)
            return {statusCode: 400, error: "Bad Request!"}
       }
    },
    async changeCustomerStatus(id: number, status: CustomerStatus) {
        try {
            const customer = await prisma.customer.findUnique({where: {id}});
            if(!customer) {
                return {statusCode: 404, error: "Customer's not been found"}
            } else {
                await prisma.customer.update({where: {id}, data: {status: CustomerStatus[status], updated: new Date()}})
                return {statusCode: 200, error: ""}
            }

        }catch(err){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },
    async deleteCustomer(id: number) {
        try {
            const customer = await prisma.customer.findUnique({where: {id}})
            if(!customer){
                return {statusCode: 404, error: "Customer's not been found"}
            } else {
                await prisma.customer.delete({where: {id}})
                return {statusCode: 204, error: ""}
            }

        }catch(err){
            return {statusCode: 400, error: "Bad Request"}
        }
    },

    async getAllCustomerAddresses(customerId: number){
        return await prisma.customerAdress.findFirst({where: {customerId}})
    },
    async updateCustomerAddress(addressId: number, customerId: number, customerAddressData: ICustomerAddressFormData){
        try {
            const customerAddress = await prisma.customerAdress.findUnique({where: {id: addressId}})
            if(!customerAddress){
                return {statusCode: 404, error: "Customer address has not been found!"}
            } else {
                 
                await prisma.customerAdress.update({
                    where: {id: addressId},
                    data: {...customerAddressData}
                })
                return {statusCode: 200, error: ""}
            }
        }catch(err){
            console.log(err)
            return {statusCode: 400, error: "Bad Request!"}
        }
    },
    async createCustomerAddress(customerId: number, customerAddressData: ICustomerAddressFormData){
        try {
            const newAddress = await prisma.customerAdress.create({
                data: {
                    ...customerAddressData,
                    customerId: customerId
                }
            })
            return {newAddress, statusCode: 201, error: ""}
            
        }catch(err){
            console.log(err)
            return {newAddress: null, statusCode: 400, error: "Bad Request!"}
        } 
    },
    async deleteCustomerAddress(addressId: number){
        try {
            const customerAddress = await prisma.customerAdress.findUnique({where: {id: addressId}})
            if(!customerAddress){
                return {statusCode: 404, error: "Customer address has not been found!"}
            } else {
                await prisma.customerAdress.delete({
                    where: {id: addressId},
                })
                return {statusCode: 204, error: ""}
            }
        }catch(err){
            return {statusCode: 400, error: "Bad Request!"}
        }
    },
}

export default CustomerService