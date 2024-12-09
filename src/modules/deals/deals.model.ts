import mongoose, { Document, Schema } from "mongoose";

export interface IDeal extends Document {
  name: string;
  type: string;
  address: string;
  lat: string;
  lang: string;
  description: string;
  consultation: string;
  businessName: string;
  website: string;
  price: string;
  discount: string;
  deal_image?: string;
  images?: string[];
}

const dealSchema = new Schema<IDeal>(
  {
    name: { type: String, required: false },
    type: { type: String, required: false },
    address: { type: String, required: false },
    lat: { type: String, required: false },
    lang: { type: String, required: false },
    description: { type: String, required: false },
    businessName: { type: String, required: false },
    website: { type: String, required: false },
    price: { type: String, required: false },
    discount: { type: String, required: false },
    consultation: { type: String, required: false },
    deal_image: { type: String },
    images: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);

const DealModel = mongoose.model<IDeal>("Deal", dealSchema);

export default DealModel;
