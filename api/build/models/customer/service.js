"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../config/prisma");
const customer_1 = require("../../types/customer");
const CustomerService = {
    getAllCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.customer.findMany({ orderBy: [{ created: "desc" }] });
        });
    },
    getCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield prisma_1.prisma.customer.findUnique({ where: { id } });
                if (!customer) {
                    return { customer: null, statusCode: 404, error: "Customer's not been found!" };
                }
                else {
                    return { customer, statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { customer: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    loginCustomer(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield prisma_1.prisma.customer.findFirst({ where: { AND: [{ phone: `${customerData.phone}` }, { email: customerData.email }] } });
                console.log(customer);
                if (!customer) {
                    return { customer: null, statusCode: 400, error: "Wrong Credentials!" };
                }
                if (!(yield bcrypt_1.default.compare(customerData.password, customer.password))) {
                    return { customer: null, statusCode: 400, error: "Wrong Password!" };
                }
                return { customer, statusCode: 200, error: "" };
            }
            catch (err) {
                console.log(err);
                return { customer: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    registerCustomer(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield prisma_1.prisma.customer.findFirst({ where: { OR: [{ phone: `${customerData.phone}` }, { email: customerData.email }] } });
                if (customer) {
                    return { newCustomer: null, statusCode: 409, error: "Customer with this phone number or email already exists!" };
                }
                else {
                    const customerRegisterData = {
                        name: customerData.name,
                        email: customerData.email,
                        phone: `${customerData.phone}`,
                    };
                    const hashedPassword = yield bcrypt_1.default.hash(customerData.password, 10);
                    const newCustomer = yield prisma_1.prisma.customer.create({
                        data: Object.assign(Object.assign({}, customerRegisterData), { password: hashedPassword })
                    });
                    return { newCustomer, statusCode: 201, error: "" };
                }
            }
            catch (err) {
                console.log(err);
                return { newCustomer: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    updateCustomer(id, customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield prisma_1.prisma.customer.findUnique({ where: { id } });
                if (!customer) {
                    return { statusCode: 404, error: "Customer has not been found!" };
                }
                else {
                    let hashedPassword;
                    if (customerData.password && customerData.newPassword && customerData.newConfirmPassword) {
                        if (!(yield bcrypt_1.default.compare(customerData.password, customer.password))) {
                            return { statusCode: 400, error: "Password is incorrect!" };
                        }
                        if (customerData.newPassword !== customerData.newConfirmPassword) {
                            return { statusCode: 400, error: "Password did not match!" };
                        }
                        hashedPassword = yield bcrypt_1.default.hash(customerData.newPassword, 10);
                    }
                    const newDate = {
                        name: customerData.name,
                        email: customerData.email,
                        status: customerData.status,
                        gender: customerData.gender,
                        phone: customerData.phone,
                        birthDate: customerData.birthDate,
                        password: customerData.password
                    };
                    yield prisma_1.prisma.customer.update({ where: { id }, data: Object.assign(Object.assign({}, newDate), { password: hashedPassword !== null && hashedPassword !== void 0 ? hashedPassword : customer.password, updated: new Date() }) });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                console.log(err);
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    changeCustomerStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield prisma_1.prisma.customer.findUnique({ where: { id } });
                if (!customer) {
                    return { statusCode: 404, error: "Customer's not been found" };
                }
                else {
                    yield prisma_1.prisma.customer.update({ where: { id }, data: { status: customer_1.CustomerStatus[status], updated: new Date() } });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deleteCustomer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customer = yield prisma_1.prisma.customer.findUnique({ where: { id } });
                if (!customer) {
                    return { statusCode: 404, error: "Customer's not been found" };
                }
                else {
                    yield prisma_1.prisma.customer.delete({ where: { id } });
                    return { statusCode: 204, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request" };
            }
        });
    },
    getAllCustomerAddresses(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.customerAdress.findMany({ where: { customerId } });
        });
    },
    updateCustomerAddress(addressId, customerId, customerAddressData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerAddress = yield prisma_1.prisma.customerAdress.findUnique({ where: { id: addressId } });
                if (!customerAddress) {
                    return { statusCode: 404, error: "Customer address has not been found!" };
                }
                else {
                    yield prisma_1.prisma.customerAdress.update({
                        where: { id: addressId },
                        data: Object.assign({}, customerAddressData)
                    });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                console.log(err);
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    createCustomerAddress(customerId, customerAddressData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerAddresses = yield prisma_1.prisma.customerAdress.findMany({ where: { customerId } });
                if (customerAddresses.length === 0) {
                    const newAddress = yield prisma_1.prisma.customerAdress.create({
                        data: Object.assign(Object.assign({}, customerAddressData), { customerId: customerId, isDefault: true })
                    });
                    return { newAddress, statusCode: 201, error: "" };
                }
                else {
                    const newAddress = yield prisma_1.prisma.customerAdress.create({
                        data: Object.assign(Object.assign({}, customerAddressData), { customerId: customerId })
                    });
                    return { newAddress, statusCode: 201, error: "" };
                }
            }
            catch (err) {
                console.log(err);
                return { newAddress: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    setDefaultCustomerAddress(addressId, customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma_1.prisma.customerAdress.updateMany({ where: { customerId }, data: { isDefault: false } });
                yield prisma_1.prisma.customerAdress.update({
                    where: { id: addressId },
                    data: { isDefault: true }
                });
                return { statusCode: 200, error: "" };
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deleteCustomerAddress(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerAddress = yield prisma_1.prisma.customerAdress.findUnique({ where: { id: addressId } });
                if (!customerAddress) {
                    return { statusCode: 404, error: "Customer address has not been found!" };
                }
                else {
                    yield prisma_1.prisma.customerAdress.delete({
                        where: { id: addressId },
                    });
                    return { statusCode: 204, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
};
exports.default = CustomerService;
