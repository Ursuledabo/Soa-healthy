import { string } from "joi"
import {Schema, model, Document} from "mongoose"

export interface IDoctor extends Document {
       doctorName: string ;
       doctorMail: string ;
       doctorPassword: string ;
       doctorIsMale: boolean;
       doctorAdress: string;
       doctorContact: string;
       doctorSpeciality: string;
       doctorGraduation: string;
       doctorIsVerified: boolean;
        verifyToken: string;
}

const DoctorSchema: Schema = new Schema({
        doctorName: {type: String, required: true},
        doctorMail: {type: String, required: true, unique:true},
        doctorPassword: {type: String, required: true},
        doctorIsMale: {type: Boolean, required:true, default: true},
        doctorAdress: {type: String, required: true},
        doctorContact: {type: String, required: true},
        doctorSpeciality: {type: String, required: false},
        doctorGraduation: {type: String, required: true},
        doctorIsVerified: {type: Boolean, default: false},
        verifyToken: {type: String},
})

export default model<IDoctor>("Doctor", DoctorSchema)