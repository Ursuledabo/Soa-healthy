"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MedocSchema = new mongoose_1.Schema({
    medocName: { type: String, required: true },
    medocPrice: { type: Number, required: true },
    medocQuantity: { type: Number, required: true },
    medocDescription: { type: String },
    medocId: { type: String, required: true },
    medocPharmacyId: { type: String }
});
exports.default = (0, mongoose_1.model)("Medoc", MedocSchema);
