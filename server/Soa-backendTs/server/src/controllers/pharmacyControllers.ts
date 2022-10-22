import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Pharmacy from "../model/Pharmacy";
import bcrypt from "bcrypt";
import InternalServerError from "http-errors";
import jwt from "jsonwebtoken";

export const signupPharmacy:RequestHandler = async (req,res,next) => {
    const {
        pharmacyName,
        pharmacyAdress,
        pharmacyMail,
        pharmacyPassword,
        pharmacyContact,
        pharmacyIdentification,

    } = req.body;

    try{
        const existingPharmacy = await Pharmacy.findOne({pharmacyMail})
        if(existingPharmacy) return next(createHttpError(422, "Email déjà existant"));

        const hashedPassword = await bcrypt.hash(pharmacyPassword, 8);
        const newPharmacy = new Pharmacy({
            pharmacyName,
            pharmacyAdress,
            pharmacyMail,
            pharmacyPassword: hashedPassword,
            pharmacyContact,
            pharmacyIdentification

        });
        await newPharmacy.save();
        res.json({message: "Pharmacie créé"});
    }
    catch(error){
        return next(InternalServerError);
    };
}

export const loginPharmacy:RequestHandler = async (req, res, next) => {
    const {pharmacyMail, pharmacyPassword} = req.body;

    try{
        const existingPharmacy = await Pharmacy.findOne({pharmacyMail});
        if(!existingPharmacy) return next(createHttpError(404, "Pharmacie non trouvé"));

        const isPasswordValid = await bcrypt.compare(pharmacyPassword, existingPharmacy.pharmacyPassword);
        if(!isPasswordValid) return next(createHttpError(401, "Mot de passe incorrect"));

        const token = jwt.sign({
            Pharmacyname: existingPharmacy.pharmacyName,
            Pharmacyemail: existingPharmacy.pharmacyMail,
            Pharmacyid: existingPharmacy._id},
            process.env.JWT_SECRET as string,
            {
                expiresIn: "12h"
            }
        );

        res.cookie("jwt", token);

        res.json({message: "Connecté avec le jeton: ", token});
    }
    catch(error){
        return next(InternalServerError);
    };
}

