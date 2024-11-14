import express from 'express';
import { upload } from '../../helpers/upload';
import { createCompany, getCompanies } from './businesscompanies.controller';

const router = express.Router();


router.get('/get-business-companies', getCompanies);

router.post('/add-business-company', createCompany);

export default router;
