"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
let fileStorage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
let upload = (0, multer_1.default)({ storage: fileStorage }).single('image');
exports.default = upload;
