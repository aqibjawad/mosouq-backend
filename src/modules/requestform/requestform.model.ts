import mongoose, { Document, Schema } from "mongoose";

export interface IRequestForm extends Document {
  businessId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  phone: string;
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
    phone: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRequestForm>("requestForm", RequestForm);
