import mongoose, { Document, Schema } from 'mongoose';
import mongooseAutoPopulate from 'mongoose-autopopulate';
import AuthModel from '../authentication/user.model'; // Import the Auth model

export interface IStaff extends Document {
  name: string;
  email: string;
  phone: string;
  password?: string;
  picture?: string;
  otp?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const StaffSchema = new mongoose.Schema<IStaff>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: false },
  otp: { type: String, required: false },
}, {
  collection: 'staff',
  timestamps: true,
});

StaffSchema.virtual('id').get(function () {
  return this._id.toString();
});

StaffSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
});

// Middleware to save staff info to auth table
StaffSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const authDoc = new AuthModel({
        name: this.name,
        email: this.email,
        phone: this.phone,
        password: this.password,
        role: 'staff',
        company: 'Staff Company', // You might want to set this dynamically
        country: 'Staff Country', // You might want to set this dynamically
        terms: 'Accepted', // You might want to handle this differently
      });
      await authDoc.save();
    } catch (error) {
      console.error('Error saving staff to auth table:', error);
      next(error);
    }
  }
  next();
});

StaffSchema.plugin(mongooseAutoPopulate);

const StaffModel = mongoose.model<IStaff>('Staff', StaffSchema);

export default StaffModel;