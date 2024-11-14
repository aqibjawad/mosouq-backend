import mongoose, { Document, Schema } from 'mongoose';

export interface IBusinessCompany extends Document {
    link: string;
    business_com_image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const BusinessCompanySchema = new Schema<IBusinessCompany>(
    {
        link: { type: String, required: true },
        business_com_image: { type: String, required: true },
    },
    { timestamps: true }
);

BusinessCompanySchema.virtual('id').get(function () {
    return this._id.toString();
});

BusinessCompanySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    //transform: function (doc, ret) {
//        delete ret._id;
//        return ret;
//    }
});

const BusinessCompanyModel = mongoose.model<IBusinessCompany>('BusinessCompany', BusinessCompanySchema);

export default BusinessCompanyModel;
