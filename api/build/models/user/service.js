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
const bcrypt_1 = __importDefault(require("bcrypt"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = require("../../config/prisma");
const token_1 = require("../../types/token");
const user_1 = require("../../types/user");
const cloudinary_1 = __importStar(require("../../config/cloudinary"));
const UserService = {
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
                if (!user) {
                    return { user: null, statusCode: 404, error: 'Email does not exist' };
                }
                else {
                    if (!(yield bcrypt_1.default.compare(password, user.password))) {
                        return {
                            user: null,
                            statusCode: 400,
                            error: 'Password did not match',
                        };
                    }
                    else {
                        return { user, statusCode: 200, error: '' };
                    }
                }
            }
            catch (err) {
                return { user: null, statusCode: 400, error: 'Bad Request' };
            }
        });
    },
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.prisma.user.findMany({ orderBy: [{ created: 'desc' }] })).filter((user) => token_1.Role[user.role] != token_1.Role.ADMIN);
        });
    },
    getUser(id, reqObject) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
                if (!user) {
                    return { user: null, statusCode: 404, error: 'User has not been found' };
                }
                else {
                    if (user.role === 'ADMIN' && reqObject.role !== 'ADMIN') {
                        return {
                            user: null,
                            statusCode: 403,
                            error: "ADMIN can't be retrieved",
                        };
                    }
                    else {
                        return { user, statusCode: 200, error: '' };
                    }
                }
            }
            catch (err) {
                return { user: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    createNewUser(userData, userPhotoFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: userData.email },
                            { phoneNumber: userData.phoneNumber },
                        ],
                    },
                });
                if (user) {
                    if (userPhotoFile) {
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${userPhotoFile.filename}`));
                    }
                    return {
                        newUser: null,
                        statusCode: 409,
                        error: `User with this ${userData.email ? userData.email : ''} or ${userData.phoneNumber ? userData.phoneNumber : ''} already exists!`,
                    };
                }
                else {
                    let userPhoto;
                    if (userPhotoFile) {
                        userPhoto = yield cloudinary_1.default.v2.uploader.upload(userPhotoFile.path, cloudinary_1.options);
                    }
                    const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                    const newUser = yield prisma_1.prisma.user.create({
                        data: Object.assign(Object.assign({}, userData), { password: hashedPassword, photo: (userPhoto === null || userPhoto === void 0 ? void 0 : userPhoto.secure_url) || '', photo_id: (userPhoto === null || userPhoto === void 0 ? void 0 : userPhoto.public_id) || '' }),
                    });
                    return { newUser, statusCode: 201, error: '' };
                }
            }
            catch (err) {
                if (userPhotoFile) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${userPhotoFile.filename}`));
                }
                return { newUser: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    editUser(id, userData, userPhotoFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userWithGivenData = yield prisma_1.prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: userData.email },
                            { phoneNumber: userData.phoneNumber },
                        ],
                    },
                });
                const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
                if (!user) {
                    if (userPhotoFile) {
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${userPhotoFile.filename}`));
                    }
                    return { user: null, statusCode: 404, error: "User's not been found" };
                }
                else {
                    let userPhoto;
                    let hashedPassword;
                    if (userWithGivenData) {
                        if (userWithGivenData.id !== user.id &&
                            (userWithGivenData.email == userData.email ||
                                userWithGivenData.phoneNumber !== userData.phoneNumber)) {
                            return {
                                user: null,
                                statusCode: 409,
                                error: `User with this ${userData.email ? userData.email : ''} ${userData.phoneNumber ? userData.phoneNumber : ''} already exists!`,
                            };
                        }
                    }
                    if (userData.password) {
                        if (!(yield bcrypt_1.default.compare(userData.password, user.password))) {
                            return {
                                user: null,
                                statusCode: 400,
                                error: 'Password is incorrect!',
                            };
                        }
                        else {
                            if ((userData.newPassword && !userData.newConfirmPassword) ||
                                (!userData.newPassword && userData.newConfirmPassword)) {
                                return {
                                    user: null,
                                    statusCode: 400,
                                    error: "You've to provide both new and new confirm password to change your password!",
                                };
                            }
                            if (userData.newPassword === userData.newConfirmPassword) {
                                hashedPassword = yield bcrypt_1.default.hash(userData.newPassword, 10);
                            }
                            else {
                                return {
                                    user: null,
                                    statusCode: 400,
                                    error: 'Password did not match!',
                                };
                            }
                        }
                    }
                    const filteredUserData = Object.entries(userData)
                        .filter((user) => !/newPassword|newConfirmPassword/i.test(user[0]))
                        .reduce((obj, currEl) => (Object.assign(Object.assign({}, obj), { [currEl[0]]: currEl[1] })), {});
                    if (userPhotoFile && user.photo) {
                        const imageSplit = user.photo.split('/');
                        const imagePath = imageSplit[imageSplit.length - 1];
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imagePath}`));
                        userPhoto = yield cloudinary_1.default.v2.uploader.upload(userPhotoFile.path, cloudinary_1.options);
                    }
                    else if (userPhotoFile && !user.photo) {
                        userPhoto = yield cloudinary_1.default.v2.uploader.upload(userPhotoFile.path, cloudinary_1.options);
                    }
                    console.log(filteredUserData);
                    const updatedUser = yield prisma_1.prisma.user.update({
                        where: { id },
                        data: Object.assign(Object.assign({}, filteredUserData), { photo: (userPhoto === null || userPhoto === void 0 ? void 0 : userPhoto.secure_url) || user.photo, photo_id: (userPhoto === null || userPhoto === void 0 ? void 0 : userPhoto.public_id) || user.photo_id, password: hashedPassword || user.password, updated: new Date() }),
                    });
                    return { user: updatedUser, statusCode: 200, error: '' };
                }
            }
            catch (err) {
                console.log(err);
                if (userPhotoFile) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${userPhotoFile.filename}`));
                }
                return { user: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    deleteUserService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
                if ((user === null || user === void 0 ? void 0 : user.role) === 'ADMIN') {
                    return { statusCode: 403, error: "ADMIN can't be deleted!" };
                }
                else if (!user) {
                    return { statusCode: 404, error: 'User has not been found' };
                }
                else {
                    if (user.photo && user.photo_id) {
                        const imageSplit = user.photo.split('/');
                        const imagePath = imageSplit[imageSplit.length - 1];
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imagePath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(user.photo_id);
                    }
                    yield prisma_1.prisma.user.delete({ where: { id } });
                    return { statusCode: 204, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    changeUserStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield prisma_1.prisma.user.findUnique({ where: { id } });
                if ((user === null || user === void 0 ? void 0 : user.role) === 'ADMIN') {
                    return { statusCode: 403, error: "ADMIN status can't be changed" };
                }
                else if (!user) {
                    return { statusCode: 404, error: 'User has not been found' };
                }
                else {
                    yield prisma_1.prisma.user.update({
                        where: {
                            id,
                        },
                        data: {
                            status: user_1.UserStatus[status],
                            updated: new Date(),
                        },
                    });
                    return { statusCode: 200, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
};
exports.default = UserService;
