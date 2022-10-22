"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacySchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.PharmacySchema = {
    signupPharmacy: joi_1.default.object({
        pharmacyName: joi_1.default.string().required(),
        pharmacyAdress: joi_1.default.string().required(),
        pharmacyMail: joi_1.default.string().email().required(),
        pharmacyPassword: joi_1.default.string().required(),
        pharmacyContact: joi_1.default.string().required(),
        pharmacyIdentification: joi_1.default.string().required()
    }),
    loginPharmacy: joi_1.default.object({
        pharmacyMail: joi_1.default.string().email().required(),
        pharmacyPassword: joi_1.default.string().required()
    })
};
