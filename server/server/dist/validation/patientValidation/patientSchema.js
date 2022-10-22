"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patientSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.patientSchema = {
    singupPatient: joi_1.default.object({
        patientName: joi_1.default.string().required(),
        patientMail: joi_1.default.string().email().required(),
        patientPassword: joi_1.default.string().required(),
        patientIsMale: joi_1.default.boolean().required(),
        patientAdress: joi_1.default.string().required(),
        patientContact: joi_1.default.string().required(),
        patientBloodType: joi_1.default.string().required(),
    }),
    loginPatient: joi_1.default.object({
        patientMail: joi_1.default.string().email().required(),
        patientPassword: joi_1.default.string().required(),
    })
};
