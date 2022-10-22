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
exports.testAdd10RandomMedoc = exports.testAdd100RandomMedoc = exports.getMedocsByPharmacyAndName = exports.getMedocsByPharmacy = exports.getMedocs = exports.getMedoc = exports.updateMedoc = exports.deleteMedoc = exports.addMedoc = void 0;
const Medodc_1 = __importDefault(require("../model/Medodc"));
const http_errors_1 = __importDefault(require("http-errors"));
const Pharmacy_1 = __importDefault(require("../model/Pharmacy"));
// Ajout medicaments
const addMedoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { medocName, medocPrice, medocQuantity, medocDescription, medocId, medocPharmacyId } = req.body;
    try {
        const newMedoc = new Medodc_1.default({
            medocName,
            medocPrice,
            medocQuantity,
            medocDescription,
            medocId,
            medocPharmacyId
        });
        yield newMedoc.save();
        res.json({ message: "Medoc ajouté" });
    }
    catch (error) {
        res.json({ InternalServerError: http_errors_1.default });
    }
});
exports.addMedoc = addMedoc;
// Suppression medicaments
const deleteMedoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medocId = req.params.medocId;
    try {
        yield Medodc_1.default.findByIdAndDelete(medocId);
        res.json({ message: "Medoc supprimé" });
    }
    catch (error) {
        res.json({ InternalServerError: http_errors_1.default });
    }
});
exports.deleteMedoc = deleteMedoc;
// Modification medicaments
const updateMedoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medocId = req.params.medocId;
    const { medocName, medocPrice, medocQuantity, medocDescription, medocPharmacyId } = req.body;
    try {
        yield Medodc_1.default.findByIdAndUpdate(medocId, {
            medocName,
            medocPrice,
            medocQuantity,
            medocDescription,
            medocId,
            medocPharmacyId
        });
        res.json({ message: "Medoc modifié" });
    }
    catch (error) {
        res.json({ InternalServerError: http_errors_1.default });
    }
});
exports.updateMedoc = updateMedoc;
// Affichage d'un medicament par son id
const getMedoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medocId = req.params.medocId;
    try {
        const medoc = yield Medodc_1.default.findById(medocId);
        res.json({ medoc });
    }
    catch (error) {
        res.json({ InternalServerError: http_errors_1.default });
    }
});
exports.getMedoc = getMedoc;
// Affichage de tous les medicaments
const getMedocs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const medocs = yield Medodc_1.default.find();
        res.json({ medocs });
    }
    catch (error) {
        res.json({ InternalServerError: http_errors_1.default });
    }
});
exports.getMedocs = getMedocs;
// Affichage de tous les medicaments d'une pharmacie
const getMedocsByPharmacy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medocPharmacyId = req.params.medocPharmacyId;
    try {
        const medocs = yield Medodc_1.default.find({ medocPharmacyId });
        res.json({ medocs });
    }
    catch (error) {
        res.json({ InternalServerError: http_errors_1.default });
    }
});
exports.getMedocsByPharmacy = getMedocsByPharmacy;
// Affichage de tous les medicaments d'une pharmacie
const getMedocsByPharmacyAndName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const medocPharmacyId = req.params.medocPharmacyId;
    const medocName = req.params.medocName;
    try {
        const medocs = yield Medodc_1.default.find({ medocPharmacyId, medocName });
        res.json({ medocs });
    }
    catch (error) {
        res.json({ InternalServerError: http_errors_1.default });
    }
});
exports.getMedocsByPharmacyAndName = getMedocsByPharmacyAndName;
const testAdd100RandomMedoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pharmacy = yield Pharmacy_1.default.findById(1007);
    if (pharmacy)
        try {
            for (let i = 0; i < 100; i++) {
                const newMedoc = new Medodc_1.default({
                    medocName: "medoc" + i,
                    medocPrice: i * 100000,
                    medocQuantity: i,
                    medocDescription: "description" + i,
                    medocId: "medoc" + i,
                    medocPharmacyId: "1007"
                });
                yield newMedoc.save();
            }
            res.json({ message: "100 medocs ajoutés dans la pharmacie " + pharmacy.pharmacyName });
        }
        catch (error) {
            res.json({ InternalServerError: http_errors_1.default });
        }
});
exports.testAdd100RandomMedoc = testAdd100RandomMedoc;
// Test d'ajout de 10 medicaments dans une pharmacie
const testAdd10RandomMedoc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pharmacy = yield Pharmacy_1.default.findById(1007);
    if (pharmacy)
        try {
            for (let i = 0; i < 10; i++) {
                const newMedoc = new Medodc_1.default({
                    medocName: "medoc" + i,
                    medocPrice: i * 100000,
                    medocQuantity: i,
                    medocDescription: "description" + i,
                    medocId: "medoc" + i,
                    medocPharmacyId: "1007"
                });
                yield newMedoc.save();
            }
            res.json({ message: "10 medocs ajoutés dans la pharmacie " + pharmacy.pharmacyName });
        }
        catch (error) {
            res.json({ InternalServerError: http_errors_1.default });
        }
});
exports.testAdd10RandomMedoc = testAdd10RandomMedoc;
