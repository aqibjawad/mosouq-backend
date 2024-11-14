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

// CategorySchema.virtual('id').get(function () {
//     return this._id.toString();
// });

// CategorySchema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     //transform: function (doc, ret) {
// //        delete ret._id;
// //        return ret;
// //    }
// });

const CategoryModel = mongoose.model<ICategory>('category', CategorySchema);

export default CategoryModel;
