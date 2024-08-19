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
const ApplicantController = {
    getAllApplicants(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicants = yield service_1.default.getAllApplicants();
            return res.json({ data: applicants });
        });
    },
    getApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { applicant, statusCode, error } = yield service_1.default.getApplicant(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                res.json({ data: applicant });
            }
        });
    },
    createApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newApplicant, statusCode, error } = yield service_1.default.createApplicant(req.body, req.files);
            if (!newApplicant) {
                return res.status(statusCode).json({ errors: error });
            }
            return res.status(201).json({ data: newApplicant });
        });
    },
    changeApplicantStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { status } = req.body;
            const { error, statusCode } = yield service_1.default.changeApplicantStatus(id, status);
            if (statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            return res
                .status(statusCode)
                .json({
                message: `Application status is changed to ${status} successfully!`,
            });
        });
    },
    deleteApplicant(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { statusCode, error } = yield service_1.default.deleteApplicant(id);
            if (statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            return res.status(statusCode).end();
        });
    },
};
exports.default = ApplicantController;
