import mongoose, { Document, Schema } from 'mongoose';

export interface IIntegrationCompany extends Document {
  link: string;
  integration_comp_image?: string;
}

const companySchema = new Schema<IIntegrationCompany>(
  {
    link: { type: String },
    integration_comp_image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IIntegrationCompany>('IntegrationCompany', companySchema);
