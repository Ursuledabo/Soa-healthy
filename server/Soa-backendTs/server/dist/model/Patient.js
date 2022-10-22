"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PatientSchema = new mongoose_1.Schema({
    patientName: { type: String, required: true },
    patientMail: { type: String, required: true, unique: true },
    patientPassword: { type: String, required: true },
    patientIsMale: { type: Boolean, required: true, default: true },
    patientAdress: { type: String, required: true },
    patientContact: { type: String, required: true },
    patientBloodType: { type: String, required: false },
    patientIsVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
});
exports.default = (0, mongoose_1.model)("Patient", PatientSchema);
