import { string } from "joi"
import {Schema, model, Document} from "mongoose"

export interface IPatient extends Document {
        patientName: string ;
        patientMail: string ;
        patientPassword: string ;
        patientIsMale: boolean;
        patientAdress: string;
        patientContact: string;
        patientBloodType: string;
        patientIsVerified: boolean;
        verifyToken: string;
}

const PatientSchema: Schema = new Schema({
        patientName: {type: String, required: true},
        patientMail: {type: String, required: true, unique:true},
        patientPassword: {type: String, required: true},
        patientIsMale: {type: Boolean, required:true, default: true},
        patientAdress: {type: String, required: true},
        patientContact: {type: String, required: true},
        patientBloodType: {type: String, required: false},
        patientIsVerified: {type: Boolean, default: false},
        verifyToken: {type: String},
})

export default model<IPatient>("Patient", PatientSchema)