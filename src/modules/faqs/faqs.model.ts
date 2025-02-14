import mongoose, { Document, Schema } from "mongoose";

// Interface for single FAQ item
interface IFaqItem {
  question: string;
  answer: string;
}

// Interface for FAQ document
export interface IFaq extends Document {
  businessId: mongoose.Types.ObjectId;
  faqs: IFaqItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Schema for FAQ item
const faqItemSchema = new Schema<IFaqItem>({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answer: {
    type: String,
    required: true,
    trim: true,
  },
});

// Main FAQ schema
const faqSchema = new Schema<IFaq>(
  {
    businessId: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    faqs: [faqItemSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will automatically handle createdAt and updatedAt
  }
);

const FaqModel = mongoose.model<IFaq>("Faq", faqSchema);

export default FaqModel;
