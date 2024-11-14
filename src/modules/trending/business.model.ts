import mongoose, { Document, Schema } from "mongoose";

// Define the interface for Business document
export interface IBusiness extends Document {
  name: string;
  type: string;
  location: string;
  description: string;
  consultation: string;
  business_image?: string;
  email?: string;
  category: Schema.Types.ObjectId;
  subcategory: Schema.Types.ObjectId;
}

// Define the schema for Business
const businessSchema = new Schema<IBusiness>(
  {
    name: { type: String },
    type: { type: String },
    location: { type: String },
    description: { type: String },
    consultation: { type: String },
    business_image: { type: String },
    email: { type: String },
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "subcategory",
    },
  },
  { timestamps: true }
);

// Create and export the Business model
const BusinessModel = mongoose.model<IBusiness>(
  "trend-business",
  businessSchema
);

export default BusinessModel;
