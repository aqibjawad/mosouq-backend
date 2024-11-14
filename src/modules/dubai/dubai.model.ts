import mongoose, { Document, Schema } from 'mongoose';

export interface IDubai extends Document {
    name: string;
    description: string;
    dubai_image?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const dubaiSchema = new Schema<IDubai>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    dubai_image: { type: String }
  },
  { timestamps: true }
);

dubaiSchema.virtual('id').get(function () {
    return this._id.toString();
});

dubaiSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    //transform: function (doc, ret) {
//        delete ret._id;
//        return ret;
//    }
});

const DubaiModel = mongoose.model<IDubai>('Dubai', dubaiSchema);

export default DubaiModel;
