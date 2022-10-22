"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDoctorValidation = exports.signupDoctorValidation = void 0;
const validator_1 = __importDefault(require("../utils/validator"));
const doctorSchema_1 = require("./doctorSchema");
const signupDoctorValidation = (req, res, next) => { (0, validator_1.default)(doctorSchema_1.doctorSchema.singupDoctor, req.body, next); };
exports.signupDoctorValidation = signupDoctorValidation;
const loginDoctorValidation = (req, res, next) => { (0, validator_1.default)(doctorSchema_1.doctorSchema.loginDoctor, req.body, next); };
exports.loginDoctorValidation = loginDoctorValidation;
