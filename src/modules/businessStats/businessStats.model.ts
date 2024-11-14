import mongoose, { Document, Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export interface IBusinessStats extends Document {
    type: "email" | "map" | "quotation" | "message";
    businessId: string;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const BusinessStatsSchema = new mongoose.Schema<IBusinessStats>({
    type: {
        type: String,
        required: true
    },
    businessId: {
        type: String,
        required: true,
        ref: "business-auth",
        autopopulate: true
    },
    userId: {
        type: String,
        required: true,
        ref: "Auth",
        autopopulate: true
    }
}, {
    collection: 'BusinessStats',
    timestamps: true
});

BusinessStatsSchema.virtual('id').get(function () {
    return this._id.toString();
});

BusinessStatsSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    //transform: function (doc, ret) {
    //        delete ret._id;
    //        return ret;
    //    }
});

BusinessStatsSchema.plugin(mongooseAutoPopulate)

const BusinessStatsModel = mongoose.model<IBusinessStats>('BusinessStats', BusinessStatsSchema);

export default BusinessStatsModel;
