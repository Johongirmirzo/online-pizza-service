"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_1 = require("../../middleware/isAdmin");
const verifyUser_1 = require("../../middleware/verifyUser");
const rateLimiter_1 = require("../../middleware/rateLimiter");
const verifyCustomer_1 = require("../../middleware/verifyCustomer");
const validations_1 = require("../../middleware/validations");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const validations_2 = require("../../validations");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.get("/get-all-customers", controller_1.default.getAllCustomers);
router.get("/get-customer/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getCustomer);
router.post("/login", (0, validations_1.validateData)(validations_2.loginCustomer), controller_1.default.loginCustomer);
router.post("/register", (0, validations_1.validateData)(validations_2.registerCustomer), (0, rateLimiter_1.limitApiRequestByHours)(6, 1, rateLimiter_1.rateLimitMessages.customerRegister(6)), controller_1.default.registerCustomer);
router.patch("/update-customer/:id", verifyCustomer_1.verifyCustomer, (0, validations_1.validateData)(validations_2.editCustomer), validateReqParamForId_1.validateReqParamForId, controller_1.default.updateCustomer);
router.patch("/change-customer-status/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.changeCustomerStatus);
router.delete("/delete-customer/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteCustomer);
router.get("/get-all-customer-addresses/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getAllCustomerAddresses);
router.patch("/update-customer-address/:addressId/:customerId", (0, validations_1.validateData)(validations_2.editCustomerAddressFormData), controller_1.default.updateCustomerAddress);
router.patch("/set-default-customer-address/:addressId/:customerId", controller_1.default.setDefaultCustomerAddress);
router.post("/create-customer-address/:id", (0, validations_1.validateData)(validations_2.createCustomerAddressFormData), controller_1.default.createCustomerAddress);
router.delete("/delete-customer-address/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteCustomerAddress);
exports.default = router;
