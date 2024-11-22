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
  businessPictures?: string[];
  description: string;
  fromTime: string;
  toTime: string;
  images?: string[];
  logo: string;
  isOpen24_7: boolean;
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
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
    businessPictures: {
      type: [String],
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    toTime: {
      type: String,
      required: false,
    },
    fromTime: {
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
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAuth>('profileBusiness', AuthSchema);