import mongoose, { Document, Schema } from 'mongoose';

export interface IBusinessTimings extends Document {
  businessId: string;
  mondayStart?: string;
  mondayEnd?: string;
  tuesdayStart?: string;
  tuesdayEnd?: string;
  wednesdayStart?: string;
  wednesdayEnd?: string;
  thursdayStart?: string;
  thursdayEnd?: string;
  fridayStart?: string;
  fridayEnd?: string;
  saturdayStart?: string;
  saturdayEnd?: string;
  sundayStart?: string;
  sundayEnd?: string;
}

const BusinessTimingsSchema = new Schema<IBusinessTimings>({
  businessId: {
    type: String,
    required: false,
  },
  mondayStart: {
    type: String,
    required: false,
  },
  mondayEnd: {
    type: String,
    required: false,
  },
  tuesdayStart: {
    type: String,
    required: false,
  },
  tuesdayEnd: {
    type: String,
    required: false,
  },
  wednesdayStart: {
    type: String,
    required: false,
  },
  wednesdayEnd: {
    type: String,
    required: false,
  },
  thursdayStart: {
    type: String,
    required: false,
  },
  thursdayEnd: {
    type: String,
    required: false,
  },
  fridayStart: {
    type: String,
    required: false,
  },
  fridayEnd: {
    type: String,
    required: false,
  },
  saturdayStart: {
    type: String,
    required: false,
  },
  saturdayEnd: {
    type: String,
    required: false,
  },
  sundayStart: {
    type: String,
    required: false,
  },
  sundayEnd: {
    type: String,
    required: false,
  },
},
  {
    timestamps: true,
    collection: 'businessTimings',
  }
);

export default mongoose.model<IBusinessTimings>('BusinessTimings', BusinessTimingsSchema);
