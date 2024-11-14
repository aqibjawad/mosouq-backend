import express from 'express';
import { upload } from '../../helpers/upload';
import { createCompany, getCompanies } from './integCompanies.controller';

const router = express.Router();

router.get('/get-integ-companies', getCompanies);
router.post('/add-integ-company', createCompany);

export default router;
