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
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../config/prisma");
const ToppingService = {
    getAllToppings() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.topping.findMany({ orderBy: [{ created: 'desc' }] });
        });
    },
    getTopping(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topping = yield prisma_1.prisma.topping.findUnique({ where: { id } });
                if (!topping) {
                    return {
                        topping: null,
                        statusCode: 404,
                        error: 'Topping has not been found!',
                    };
                }
                else {
                    return { topping, statusCode: 200, error: '' };
                }
            }
            catch (err) {
                return { topping: null, statusCode: 400, error: 'Bad Request!' };
            }
        });
    },
    createTopping(toppingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const toppingExistWithGivenData = yield prisma_1.prisma.topping.findFirst({
                    where: {
                        AND: [
                            { type: toppingData.type },
                            { forPizzaSize: toppingData.forPizzaSize },
                            { name: toppingData.name },
                        ],
                    },
                });
                if (toppingExistWithGivenData) {
                    return {
                        newTopping: null,
                        statusCode: 409,
                        error: `Topping with name: [${toppingExistWithGivenData.name}] and type [${toppingExistWithGivenData.type}] and pizza size [${toppingExistWithGivenData.forPizzaSize}] already exists!`,
                    };
                }
                const newTopping = yield prisma_1.prisma.topping.create({
                    data: Object.assign({}, toppingData),
                });
                return { newTopping, statusCode: 201, error: '' };
            }
            catch (err) {
                return { newTopping: null, statusCode: 400, error: 'Bad Request' };
            }
        });
    },
    editTopping(id, toppingData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const toppingExistWithGivenData = yield prisma_1.prisma.topping.findFirst({
                    where: {
                        AND: [
                            { type: toppingData === null || toppingData === void 0 ? void 0 : toppingData.type },
                            { forPizzaSize: toppingData === null || toppingData === void 0 ? void 0 : toppingData.forPizzaSize },
                            { name: toppingData === null || toppingData === void 0 ? void 0 : toppingData.name },
                        ],
                    },
                });
                const topping = yield prisma_1.prisma.topping.findUnique({ where: { id } });
                console.log('TOpping with given data', toppingExistWithGivenData);
                if (!topping) {
                    return { statusCode: 404, error: "Topping's not been found" };
                }
                else {
                    if (toppingExistWithGivenData &&
                        topping.id !== toppingExistWithGivenData.id) {
                        return {
                            statusCode: 409,
                            error: `Topping with name: [${toppingExistWithGivenData.name}] and type [${toppingExistWithGivenData.type}] and pizza size [${toppingExistWithGivenData.forPizzaSize}] already exists!`,
                        };
                    }
                    yield prisma_1.prisma.topping.update({
                        where: { id },
                        data: Object.assign(Object.assign({}, toppingData), { updated: new Date() }),
                    });
                    return { statusCode: 200, error: '' };
                }
            }
            catch (err) {
                console.log(err.message);
                return { statusCode: 400, error: 'Bad Request' };
            }
        });
    },
    deleteTopping(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const topping = yield prisma_1.prisma.topping.findUnique({ where: { id } });
                if (!topping) {
                    return { statusCode: 404, error: 'Current topping does not exist!' };
                }
                else {
                    yield prisma_1.prisma.topping.delete({ where: { id } });
                    return { statusCode: 204, error: '' };
                }
            }
            catch (err) {
                return { statusCode: 400, error: 'Bad Request' };
            }
        });
    },
};
exports.default = ToppingService;
