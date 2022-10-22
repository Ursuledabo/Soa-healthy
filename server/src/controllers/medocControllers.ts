import { RequestHandler } from "express";
import Medoc from "../model/Medodc";
import InternalServerError from "http-errors";
import Pharmacy from "../model/Pharmacy";

// Ajout medicaments
export const addMedoc:RequestHandler = async (req,res) => {
    const {
        medocName,
        medocPrice,
        medocQuantity,
        medocDescription,
        medocId,
        medocPharmacyId
    } = req.body;

    try{
        const newMedoc = new Medoc({
            medocName,
            medocPrice,
            medocQuantity,
            medocDescription,
            medocId,
            medocPharmacyId
        });
        await newMedoc.save();
        res.json({message: "Medoc ajouté"});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

// Suppression medicaments
export const deleteMedoc:RequestHandler = async (req,res) => {
    const medocId = req.params.medocId;
    try{
        await Medoc.findByIdAndDelete(medocId);
        res.json({message: "Medoc supprimé"});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

// Modification medicaments
export const updateMedoc:RequestHandler = async (req,res) => {
    const medocId = req.params.medocId;
    const {
        medocName,
        medocPrice,
        medocQuantity,
        medocDescription,
        medocPharmacyId
    } = req.body;
    try{
        await Medoc.findByIdAndUpdate(medocId, {
            medocName,
            medocPrice,
            medocQuantity,
            medocDescription,
            medocId,
            medocPharmacyId
        });
        res.json({message: "Medoc modifié"});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

// Affichage d'un medicament par son id
export const getMedoc:RequestHandler = async (req,res) => {
    const medocId = req.params.medocId;
    try{
        const medoc = await Medoc.findById(medocId);
        res.json({medoc});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

// Affichage de tous les medicaments
export const getMedocs:RequestHandler = async (req,res) => {
    try{
        const medocs = await Medoc.find();
        res.json({medocs});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

// Affichage de tous les medicaments d'une pharmacie
export const getMedocsByPharmacy:RequestHandler = async (req,res) => {
    const medocPharmacyId = req.params.medocPharmacyId;
    try{
        const medocs = await Medoc.find({medocPharmacyId});
        res.json({medocs});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

// Affichage de tous les medicaments d'une pharmacie
export const getMedocsByPharmacyAndName:RequestHandler = async (req,res) => {
    const medocPharmacyId = req.params.medocPharmacyId;
    const medocName = req.params.medocName;
    try{
        const medocs = await Medoc.find({medocPharmacyId, medocName});
        res.json({medocs});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

export const testAdd100RandomMedoc:RequestHandler = async (req,res) => {
    const pharmacy = await Pharmacy.findById(1007);
if (pharmacy)
    try{
        for (let i = 0; i < 100; i++) {
            const newMedoc = new Medoc({
                medocName: "medoc" + i,
                medocPrice: i* 100000,
                medocQuantity: i,
                medocDescription: "description" + i,
                medocId: "medoc" + i,
                medocPharmacyId:"1007"
            });
            await newMedoc.save();
        }
        res.json({message: "100 medocs ajoutés dans la pharmacie " + pharmacy.pharmacyName});
    }
    catch(error){
        res.json({InternalServerError});
    }
}

// Test d'ajout de 10 medicaments dans une pharmacie
export const testAdd10RandomMedoc:RequestHandler = async (req,res) => {
    const pharmacy = await Pharmacy.findById(1007);
if (pharmacy)
    try{
        for (let i = 0; i < 10; i++) {
            const newMedoc = new Medoc({
                medocName: "medoc" + i,
                medocPrice: i* 100000,
                medocQuantity: i,
                medocDescription: "description" + i,
                medocId: "medoc" + i,
                medocPharmacyId:"1007"
            });
            await newMedoc.save();
        }
        res.json({message: "10 medocs ajoutés dans la pharmacie " + pharmacy.pharmacyName});
    }
    catch(error){
        res.json({InternalServerError});
    }
}