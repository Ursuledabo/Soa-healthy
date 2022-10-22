import {Schema, model, Document} from "mongoose"
export interface IPharmacy extends Document {
        pharmacyName: string ;
        pharmacyAdress: string;
        pharmacyMail: string ;
        pharmacyPassword: string ;
        pharmacyContact: string;
        pharmacyIsVerified: boolean;
        verifyToken: string;
}

const PharmacySchema: Schema = new Schema({
        pharmacyName: {type: String,required:true},
        pharmacyAddress: {type:String,required:true},
        pharmacyEmail: {type:String,required:true,unique:true},
        pharmacyPassword: {type:String,required:true, unique:true},
        pharmacyContact :{type:String,required:true},
        pharmacyIsVerified :{type:Boolean, default:false},
        verifyToken :{type:String}

})

export default model<IPharmacy>("Pharmacy", PharmacySchema)