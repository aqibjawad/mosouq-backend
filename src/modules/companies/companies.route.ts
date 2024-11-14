import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { upload } from '../../helpers/upload';
import { createCompany, getCompanies } from './companies.controller';

const router = express.Router();


router.get('/get-companies', getCompanies);

router.post('/add-company', createCompany);

// router.put('/update-company/:id', companyController.updateCompany);

// router.delete('/delete-company/:id', companyController.deleteCompany);

export default router;
