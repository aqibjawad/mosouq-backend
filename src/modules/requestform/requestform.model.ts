import mongoose, { Document, Schema } from "mongoose";

export interface IRequestForm extends Document {
  businessId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  phone: string;
  email: string;
  date: string;
  time: string;
}

const RequestForm = new Schema<IRequestForm>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "business-auth",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: true, // Change to true to match validation
    },
    time: {
      type: String,
      required: true, // Change to true to match validation
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRequestForm>("requestForm", RequestForm);
