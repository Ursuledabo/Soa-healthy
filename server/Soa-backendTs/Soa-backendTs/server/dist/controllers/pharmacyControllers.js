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
exports.loginPharmacy = exports.signupPharmacy = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Pharmacy_1 = __importDefault(require("../model/Pharmacy"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_2 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupPharmacy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pharmacyName, pharmacyAdress, pharmacyMail, pharmacyPassword, pharmacyContact, pharmacyIdentification, } = req.body;
    try {
        const existingPharmacy = yield Pharmacy_1.default.findOne({ pharmacyMail });
        if (existingPharmacy)
            return next((0, http_errors_1.default)(422, "Email déjà existant"));
        const hashedPassword = yield bcrypt_1.default.hash(pharmacyPassword, 8);
        const newPharmacy = new Pharmacy_1.default({
            pharmacyName,
            pharmacyAdress,
            pharmacyMail,
            pharmacyPassword: hashedPassword,
            pharmacyContact,
            pharmacyIdentification
        });
        yield newPharmacy.save();
        res.json({ message: "Pharmacie créé" });
    }
    catch (error) {
        return next(http_errors_2.default);
    }
    ;
});
exports.signupPharmacy = signupPharmacy;
const loginPharmacy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pharmacyMail, pharmacyPassword } = req.body;
    try {
        const existingPharmacy = yield Pharmacy_1.default.findOne({ pharmacyMail });
        if (!existingPharmacy)
            return next((0, http_errors_1.default)(404, "Pharmacie non trouvé"));
        const isPasswordValid = yield bcrypt_1.default.compare(pharmacyPassword, existingPharmacy.pharmacyPassword);
        if (!isPasswordValid)
            return next((0, http_errors_1.default)(401, "Mot de passe incorrect"));
        const token = jsonwebtoken_1.default.sign({
            Pharmacyname: existingPharmacy.pharmacyName,
            Pharmacyemail: existingPharmacy.pharmacyMail,
            Pharmacyid: existingPharmacy._id
        }, process.env.JWT_SECRET, {
            expiresIn: "12h"
        });
        res.cookie("jwt", token);
        res.json({ message: "Connecté avec le jeton: ", token });
    }
    catch (error) {
        return next(http_errors_2.default);
    }
    ;
});
exports.loginPharmacy = loginPharmacy;
