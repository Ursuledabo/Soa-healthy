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
exports.loginDoctor = exports.signupDoctor = void 0;
const Doctor_1 = __importDefault(require("../model/Doctor"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_errors_1 = __importStar(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signupDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorName, doctorMail, doctorPassword, doctorIsMale, doctorAdress, doctorContact, doctorSpeciality, doctorGraduation } = req.body;
    try {
        const existingDoctor = yield Doctor_1.default.findOne({ doctorMail });
        if (existingDoctor)
            return next((0, http_errors_1.default)(422, "email already exists"));
        const hashedPassword = yield bcrypt_1.default.hash(doctorPassword, 8);
        const newDoctor = new Doctor_1.default({
            doctorName,
            doctorMail,
            doctorPassword: hashedPassword,
            doctorIsMale,
            doctorAdress,
            doctorContact,
            doctorSpeciality,
            doctorGraduation
        });
        yield newDoctor.save();
        res.json({ message: "doctor created" });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.signupDoctor = signupDoctor;
const loginDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorMail, doctorPassword } = req.body;
    try {
        const doctor = yield Doctor_1.default.findOne({ doctorMail });
        if (!doctor)
            return next((0, http_errors_1.default)(404, "doctor not found"));
        const isPasswordValid = yield bcrypt_1.default.compare(doctorPassword, doctor.doctorPassword);
        if (!doctor.doctorIsVerified)
            return next((0, http_errors_1.default)(406, "User not verified"));
        if (!isPasswordValid)
            return next((0, http_errors_1.default)(401, "invalid password"));
        const token = jsonwebtoken_1.default.sign({
            doctorname: doctor.doctorName,
            doctoremail: doctor.doctorMail,
            doctorid: doctor._id
        }, process.env.JWT_SECRET, {
            expiresIn: "12h"
        });
        res.cookie("jwt", token);
        res.json({ message: "login successful as", token });
    }
    catch (error) {
        return next(http_errors_1.InternalServerError);
    }
});
exports.loginDoctor = loginDoctor;
