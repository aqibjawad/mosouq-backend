import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    category_image: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const CategorySchema = new mongoose.Schema<ICategory>({
    name: { type: String, required: true },
    category_image: { type: String, required: true }
}, {
    collection: 'category',
    timestamps: true
});

const CategoryModel = mongoose.model<ICategory>('category', CategorySchema);

export default CategoryModel;
