"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = require("../../middleware/verifyUser");
const isAllowedToAccess_1 = require("../../middleware/isAllowedToAccess");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const validations_1 = require("../../middleware/validations");
const validations_2 = require("../../validations");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.get("/get-all-toppings", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, controller_1.default.getAllToppings);
router.get("/get-topping/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, controller_1.default.getTopping);
router.post("/create-topping", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, (0, validations_1.validateData)(validations_2.topping), controller_1.default.createTopping);
router.patch("/edit-topping/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, (0, validations_1.validateData)(validations_2.editTopping), controller_1.default.editTopping);
router.delete("/delete-topping/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteTopping);
exports.default = router;
