import mongoose, { Document, Schema } from "mongoose";
import mongooseAutoPopulate from "mongoose-autopopulate";
export interface IRating extends Document {
  rating: string;
  title: string;
  description: string;
  userId: Schema.Types.ObjectId;
  businessId: Schema.Types.ObjectId;
  approved?: boolean
}

const ratingSchema = new Schema<IRating>(
  {
    rating: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "business-auth",
      autopopulate: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
      autopopulate: true
    },
    approved: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

ratingSchema.plugin(mongooseAutoPopulate);

export default mongoose.model<IRating>("Rating", ratingSchema);
