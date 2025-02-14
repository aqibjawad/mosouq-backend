import { Application } from 'express';
import authRoutes from '../modules/authentication/user.routes';
import businessRoutes from '../modules/authBusiness/business.routes';
import categoryRoutes from '../modules/category/category.route';
import subCategoryRoute from '../modules/subcategory/subcategory.route';
import companyRoute from '../modules/companies/companies.route';
import trendBusinessRoute from '../modules/trending/business.route';
import dealRoute from '../modules/deals/deals.route';
import dubaiRoute from '../modules/dubai/dubai.route';
import businessCompany from '../modules/companylink/businesscompanies.route';
import integCompany from '../modules/integCompanylink/integCompanies.route';
import BusinessAuth from '../modules/authBusiness/business.routes';
import ProfileBusiness from '../modules/profileBusiness/profileBusiness.routes';
import AddStaff from "../modules/staff/staff.routes"
import BusinessTimings from "../modules/businessTimings/businessTimings.routes";
import BusinessStats from "../modules/businessStats/businessStats.route";
import Admin from "../modules/admin/routes";
import Utils from "../modules/utils/routes";

import reviews from "../modules/reviews/review.route";

import requestForm from "../modules/requestform/requestForm.route";

import faqs from "../modules/faqs/faqs.routes";

export default function router(app: Application): void {
  app.use('/api/user', authRoutes);
  app.use('/api/business', businessRoutes);
  app.use('/api/subcategory', subCategoryRoute);
  app.use('/api/category', categoryRoutes);
  app.use('/api/company', companyRoute);
  app.use('/api/trendbusiness', trendBusinessRoute);
  app.use('/api/deal', dealRoute);
  app.use('/api/dubai', dubaiRoute);
  app.use('/api/business-company', businessCompany);
  app.use('/api/integration-company', integCompany);
  app.use('/api/business-user', BusinessAuth);
  app.use('/api/business-profile', ProfileBusiness);
  app.use('/api/staff', AddStaff);
  app.use('/api/businessTimings', BusinessTimings);
  app.use('/api/businessStats', BusinessStats);
  app.use('/api/admin', Admin);
  app.use('/api/utils', Utils);

  app.use('/api/reviews', reviews);

  app.use('/api/requestForm', requestForm);

  app.use('/api/faqs', faqs);
}
