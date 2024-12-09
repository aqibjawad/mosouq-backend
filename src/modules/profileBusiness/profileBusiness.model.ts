import mongoose, { Document, Schema } from 'mongoose';

export interface IAuth extends Document {
  businessName: string;
  website: string;
  email: string;
  phone: string;
  city?: string;
  address?: string;
  country: string;
  businessId: Schema.Types.ObjectId;
  category: Schema.Types.ObjectId;
  subcategory: Schema.Types.ObjectId;
  businessPictures?: string[];
  description: string;
  lat: string;
  lang: string;
  images?: string[];
  logo: string;
  isOpen24_7: boolean;
  businesshours?: Array<{
    day: string;
    fromTime: string;
    toTime: string;
  }>;
}

const AuthSchema = new Schema<IAuth>(
  {
    businessName: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: 'business-auth',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'subcategory',
    },
    businessPictures: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    lang: {
      type: String,
      required: false,
    },
    lat: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    logo: {
      type: String,
      required: false,
    },
    isOpen24_7: {
      type: Boolean,
      default: false, // Set a default value
      required: false
    },
    businesshours: {
      type: [
        {
          day: { type: String, required: true },
          fromTime: { type: String, required: true },
          toTime: { type: String, required: true },
        },
      ],
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAuth>('profileBusiness', AuthSchema);