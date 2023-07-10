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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../config/prisma");
const cloudinary_1 = __importStar(require("../../config/cloudinary"));
const MenuService = {
    getAllDips() {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash("qweqweqwe", 10);
            const user = yield prisma_1.prisma.user.create({
                data: {
                    name: "Jaxongir",
                    email: "jaxongir@gmail.com",
                    phoneNumber: "+998991112211",
                    status: "ACTIVE",
                    role: "ADMIN",
                    password: hashedPassword,
                }
            });
            console.log("ADMIN USER", user);
            return yield prisma_1.prisma.dip.findMany({ orderBy: [{ created: "desc" }] });
        });
    },
    getDip(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dip = yield prisma_1.prisma.dip.findUnique({ where: { id } });
                if (!dip) {
                    return { dip: null, statusCode: 404, error: "Dip has not been found" };
                }
                else {
                    return { dip, statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { dip: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    createDip(dipData, dipPhotoFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dip = yield prisma_1.prisma.dip.findUnique({ where: { type: dipData.type } });
                if (dip) {
                    if (dipPhotoFile) {
                        fs_1.default.rm(path_1.default.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), () => { });
                    }
                    return { newDip: null, statusCode: 409, error: `Current dip: [${dipData.type}] already exists!` };
                }
                else {
                    const nutritionalValue = JSON.parse(dipData.nutritionalValue);
                    const dipPhoto = yield cloudinary_1.default.v2.uploader.upload(dipPhotoFile.path, cloudinary_1.options);
                    const newDip = yield prisma_1.prisma.dip.create({
                        data: Object.assign(Object.assign({}, dipData), { price: Number(dipData.price), vegan: Boolean(dipData.vegan), weight: Number(dipData.weight), categoryId: Number(dipData.categoryId), photo: dipPhoto.secure_url, photo_id: dipPhoto.public_id, nutritionalValue })
                    });
                    return { newDip, statusCode: 201, error: "" };
                }
            }
            catch (err) {
                console.log(err);
                if (dipPhotoFile) {
                    fs_1.default.rm(path_1.default.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), () => { });
                }
                return { newDip: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    editDip(id, data, dipPhotoFile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dipData = {};
                const dipWithGivenData = yield prisma_1.prisma.dip.findUnique({ where: { type: data.type } });
                const dip = yield prisma_1.prisma.dip.findUnique({ where: { id } });
                if (!dip) {
                    if (dipPhotoFile) {
                        fs_1.default.rm(path_1.default.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), () => { });
                    }
                    return { statusCode: 404, error: "Dip's not been found!" };
                }
                else {
                    if (dipWithGivenData) {
                        if (dipWithGivenData.id !== dip.id &&
                            dipWithGivenData.type === data.type) {
                            return { statusCode: 409, error: `Dip type ${dip.type} is already exists!` };
                        }
                    }
                    dipData = Object.entries(data).reduce((obj, el) => {
                        return el[0] === "type" ? Object.assign(Object.assign({}, obj), { [el[0]]: el[1] }) : Object.assign(Object.assign({}, obj), { [el[0]]: JSON.parse(el[1]) });
                    }, {});
                    if (dipPhotoFile) {
                        const imageSplit = dip.photo.split("/");
                        const imgPath = imageSplit[imageSplit.length - 1];
                        console.log(imgPath);
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(dip.photo_id);
                        const dipPhoto = yield cloudinary_1.default.v2.uploader.upload(dipPhotoFile.path, cloudinary_1.options);
                        yield prisma_1.prisma.dip.update({
                            where: { id },
                            data: Object.assign(Object.assign({}, dipData), { photo: dipPhoto.secure_url, photo_id: dipPhoto.public_id, updated: new Date() })
                        });
                        return { statusCode: 200, error: "" };
                    }
                    else {
                        yield prisma_1.prisma.dip.update({
                            where: { id },
                            data: Object.assign(Object.assign({}, dipData), { updated: new Date() })
                        });
                        return { statusCode: 200, error: "" };
                    }
                }
            }
            catch (err) {
                console.log(err);
                if (dipPhotoFile) {
                    fs_1.default.rm(path_1.default.join(__dirname, `../../assets/images/${dipPhotoFile.filename}`), () => { });
                }
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    changeDipStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dip = yield prisma_1.prisma.dip.findUnique({ where: { id } });
                if (!dip) {
                    return { statusCode: 404, error: "Dip has not been found!" };
                }
                else {
                    yield prisma_1.prisma.dip.update({
                        where: { id },
                        data: {
                            status,
                            updated: new Date()
                        }
                    });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deleteDip(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dip = yield prisma_1.prisma.dip.findUnique({ where: { id } });
                if (!dip) {
                    return { statusCode: 404, error: "Dip has not been found!" };
                }
                else {
                    const imageSplit = dip.photo.split("/");
                    const imgPath = imageSplit[imageSplit.length - 1];
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                    yield cloudinary_1.default.v2.uploader.destroy(dip.photo_id);
                    yield prisma_1.prisma.dip.delete({ where: { id } });
                    return { statusCode: 204, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    getAllMenuItems() {
        return __awaiter(this, void 0, void 0, function* () {
            // await prisma.menuItem.deleteMany()
            return yield prisma_1.prisma.menuItem.findMany({ orderBy: [{ created: "desc" }] });
        });
    },
    getMenuItem(menuItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItem = yield prisma_1.prisma.menuItem.findUnique({ where: { id: menuItemId } });
                return menuItem ? { menuItem, statusCode: 200, error: "" } : { menuItem: null, statusCode: 404, error: "Menu Item's not been found" };
            }
            catch (err) {
                return { menuItem: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    createMenuItem(data, menuItemPhotos) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuItemData = Object
                .entries(data)
                .reduce((obj, el) => /pieces/i.test(el[0]) ? (Object.assign(Object.assign({}, obj), { [el[0]]: JSON.parse(el[1]) })) : (Object.assign(Object.assign({}, obj), { [el[0]]: el[1] })), {});
            const removePhoto = () => {
                if (menuItemPhotos.small) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${menuItemPhotos.small[0].filename}`));
                }
                if (menuItemPhotos.medium) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${menuItemPhotos.medium[0].filename}`));
                }
                if (menuItemPhotos.large) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${menuItemPhotos.large[0].filename}`));
                }
            };
            try {
                const menuItem = yield prisma_1.prisma.menuItem.findFirst({ where: { name: data.name } });
                if (menuItem) {
                    removePhoto();
                    return { newMenuItem: null, statusCode: 409, error: `Current menu item ${menuItem.name} already in the menu!` };
                }
                else {
                    let smallPhoto, mediumPhoto, largePhoto;
                    if (menuItemPhotos.small) {
                        smallPhoto = yield cloudinary_1.default.v2.uploader.upload(menuItemPhotos.small[0].path, cloudinary_1.options);
                    }
                    if (menuItemPhotos.medium) {
                        mediumPhoto = yield cloudinary_1.default.v2.uploader.upload(menuItemPhotos.medium[0].path, cloudinary_1.options);
                    }
                    if (menuItemPhotos.large) {
                        largePhoto = yield cloudinary_1.default.v2.uploader.upload(menuItemPhotos.large[0].path, cloudinary_1.options);
                    }
                    ;
                    const setPhoto = (index, cloudinaryPhoto) => {
                        menuItemData.pieces[index].photo = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.secure_url;
                        menuItemData.pieces[index].photo_id = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.public_id;
                    };
                    for (let i = 0; i < menuItemData.pieces.length; i++) {
                        switch (menuItemData.pieces[i].size.toLowerCase()) {
                            case "small":
                                if (smallPhoto) {
                                    setPhoto(i, smallPhoto);
                                }
                                break;
                            case "medium":
                                if (mediumPhoto) {
                                    setPhoto(i, mediumPhoto);
                                }
                                break;
                            case "large":
                                if (largePhoto) {
                                    setPhoto(i, largePhoto);
                                }
                                break;
                        }
                    }
                    console.log(menuItemData);
                    const newItem = yield prisma_1.prisma.menuItem.create({
                        data: Object.assign(Object.assign({}, menuItemData), { vegan: JSON.parse(`${menuItemData.vegan}`), categoryId: Number(menuItemData.categoryId), pieces: JSON.stringify(menuItemData.pieces) })
                    });
                    return { newMenuItem: newItem, statusCode: 201, error: "" };
                }
            }
            catch (err) {
                console.log(err);
                removePhoto();
                return { newMenuItem: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    editMenuItem(menuItemId, data, menuItemPhotos) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const menuItemData = Object
                .entries(data)
                .reduce((obj, el) => /pieces/i.test(el[0]) ? (Object.assign(Object.assign({}, obj), { [el[0]]: JSON.parse(el[1]) })) : (Object.assign(Object.assign({}, obj), { [el[0]]: el[1] })), {});
            const removePhoto = () => {
                if (menuItemPhotos.small) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${menuItemPhotos.small[0].filename}`));
                }
                if (menuItemPhotos.medium) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${menuItemPhotos.medium[0].filename}`));
                }
                if (menuItemPhotos.large) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${menuItemPhotos.large[0].filename}`));
                }
            };
            try {
                const menuItemWithGivenData = yield prisma_1.prisma.menuItem.findUnique({ where: { name: data.name } });
                const menuItem = yield prisma_1.prisma.menuItem.findUnique({ where: { id: menuItemId } });
                if (!menuItem) {
                    removePhoto();
                    return { statusCode: 404, error: `Menu item has not been found!` };
                }
                else {
                    const menuItemParsedPieces = JSON.parse(`${menuItem.pieces}`);
                    let modifiedPieces;
                    if (menuItemWithGivenData) {
                        if (menuItem.id !== menuItemWithGivenData.id &&
                            menuItemWithGivenData.name === menuItemData.name) {
                            removePhoto();
                            return { statusCode: 409, error: `Current menu item ${menuItemData.name} already in the menu!` };
                        }
                    }
                    let smallPhoto, mediumPhoto, largePhoto;
                    if (menuItemPhotos.small) {
                        smallPhoto = yield cloudinary_1.default.v2.uploader.upload(menuItemPhotos.small[0].path, cloudinary_1.options);
                    }
                    if (menuItemPhotos.medium) {
                        mediumPhoto = yield cloudinary_1.default.v2.uploader.upload(menuItemPhotos.medium[0].path, cloudinary_1.options);
                    }
                    if (menuItemPhotos.large) {
                        largePhoto = yield cloudinary_1.default.v2.uploader.upload(menuItemPhotos.large[0].path, cloudinary_1.options);
                    }
                    ;
                    const removeImgFromDirectory = (index) => __awaiter(this, void 0, void 0, function* () {
                        const imageSplit = menuItemParsedPieces[index].photo.split("/");
                        const imgPath = imageSplit[imageSplit.length - 1];
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(menuItemParsedPieces[index].photo_id);
                    });
                    const updateMenuItemPhoto = (index, cloudinaryPhoto) => {
                        menuItemData.pieces[index].photo = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.secure_url;
                        menuItemData.pieces[index].photo_id = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.public_id;
                    };
                    if (menuItemData.pieces.length) {
                        for (let i = 0; i < ((_a = menuItemData === null || menuItemData === void 0 ? void 0 : menuItemData.pieces) === null || _a === void 0 ? void 0 : _a.length); i++) {
                            switch (menuItemData.pieces[i].size.toLowerCase()) {
                                case "small":
                                    if (smallPhoto) {
                                        if (menuItemParsedPieces.length) {
                                            yield removeImgFromDirectory(i);
                                        }
                                        updateMenuItemPhoto(i, smallPhoto);
                                    }
                                    break;
                                case "medium":
                                    if (mediumPhoto) {
                                        if (menuItemParsedPieces.length) {
                                            yield removeImgFromDirectory(i);
                                        }
                                        updateMenuItemPhoto(i, mediumPhoto);
                                    }
                                    break;
                                case "large":
                                    if (largePhoto) {
                                        if (menuItemParsedPieces.length) {
                                            yield removeImgFromDirectory(i);
                                        }
                                        updateMenuItemPhoto(i, largePhoto);
                                    }
                                    break;
                            }
                        }
                        modifiedPieces = menuItemData.pieces;
                    }
                    else if (!menuItemData.pieces.length && menuItemParsedPieces.length) {
                        for (let i = 0; i < menuItemParsedPieces.length; i++) {
                            yield removeImgFromDirectory(i);
                        }
                        modifiedPieces = [];
                    }
                    yield prisma_1.prisma.menuItem.update({
                        where: { id: menuItemId },
                        data: Object.assign(Object.assign({}, menuItemData), { vegan: (menuItemData === null || menuItemData === void 0 ? void 0 : menuItemData.vegan) ? JSON.parse(`${menuItemData.vegan}`) : menuItem === null || menuItem === void 0 ? void 0 : menuItem.vegan, categoryId: (menuItemData === null || menuItemData === void 0 ? void 0 : menuItemData.categoryId) ? Number(menuItemData.categoryId) : menuItem === null || menuItem === void 0 ? void 0 : menuItem.categoryId, pieces: JSON.stringify(modifiedPieces), updated: new Date() })
                    });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                console.log(err.message);
                removePhoto();
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    changeMenuItemStatus(menuItemId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItem = yield prisma_1.prisma.menuItem.findUnique({ where: { id: menuItemId } });
                if (!menuItem) {
                    return { statusCode: 404, error: "Menu item has not been found" };
                }
                else {
                    yield prisma_1.prisma.menuItem.update({
                        where: { id: menuItemId },
                        data: {
                            status
                        }
                    });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deleteMenuItem(menuItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menuItem = yield prisma_1.prisma.menuItem.findUnique({ where: { id: menuItemId } });
                if (!menuItem) {
                    return { statusCode: 404, error: "Menu item has not been found" };
                }
                else {
                    const pieces = JSON.parse(menuItem.pieces[0]);
                    for (const piece of pieces) {
                        const imageSplit = piece.photo.split("/");
                        const imgPath = imageSplit[imageSplit.length - 1];
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(piece.photo_id);
                    }
                    yield prisma_1.prisma.menuItem.delete({ where: { id: menuItemId } });
                    return { statusCode: 204, error: "" };
                }
            }
            catch (err) {
                console.log("Delete Menu Item Errorr", err);
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    getAllPizzas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.pizza.findMany({ include: { pizzaSizes: true }, orderBy: [{ created: "desc" }] });
        });
    },
    getPizza(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pizza = yield prisma_1.prisma.pizza.findUnique({ where: { id }, include: { pizzaSizes: true } });
                if (!pizza) {
                    return { pizza: null, statusCode: 404, error: "Pizza's not been found!" };
                }
                else {
                    return { pizza, statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { pizza: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    createPizza(pizzaData, pizzaPhotoFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const removePhoto = () => {
                if (pizzaPhotoFiles.small) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${pizzaPhotoFiles.small[0].filename}`));
                }
                if (pizzaPhotoFiles.medium) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${pizzaPhotoFiles.medium[0].filename}`));
                }
                if (pizzaPhotoFiles.large) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${pizzaPhotoFiles.large[0].filename}`));
                }
            };
            const isThereDuplicatePizzaSize = (parsedPizzaSizes) => {
                for (let i = 0; i < parsedPizzaSizes.length; i++) {
                    for (let j = i + 1; j < parsedPizzaSizes.length; j++) {
                        if (parsedPizzaSizes[i].size === parsedPizzaSizes[j].size) {
                            return parsedPizzaSizes[i].size;
                        }
                    }
                }
            };
            try {
                const pizza = yield prisma_1.prisma.pizza.findUnique({ where: { name: pizzaData.name } });
                if (pizza) {
                    removePhoto();
                    return { newPizza: null, statusCode: 409, error: `Pizza with the given name: ${pizzaData.name} already exists!` };
                }
                else {
                    const parsedPizzaSizes = JSON.parse(pizzaData.pizzaSizes)
                        .map((pizzaSize) => (Object.assign(Object.assign({}, pizzaSize), { price: Number(pizzaSize.price) ? Number(pizzaSize.price) : "", weight: Number(pizzaSize.weight) ? Number(pizzaSize.weight) : "" })));
                    if (isThereDuplicatePizzaSize(parsedPizzaSizes)) {
                        const pizzaSize = isThereDuplicatePizzaSize(parsedPizzaSizes);
                        return { newPizza: null, statusCode: 400, error: `There can't be duplicate pizza sizes. Pizza size ${pizzaSize} is duplicated!` };
                    }
                    let smallPhoto, mediumPhoto, largePhoto;
                    if (pizzaPhotoFiles.small) {
                        smallPhoto = yield cloudinary_1.default.v2.uploader.upload(pizzaPhotoFiles.small[0].path, cloudinary_1.options);
                    }
                    if (pizzaPhotoFiles.medium) {
                        mediumPhoto = yield cloudinary_1.default.v2.uploader.upload(pizzaPhotoFiles.medium[0].path, cloudinary_1.options);
                    }
                    if (pizzaPhotoFiles.large) {
                        largePhoto = yield cloudinary_1.default.v2.uploader.upload(pizzaPhotoFiles.large[0].path, cloudinary_1.options);
                    }
                    ;
                    const setPhoto = (index, cloudinaryPhoto) => {
                        parsedPizzaSizes[index].photo = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.secure_url;
                        parsedPizzaSizes[index].photo_id = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.public_id;
                    };
                    for (let i = 0; i < parsedPizzaSizes.length; i++) {
                        switch (parsedPizzaSizes[i].size.toLowerCase()) {
                            case "small":
                                if (smallPhoto) {
                                    setPhoto(i, smallPhoto);
                                }
                                break;
                            case "medium":
                                if (mediumPhoto) {
                                    setPhoto(i, mediumPhoto);
                                }
                                break;
                            case "large":
                                if (largePhoto) {
                                    setPhoto(i, largePhoto);
                                }
                                break;
                        }
                    }
                    console.log(parsedPizzaSizes);
                    const newPizza = yield prisma_1.prisma.pizza.create({
                        data: {
                            name: pizzaData.name,
                            spiceLevel: pizzaData.spiceLevel,
                            categoryId: Number(pizzaData.categoryId),
                            vegan: JSON.parse(`${pizzaData.vegan}`),
                            pizzaSizes: {
                                create: [
                                    ...parsedPizzaSizes.map((pizzaSize) => (Object.assign(Object.assign({}, pizzaSize), { price: `${pizzaSize.price}`, weight: `${pizzaSize.weight}` })))
                                ]
                            }
                        }
                    });
                    return { newPizza, statusCode: 200, error: "" };
                }
            }
            catch (err) {
                removePhoto();
                console.log(err);
                return { newPizza: null, statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    editPizza(pizzaId, pizzaData, pizzaPhotoFiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const removePhoto = () => {
                if (pizzaPhotoFiles.small) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${pizzaPhotoFiles.small[0].filename}`));
                }
                if (pizzaPhotoFiles.medium) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${pizzaPhotoFiles.medium[0].filename}`));
                }
                if (pizzaPhotoFiles.large) {
                    fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${pizzaPhotoFiles.large[0].filename}`));
                }
            };
            const isThereDuplicatePizzaSize = (parsedPizzaSizes) => {
                for (let i = 0; i < parsedPizzaSizes.length; i++) {
                    for (let j = i + 1; j < parsedPizzaSizes.length; j++) {
                        if (parsedPizzaSizes[i].size === parsedPizzaSizes[j].size) {
                            return parsedPizzaSizes[i].size;
                        }
                    }
                }
            };
            try {
                const pizza = yield prisma_1.prisma.pizza.findUnique({ where: { id: pizzaId }, include: { pizzaSizes: true } });
                const pizzaWithGivenData = yield prisma_1.prisma.pizza.findUnique({ where: { name: pizzaData.name } });
                if (!pizza) {
                    removePhoto();
                    return { statusCode: 404, error: "Pizza's not been found!" };
                }
                else {
                    if (pizzaWithGivenData) {
                        console.log(pizzaWithGivenData.id, pizza.id);
                        if (pizzaWithGivenData.id !== pizza.id &&
                            pizzaWithGivenData.name === pizzaData.name) {
                            return { statusCode: 409, error: `Pizza with the given name: ${pizzaData.name} already exists!` };
                        }
                    }
                    const parsedPizzaSizes = JSON.parse(pizzaData.pizzaSizes)
                        .map((pizzaSize) => (Object.assign(Object.assign({}, pizzaSize), { price: Number(pizzaSize.price) ? Number(pizzaSize.price) : "", weight: Number(pizzaSize.weight) ? Number(pizzaSize.weight) : "" })));
                    if (isThereDuplicatePizzaSize(parsedPizzaSizes)) {
                        const pizzaSize = isThereDuplicatePizzaSize(parsedPizzaSizes);
                        return { newPizza: null, statusCode: 400, error: `There can't be duplicate pizza sizes. Pizza size ${pizzaSize} is duplicated!` };
                    }
                    let smallPhoto, mediumPhoto, largePhoto;
                    if (pizzaPhotoFiles.small) {
                        smallPhoto = yield cloudinary_1.default.v2.uploader.upload(pizzaPhotoFiles.small[0].path, cloudinary_1.options);
                    }
                    if (pizzaPhotoFiles.medium) {
                        mediumPhoto = yield cloudinary_1.default.v2.uploader.upload(pizzaPhotoFiles.medium[0].path, cloudinary_1.options);
                    }
                    if (pizzaPhotoFiles.large) {
                        largePhoto = yield cloudinary_1.default.v2.uploader.upload(pizzaPhotoFiles.large[0].path, cloudinary_1.options);
                    }
                    ;
                    const removeImgFromDirectory = (index) => __awaiter(this, void 0, void 0, function* () {
                        const imageSplit = pizza.pizzaSizes[index].photo.split("/");
                        const imgPath = imageSplit[imageSplit.length - 1];
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(pizza.pizzaSizes[index].photo_id);
                    });
                    const setPhoto = (index, cloudinaryPhoto) => {
                        parsedPizzaSizes[index].photo = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.secure_url;
                        parsedPizzaSizes[index].photo_id = cloudinaryPhoto === null || cloudinaryPhoto === void 0 ? void 0 : cloudinaryPhoto.public_id;
                    };
                    for (let i = 0; i < parsedPizzaSizes.length; i++) {
                        switch (parsedPizzaSizes[i].size.toLowerCase()) {
                            case "small":
                                if (smallPhoto) {
                                    yield removeImgFromDirectory(i);
                                    setPhoto(i, smallPhoto);
                                }
                                break;
                            case "medium":
                                if (mediumPhoto) {
                                    yield removeImgFromDirectory(i);
                                    setPhoto(i, mediumPhoto);
                                }
                                break;
                            case "large":
                                if (largePhoto) {
                                    yield removeImgFromDirectory(i);
                                    setPhoto(i, largePhoto);
                                }
                                break;
                        }
                    }
                    yield prisma_1.prisma.pizza.update({
                        where: { id: pizzaId },
                        data: {
                            name: pizzaData.name,
                            spiceLevel: pizzaData.spiceLevel,
                            categoryId: Number(pizzaData.categoryId),
                            vegan: JSON.parse(`${pizzaData.vegan}`)
                        }
                    });
                    for (const pizzaSize of parsedPizzaSizes) {
                        yield prisma_1.prisma.pizzaSize.update({
                            where: { id: pizzaSize.id },
                            data: Object.assign({}, pizzaSize)
                        });
                    }
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                removePhoto();
                console.log(err);
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    changePizzaStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pizza = yield prisma_1.prisma.pizza.findUnique({ where: { id } });
                if (!pizza) {
                    return { statusCode: 404, error: "Pizza has not been found!" };
                }
                else {
                    yield prisma_1.prisma.pizza.update({
                        where: { id },
                        data: {
                            status,
                            updated: new Date()
                        }
                    });
                    return { statusCode: 200, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
    deletePizza(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pizza = yield prisma_1.prisma.pizza.findUnique({ where: { id }, include: { pizzaSizes: true } });
                if (!pizza) {
                    return { statusCode: 404, error: "Pizza has not been found!" };
                }
                else {
                    const pizzaSizes = pizza.pizzaSizes;
                    for (const pizzaSize of pizzaSizes) {
                        const imageSplit = pizzaSize.photo.split("/");
                        const imgPath = imageSplit[imageSplit.length - 1];
                        fs_1.default.rmSync(path_1.default.join(__dirname, `../../assets/images/${imgPath}`));
                        yield cloudinary_1.default.v2.uploader.destroy(pizzaSize.photo_id);
                    }
                    yield prisma_1.prisma.pizza.delete({
                        where: { id }
                    });
                    return { statusCode: 204, error: "" };
                }
            }
            catch (err) {
                return { statusCode: 400, error: "Bad Request!" };
            }
        });
    },
};
exports.default = MenuService;
