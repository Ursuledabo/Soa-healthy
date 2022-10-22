"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = require("joi");
const mongoose_1 = require("mongoose");
const DoctorSchema = new mongoose_1.Schema({
    doctorName: { type: String, required: true },
    doctorMail: { type: String, required: true, unique: true },
    doctorPassword: { type: String, required: true },
    doctorIsMale: { type: Boolean, required: true, default: true },
    doctorAdress: { type: String, required: true },
    doctorContact: { type: String, required: true },
    doctorSpeciality: { type: String, required: false },
    doctorGraduation: { type: joi_1.string, required: true },
    doctorIsVerified: { type: Boolean, default: false },
    verifyToken: { type: String },
});
exports.default = (0, mongoose_1.model)("Doctor", DoctorSchema);
