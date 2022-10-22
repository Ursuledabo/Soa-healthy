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
exports.rechercheUser = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Doctor_1 = __importDefault(require("../model/Doctor"));
const Patient_1 = __importDefault(require("../model/Patient"));
const Pharmacy_1 = __importDefault(require("../model/Pharmacy"));
const http_errors_2 = __importDefault(require("http-errors"));
const rechercheUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userMail = req.body;
    try {
        const isPatient = yield Patient_1.default.findOne({ userMail });
        if (isPatient)
            return res.json({ message: 'C-est un patient' });
        const isDoctor = yield Doctor_1.default.findOne({ userMail });
        if (isDoctor)
            return res.json({ message: 'C-est un docteur' });
        const isPharmacy = yield Pharmacy_1.default.findOne({ userMail });
        if (isPharmacy)
            return res.json({ message: 'C-est un pharmacien' });
        if (!isPatient && !isDoctor && !isPharmacy)
            return next((0, http_errors_1.default)(404, 'Utilisateur non identifié'));
    }
    catch (error) {
        return next(http_errors_2.default);
    }
});
exports.rechercheUser = rechercheUser;
