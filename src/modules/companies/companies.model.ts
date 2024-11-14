import mongoose, { Document, Schema } from 'mongoose';

export interface ICompany extends Document {
    link: string;
    companies_image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const companySchema = new mongoose.Schema<ICompany>({
    link: {
        type: String,
        required: true
    },
    companies_image: {
        type: String
    },
}, {
    collection: 'companies',
    timestamps: true
});

companySchema.virtual('id').get(function () {
    return this._id.toString();
});

companySchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    //transform: function (doc, ret) {
//        delete ret._id;
//        return ret;
//    }
});

const CompanyModel = mongoose.model<ICompany>('Company', companySchema);

export default CompanyModel;
