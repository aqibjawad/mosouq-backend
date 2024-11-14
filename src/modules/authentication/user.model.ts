import mongoose, { Document, Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';

export interface IAuth extends Document {
  name: string;
  company: string;
  email: string;
  country: string;
  phone: string;
  password?: string;
  terms: string;
  role?: string;
  otp?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AuthSchema = new mongoose.Schema<IAuth>({
  name: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: false },
  terms: { type: String, required: true },
  role: { type: String, required: false },
  otp: { type: String, required: false },
}, {
  collection: 'auth',
  timestamps: true,
});

AuthSchema.virtual('id').get(function () {
  return this._id.toString();
});

AuthSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  //transform: function (doc, ret) {
  //        delete ret._id;
  //        return ret;
  //    }
});

AuthSchema.plugin(mongooseAutoPopulate);

const AuthModel = mongoose.model<IAuth>('Auth', AuthSchema);

export default AuthModel;
