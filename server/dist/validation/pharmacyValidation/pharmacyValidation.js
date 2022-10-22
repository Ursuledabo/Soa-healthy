"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPharmacyValidation = exports.signupPharmacyValidation = void 0;
const pharmacySchema_1 = require("./pharmacySchema");
const validator_1 = __importDefault(require("../utils/validator"));
const signupPharmacyValidation = (req, res, next) => {
    (0, validator_1.default)(pharmacySchema_1.PharmacySchema.signupPharmacy, req.body, next);
};
exports.signupPharmacyValidation = signupPharmacyValidation;
const loginPharmacyValidation = (req, res, next) => {
    (0, validator_1.default)(pharmacySchema_1.PharmacySchema.loginPharmacy, req.body, next);
};
exports.loginPharmacyValidation = loginPharmacyValidation;
