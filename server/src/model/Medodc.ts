import { Schema, model } from "mongoose";

export interface IMedoc extends Document {
    medocName: string;
    medocPrice: number;
    medocQuantity: number;
    medocDescription: string;
    medocId: string;
    medocPharmacyId: string;
}

const MedocSchema: Schema = new Schema ({
    medocName: {type: String, required:true},
    medocPrice: {type: Number, required:true},
    medocQuantity: {type: Number, required:true},
    medocDescription: {type: String},
    medocId: {type: String, required:true},
    medocPharmacyId: {type: String}
})

export default model<IMedoc>("Medoc", MedocSchema)