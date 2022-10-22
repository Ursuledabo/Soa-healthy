"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = exports.testAccount = exports.FRONTEND_URL = exports.JWT_SECRET = exports.PORT = exports.DB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
dotenv_1.default.config();
exports.DB = process.env.DB;
exports.PORT = parseInt(process.env.PORT);
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
exports.testAccount = {
    user: "tfn6akmsq5c337un@ethereal.email",
    pass: "daCYJZR7usqND8QQZA",
};
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: exports.testAccount.user,
        pass: exports.testAccount.pass, // generated ethereal password
    },
});
