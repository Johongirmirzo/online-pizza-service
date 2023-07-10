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
const MenuController = {
    getAllDips(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dips = yield service_1.default.getAllDips();
            return res.json({ data: dips });
        });
    },
    getDip(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { dip, statusCode, error } = yield service_1.default.getDip(id);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: dip });
            }
        });
    },
    createDip(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newDip, statusCode, error } = yield service_1.default.createDip(req.body, req.file);
            if (statusCode === 404 || statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newDip });
            }
        });
    },
    editDip(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.editDip(id, req.body, req.file);
            if (statusCode === 404 || statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Dip is edited successfully" });
            }
        });
    },
    changeDipStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.changeDipStatus(id, req.body.status);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Dip status is changed successfully" });
            }
        });
    },
    deleteDip(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.deleteDip(id);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
    getAllMenuItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuItems = yield service_1.default.getAllMenuItems();
            return res.json({ data: menuItems });
        });
    },
    getMenuItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { menuItem, statusCode, error } = yield service_1.default.getMenuItem(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: menuItem });
            }
        });
    },
    createMenuItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newMenuItem, statusCode, error } = yield service_1.default.createMenuItem(req.body, req.files);
            if (statusCode === 404 || statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newMenuItem });
            }
        });
    },
    editMenuItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.editMenuItem(id, req.body, req.files);
            if (statusCode === 400 || statusCode === 404 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Menu item status is edited successfully!" });
            }
        });
    },
    changeMenuItemStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.changeMenuItemStatus(id, req.body.status);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ message: "Menu item status is changed successfully!" });
            }
        });
    },
    deleteMenuItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { error, statusCode } = yield service_1.default.deleteMenuItem(id);
            if (statusCode === 400 || statusCode === 404) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
    getAllPizzas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pizzas = yield service_1.default.getAllPizzas();
            return res.json({ data: pizzas });
        });
    },
    getPizza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { pizza, statusCode, error } = yield service_1.default.getPizza(id);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: pizza });
            }
        });
    },
    createPizza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPizza, statusCode, error } = yield service_1.default.createPizza(req.body, req.files);
            if (statusCode === 404 || statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: newPizza });
            }
        });
    },
    editPizza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.editPizza(id, req.body, req.files);
            if (statusCode === 404 || statusCode === 400 || statusCode === 409) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: { message: "Pizza is updated successfully!" } });
            }
        });
    },
    changePizzaStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.changePizzaStatus(id, req.body.status);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).json({ data: { message: "Pizza status is changed successfully!" } });
            }
        });
    },
    deletePizza(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const { statusCode, error } = yield service_1.default.deletePizza(id);
            if (statusCode === 404 || statusCode === 400) {
                return res.status(statusCode).json({ errors: error });
            }
            else {
                return res.status(statusCode).end();
            }
        });
    },
};
exports.default = MenuController;
