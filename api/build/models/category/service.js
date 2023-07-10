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
const cloudinary_1 = __importStar(require("../../config/cloudinary"));
const CategoryService = {
    getAllCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.category.findMany({ include: { pizzas: true, dips: true, menuItems: true }, orderBy: [{ created: "desc" }] });
        });
    },
    getCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.category.findUnique({ where: { id }, include: { pizzas: true, dips: true, menuItems: true } });
        });
    },
    createCategory(categoryData, categoryPhotoFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma_1.prisma.category.findUnique({ where: { name: categoryData.name } });
                if (category) {
                    if (categoryPhotoFiles) {
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`));
                    }
                    return { newCategory: null, statusCode: 409, error: "Category with the given name already exists!" };
                }
                else {
                    console.log(categoryPhotoFiles);
                    const categoryPhoto = yield cloudinary_1.default.v2.uploader.upload(categoryPhotoFiles.path, cloudinary_1.options);
                    const newCategory = yield prisma_1.prisma.category.create({ data: Object.assign(Object.assign({}, categoryData), { photo: categoryPhoto.secure_url, photo_id: categoryPhoto.public_id }) });
                    return { newCategory, statusCode: 201, error: "" };
                }
            }
            catch (err) {
                if (categoryPhotoFiles) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`));
                }
                return { newCategory: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    editCategory(id, categoryData, categoryPhotoFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma_1.prisma.category.findUnique({ where: { id } });
                const categoryWithGivenName = yield prisma_1.prisma.category.findUnique({ where: { name: categoryData === null || categoryData === void 0 ? void 0 : categoryData.name } });
                if (!category) {
                    if (categoryPhotoFiles) {
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`));
                    }
                    return { statusCode: 404, error: "Category's not been found!" };
                }
                else {
                    if (categoryWithGivenName) {
                        if (categoryWithGivenName.name !== category.name) {
                            if (categoryPhotoFiles) {
                                fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`));
                            }
                            return { statusCode: 409, error: "Category with the given name already exists!" };
                        }
                    }
                    let categoryPhoto;
                    if (categoryPhotoFiles) {
                        const imageSplit = category.photo.split("/");
                        const imagePath = imageSplit[imageSplit.length - 1];
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imagePath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(category.photo_id);
                        categoryPhoto = yield cloudinary_1.default.v2.uploader.upload(categoryPhotoFiles.path, cloudinary_1.options);
                    }
                    yield prisma_1.prisma.category.update({
                        where: { id },
                        data: Object.assign(Object.assign({}, categoryData), { photo: (categoryPhoto === null || categoryPhoto === void 0 ? void 0 : categoryPhoto.secure_url) || category.photo, photo_id: (categoryPhoto === null || categoryPhoto === void 0 ? void 0 : categoryPhoto.public_id) || category.photo_id, updated: new Date() })
                    });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                if (categoryPhotoFiles) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${categoryPhotoFiles.filename}`));
                }
                return { newCategory: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const category = yield prisma_1.prisma.category.findUnique({ where: { id } });
                if (!category) {
                    return { statusCode: 404, error: "Category's not been found!" };
                }
                else {
                    const imageSplit = category.photo.split("/");
                    const imagePath = imageSplit[imageSplit.length - 1];
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imagePath}`));
                    yield cloudinary_1.default.v2.uploader.destroy(category.photo_id);
                    yield prisma_1.prisma.category.delete({ where: { id } });
                    return { statusCode: 204, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad request!" };
            }
        });
    }
};
exports.default = CategoryService;
