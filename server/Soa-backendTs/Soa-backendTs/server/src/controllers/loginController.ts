import {RequestHandler} from 'express';
import createHttpError from 'http-errors';
import Doctor from '../model/Doctor';
import Patient from '../model/Patient';
import Pharmacy from '../model/Pharmacy';
import InternalServerError from 'http-errors';

export const rechercheUser:RequestHandler = async(req, res, next) => {
    const userMail= req.body;

    try {
        const isPatient = await Patient.findOne({userMail});
        if (isPatient) return res.json({message: 'C-est un patient'})
        const isDoctor= await Doctor.findOne({userMail});
        if (isDoctor) return res.json({message: 'C-est un docteur'})
        const isPharmacy = await Pharmacy.findOne({userMail});
        if (isPharmacy) return res.json({message: 'C-est un pharmacien'})
        if (!isPatient && !isDoctor && !isPharmacy) return next(createHttpError(404, 'Utilisateur non identifié'))
    } catch(error) {
        return next(InternalServerError)
    }
}