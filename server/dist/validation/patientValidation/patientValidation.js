"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPatientValidation = exports.signupPatientValidation = void 0;
const validator_1 = __importDefault(require("../utils/validator"));
const patientSchema_1 = require("./patientSchema");
const signupPatientValidation = (req, res, next) => { (0, validator_1.default)(patientSchema_1.patientSchema.singupPatient, req.body, next); };
exports.signupPatientValidation = signupPatientValidation;
const loginPatientValidation = (req, res, next) => { (0, validator_1.default)(patientSchema_1.patientSchema.loginPatient, req.body, next); };
exports.loginPatientValidation = loginPatientValidation;
