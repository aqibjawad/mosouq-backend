import mongoose, { Document, Schema } from 'mongoose';

export interface IDeal extends Document {
    name: string;
    type: string;
    location: string;
    description: string;
    consultation: string;
    deal_image?: string;
}

const dealSchema = new Schema<IDeal>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    consultation: { type: String, required: true },
    deal_image: { type: String },
  },
  { timestamps: true }
);

const DealModel = mongoose.model<IDeal>('Deal', dealSchema);

export default DealModel;
