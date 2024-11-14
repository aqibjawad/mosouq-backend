// Import necessary modules
import mongoose, { Document, Schema } from 'mongoose';
import CategoryModel from '../category/category.model'; // Replace with the correct path to the Category model

// Define the ISubCategory interface
export interface ISubCategory extends Document {
  // category: Schema.Types.ObjectId;
  sub_name: string;
  subcategory_image?: string;
  description?: string;
}

// Define the SubCategory schema
const subcategorySchema = new Schema<ISubCategory>(
  {
    // category: { type: Schema.Types.ObjectId, ref: 'category' }, // Reference the Category model
    sub_name: { type: String },
    subcategory_image: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model<ISubCategory>('subcategory', subcategorySchema);
