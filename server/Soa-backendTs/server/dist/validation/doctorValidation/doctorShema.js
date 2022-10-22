"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctortSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.doctortSchema = {
    singupDoctor: joi_1.default.object({
        doctorName: joi_1.default.string().required(),
        doctorMail: joi_1.default.string().email().required(),
        doctorPassword: joi_1.default.string().required(),
        doctorIsMale: joi_1.default.boolean().required(),
        doctorAdress: joi_1.default.string().required(),
        doctorContact: joi_1.default.string().required(),
        doctorSpeciality: joi_1.default.string().required(),
        doctorGraduation: joi_1.default.string().required(),
    }),
    loginDoctor: joi_1.default.object({
        doctorMail: joi_1.default.string().email().required(),
        doctorPassword: joi_1.default.string().required(),
    })
};
