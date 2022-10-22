"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PharmacySchema = new mongoose_1.Schema({
    pharmacyName: { type: String, required: true },
    pharmacyAddress: { type: String, required: true },
    pharmacyEmail: { type: String, required: true, unique: true },
    pharmacyPassword: { type: String, required: true, unique: true },
    pharmacyContact: { type: String, required: true },
    pharmacyIsVerified: { type: Boolean, default: false },
    verifyToken: { type: String }
});
exports.default = (0, mongoose_1.model)("Pharmacy", PharmacySchema);
