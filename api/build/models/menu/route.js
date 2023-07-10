"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const verifyUser_1 = require("../../middleware/verifyUser");
const isAllowedToAccess_1 = require("../../middleware/isAllowedToAccess");
const uploadImage_1 = require("../../middleware/uploadImage");
const controller_1 = __importDefault(require("./controller"));
const isAdmin_1 = require("../../middleware/isAdmin");
const router = (0, express_1.Router)();
router.get("/get-all-dips", controller_1.default.getAllDips);
router.get("/get-dip/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getDip);
router.post("/create-dip", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, uploadImage_1.uploadImage.single("dip-photo"), controller_1.default.createDip);
router.patch("/edit-dip/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, uploadImage_1.uploadImage.single("dip-photo"), controller_1.default.editDip);
router.patch("/change-dip-status/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, controller_1.default.changeDipStatus);
router.delete("/delete-dip/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteDip);
router.get("/get-all-menu-items", controller_1.default.getAllMenuItems);
router.get("/get-menu-item/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getMenuItem);
router.post("/create-menu-item", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, uploadImage_1.uploadImage.fields([{ name: "small" }, { name: "medium" }, { name: "large" }]), controller_1.default.createMenuItem);
router.patch("/edit-menu-item/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, uploadImage_1.uploadImage.fields([{ name: "small" }, { name: "medium" }, { name: "large" },]), controller_1.default.editMenuItem);
router.patch("/change-menu-item-status/:id", verifyUser_1.verifyUser, isAllowedToAccess_1.isAllowedToAccess, validateReqParamForId_1.validateReqParamForId, controller_1.default.changeMenuItemStatus);
router.delete("/delete-menu-item/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteMenuItem);
router.get("/get-all-pizzas", controller_1.default.getAllPizzas);
router.get("/get-pizza/:id", validateReqParamForId_1.validateReqParamForId, controller_1.default.getPizza);
router.post("/create-pizza", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, uploadImage_1.uploadImage.fields([{ name: "small" }, { name: "medium" }, { name: "large" }]), controller_1.default.createPizza);
router.patch("/edit-pizza/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, uploadImage_1.uploadImage.fields([{ name: "small" }, { name: "medium" }, { name: "large" }]), controller_1.default.editPizza);
router.patch("/change-pizza-status/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.changePizzaStatus);
router.delete("/delete-pizza/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deletePizza);
exports.default = router;
