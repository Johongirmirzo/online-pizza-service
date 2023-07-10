"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../../config/prisma");
const applicant_1 = require("../../types/applicant");
const cloudinary_1 = __importStar(require("../../config/cloudinary"));
const ApplicantService = {
    getAllApplicants() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.application.findMany({ include: { teamMembers: true, drivers: true, managers: true } });
        });
    },
    getApplicant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applicant = yield prisma_1.prisma.application.findUnique({ where: { id } });
                if (!applicant) {
                    return { applicant: null, statusCode: 404, error: "Applicant's not been found!" };
                }
                else {
                    return { applicant, statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { applicant: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    createApplicant(data, files) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let applicantData;
                const applicationData = Object.entries(data).filter(d => d[0] !== "applicant").reduce((obj, el) => {
                    const encodedData = el[1];
                    if (/experiences|languages|computerSkills/i.test(el[0])) {
                        console.log(el[1], encodedData);
                        const parsedData = JSON.parse(encodedData);
                        const key = el[0];
                        return Object.assign(Object.assign({}, obj), { [key]: parsedData });
                    }
                    return Object.assign(Object.assign({}, obj), { [el[0]]: el[0] == "hasBankAccount" ? JSON.parse(encodedData) : el[1] });
                }, {});
                const applicantPhoto = yield cloudinary_1.default.v2.uploader.upload(files.applicantPhoto[0].path, cloudinary_1.options);
                const passportPhoto = yield cloudinary_1.default.v2.uploader.upload(files.passportPhoto[0].path, cloudinary_1.options);
                const resume = yield cloudinary_1.default.v2.uploader.upload(files.resume[0].path, cloudinary_1.options);
                switch (data.role) {
                    case "TEAM_MEMBER":
                        applicantData = JSON.parse(data.applicant);
                        const newTeamMember = yield prisma_1.prisma.application.create({
                            data: Object.assign(Object.assign({}, applicationData), { birthDate: new Date(applicationData.birthDate), dateOfJoining: new Date(applicationData.dateOfJoining), photoUrl: applicantPhoto.secure_url, photoId: applicantPhoto.public_id, passportPhotoUrl: passportPhoto.secure_url, passportPhotoId: applicantPhoto.public_id, resumeUrl: resume.secure_url, resumeId: applicantPhoto.public_id, role: applicant_1.ApplicantRole[applicationData.role], teamMembers: {
                                    create: Object.assign(Object.assign({}, applicantData), { employmentType: applicant_1.EmploymentType[applicantData.employmentType] })
                                } })
                        });
                        return { newApplicant: newTeamMember, statusCode: 201, error: "" };
                    case "DRIVER":
                        applicantData = JSON.parse(data.applicant);
                        const newDriver = yield prisma_1.prisma.application.create({
                            data: Object.assign(Object.assign({}, applicationData), { birthDate: new Date(applicationData.birthDate), dateOfJoining: new Date(applicationData.dateOfJoining), photoUrl: applicantPhoto.secure_url, photoId: applicantPhoto.public_id, passportPhotoUrl: passportPhoto.secure_url, passportPhotoId: applicantPhoto.public_id, resumeUrl: resume.secure_url, resumeId: applicantPhoto.public_id, role: applicant_1.ApplicantRole[applicationData.role], drivers: {
                                    create: Object.assign(Object.assign({}, applicantData), { drivingLicence: applicant_1.DrivingLicense[applicantData.drivingLicence], employmentType: applicant_1.EmploymentType[applicantData.employmentType] })
                                } })
                        });
                        return { newApplicant: newDriver, statusCode: 201, error: "" };
                    case "MANAGER":
                    case "AREA_COACH":
                        const panPhoto = yield cloudinary_1.default.v2.uploader.upload(files.panPhoto[0].path, cloudinary_1.options);
                        applicantData = JSON.parse(data.applicant);
                        const newManager = yield prisma_1.prisma.application.create({
                            data: Object.assign(Object.assign({}, applicationData), { birthDate: new Date(applicationData.birthDate), dateOfJoining: new Date(applicationData.dateOfJoining), photoUrl: applicantPhoto.secure_url, photoId: applicantPhoto.public_id, passportPhotoUrl: passportPhoto.secure_url, passportPhotoId: applicantPhoto.public_id, resumeUrl: resume.secure_url, resumeId: applicantPhoto.public_id, role: applicant_1.ApplicantRole[applicationData.role], managers: {
                                    create: Object.assign(Object.assign({}, applicantData), { panPhoto: panPhoto.secure_url, panPhotoId: panPhoto.public_id })
                                } })
                        });
                        return { newApplicant: newManager, statusCode: 201, error: "" };
                    default:
                        return { newApplicant: null, statusCode: 400, error: "Bad Request" };
                }
            }
            catch (err) {
                console.log(err);
                fs_1.default.rm(path_1.default.join(__dirname, `../../assets/images/${files.applicantPhoto[0].path}`), () => { });
                fs_1.default.rm(path_1.default.join(__dirname, `../../assets/images/${files.passportPhoto[0].path}`), () => { });
                fs_1.default.rm(path_1.default.join(__dirname, `../../assets/images/${files.resume[0].path}`), () => { });
                return { newApplicant: null, statusCode: 400, error: "Bad Request" };
            }
        });
    },
    changeApplicantStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicant = yield prisma_1.prisma.application.findUnique({ where: { id: id } });
            if (!applicant) {
                return { error: "Applicant has not been found!", statusCode: 404 };
            }
            else {
                yield prisma_1.prisma.application.update({
                    where: { id },
                    data: {
                        applicationStatus: applicant_1.ApplicantStatus[status]
                    }
                });
                return { error: "", statusCode: 200 };
            }
        });
    },
    deleteApplicant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const applicant = yield prisma_1.prisma.application.findUnique({ where: { id } });
            if (!applicant) {
                return { error: "User has not been found!", statusCode: 404 };
            }
            else {
                if (/manager|area_coach/i.test(applicant.role)) {
                    const manager = yield prisma_1.prisma.manager.findFirst({ where: { applicantId: applicant.id } });
                    if (manager) {
                        yield cloudinary_1.default.v2.uploader.destroy(manager.panPhotoId);
                    }
                }
                yield cloudinary_1.default.v2.uploader.destroy(applicant.photoId);
                yield cloudinary_1.default.v2.uploader.destroy(applicant.passportPhotoId);
                yield cloudinary_1.default.v2.uploader.destroy(applicant.resumeId);
                yield prisma_1.prisma.application.delete({ where: { id } });
                return { error: "", statusCode: 204 };
            }
        });
    },
};
exports.default = ApplicantService;
