import mongoose, { Document, Schema } from 'mongoose';

export interface IDeal extends Document {
    name: string;
    type: string;
    address: string;
    lat: string;
    lang: string;
    description: string;
    consultation: string;
    deal_image?: string;
}

const dealSchema = new Schema<IDeal>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: String, required: true },
    lang: { type: String, required: true },
    description: { type: String, required: true },
    consultation: { type: String, required: true },
    deal_image: { type: String },
  },
  { timestamps: true }
);

const DealModel = mongoose.model<IDeal>('Deal', dealSchema);

export default DealModel;
