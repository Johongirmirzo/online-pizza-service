"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../assets/images"));
    },
    filename(req, file, cb) {
        cb(null, `${(0, uuid_1.v4)()}${path_1.default.extname(file.originalname)}`);
    }
});
function checkFileType(file, cb) {
    const filetypes = /jpg|png|webp|svg/i;
    const extname = filetypes.test(path_1.default.extname(file.originalname));
    if (extname) {
        return cb(null, true);
    }
    else {
        cb("Only jpg|png|webp|svg file formats are allowed!");
    }
}
exports.uploadImage = (0, multer_1.default)({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
    limits: { fileSize: 1000000 }
});
