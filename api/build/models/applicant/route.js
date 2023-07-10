"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyUser_1 = require("../../middleware/verifyUser");
const isAdmin_1 = require("../../middleware/isAdmin");
const uploadImage_1 = require("../../middleware/uploadImage");
const validateReqParamForId_1 = require("../../middleware/validateReqParamForId");
const controller_1 = __importDefault(require("./controller"));
const router = (0, express_1.Router)();
router.get("/get-all-applicants", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, controller_1.default.getAllApplicants);
router.get("/get-applicant/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.getApplicant);
router.post("/create-applicant", uploadImage_1.uploadImage.fields([{ name: "applicantPhoto" }, { name: "passportPhoto" }, { name: "resume" }, { name: "panPhoto" }]), controller_1.default.createApplicant);
router.patch("/change-applicant-status/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.changeApplicantStatus);
router.delete("/delete-applicant/:id", verifyUser_1.verifyUser, isAdmin_1.isUserAdmin, validateReqParamForId_1.validateReqParamForId, controller_1.default.deleteApplicant);
exports.default = router;
