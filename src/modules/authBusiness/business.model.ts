import mongoose, { Document, Schema } from 'mongoose';

export interface IAuthBusiness extends Document {
    name: string;
    company: string;
    email: string;
    country: string;
    phone: string;
    password?: string;
    terms: string;
    role?: string;
    url: string;
    title: string;
    otp?: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const AuthBusinessSchema = new mongoose.Schema<IAuthBusiness>({
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: false
    },
    terms: {
        type: String,
    },
    role: {
        type: String,
        required: false
    },
    url: {
        type: String,
    },
    title: {
        type: String,
    },
    otp: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'business-auth',
    timestamps: true
});

AuthBusinessSchema.virtual('id').get(function () {
    return this._id.toString();
});

AuthBusinessSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    //transform: function (doc, ret) {
    //        delete ret._id;
    //        return ret;
    //    }
});

const BusinessAuthModel = mongoose.model<IAuthBusiness>('business-auth', AuthBusinessSchema);

export default BusinessAuthModel;
