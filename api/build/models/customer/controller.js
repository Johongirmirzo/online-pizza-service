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
const service_1 = __importDefault(require("./service"));
const generateToken_1 = require("../../utils/generateToken");
const customer_1 = require("../../types/customer");
const CustomerController = {
    getAllCustomers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const customers = yield service_1.default.getAllCustomers();
            res.json({ data: customers });
        });
    },
    getCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { customer, statusCode, error } = yield service_1.default.getCustomer(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.json({ data: customer });
            }
        });
    },
    loginCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customer, statusCode, error } = yield service_1.default.loginCustomer(req.body);
                if (statusCode === 400 && !customer) {
                    return res.status(statusCode).json({ errors: error });
                }
                else {
                    if (customer) {
                        const { id, phone, status } = customer;
                        const { ACCESS_TOKEN_PRIVATE_KEY, ACCESS_TOKEN_EXPIRATION_TIME, REFRESH_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_EXPIRATION_TIME } = process.env;
                        const accessToken = (0, generateToken_1.generateToken)({ id, phone, status: customer_1.CustomerStatus[status] }, `${ACCESS_TOKEN_PRIVATE_KEY}`, `${ACCESS_TOKEN_EXPIRATION_TIME}`);
                        const refreshToken = (0, generateToken_1.generateToken)({ id, phone, status: customer_1.CustomerStatus[status] }, `${REFRESH_TOKEN_PRIVATE_KEY}`, `${REFRESH_TOKEN_EXPIRATION_TIME}`);
                        res.json({ data: { accessToken, refreshToken, customer } });
                    }
                }
            }
            catch (err) {
                res.status(400).json({ errors: err.message });
            }
        });
    },
    registerCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newCustomer, statusCode, error } = yield service_1.default.registerCustomer(req.body);
            if (statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newCustomer });
            }
        });
    },
    updateCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.updateCustomer(id, req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(400).json({ errors: error });
            }
            else {
                return res.json({ data: { message: `Data has changed successfully` } });
            }
        });
    },
    changeCustomerStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { status } = req.body;
            const { statusCode, error } = yield service_1.default.changeCustomerStatus(id, status);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.json({ message: "Customer status changed successfully!" });
            }
        });
    },
    deleteCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ errors: "Please provide only integer for id" });
            }
            const { statusCode, error } = yield service_1.default.deleteCustomer(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(204).end();
            }
        });
    },
    getAllCustomerAddresses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const customerAddresses = yield service_1.default.getAllCustomerAddresses(id);
            return res.json({ data: customerAddresses });
        });
    },
    updateCustomerAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const addressId = Number(req.params.addressId);
            const customerId = Number(req.params.customerId);
            const { statusCode, error } = yield service_1.default.updateCustomerAddress(addressId, customerId, req.body);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Customer address is updated successfully!" });
            }
        });
    },
    createCustomerAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            console.log(id, req.body);
            const { newAddress, statusCode, error } = yield service_1.default.createCustomerAddress(id, req.body);
            if (statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newAddress });
            }
        });
    },
    deleteCustomerAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.deleteCustomerAddress(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
};
exports.default = CustomerController;
