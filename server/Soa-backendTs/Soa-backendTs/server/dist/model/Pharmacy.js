"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PharmacySchema = new mongoose_1.Schema({
    pharmacyName: { type: String, required: true },
    pharmacyAdress: { type: String, required: true },
    pharmacyMail: { type: String, required: true },
    pharmacyPassword: { type: String, required: true },
    pharmacyContact: { type: String, required: true },
    pharmacyIdentification: { type: String, required: true }
});
exports.default = (0, mongoose_1.model)("Pharmacy", PharmacySchema);
