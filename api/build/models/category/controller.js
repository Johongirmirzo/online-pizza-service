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
const CategoryController = {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield service_1.default.getAllCategories();
            return res.json({ data: categories });
        });
    },
    getCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ errors: "Invalid id, please provide only integers!" });
            }
            const category = yield service_1.default.getCategory(id);
            if (!category) {
                return res.status(404).json({ errors: "Category with the given id does not exist" });
            }
            return res.json({ data: category });
        });
    },
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newCategory, statusCode, error } = yield service_1.default.createCategory(req.body, req.file);
            if (statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newCategory });
            }
        });
    },
    editCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.editCategory(id, req.body, req.file);
            if (statusCode === 400 || statusCode === 404 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: { message: "Category is edited successfully" } });
            }
        });
    },
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.deleteCategory(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    }
};
exports.default = CategoryController;
