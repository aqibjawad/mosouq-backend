import express from 'express';
import { upload } from '../../helpers/upload';
import { getBusiness, createBusiness, deleteBusiness } from './business.controller';

const router = express.Router();

router.get('/get-trend-business', getBusiness);

router.post('/add-trendbusiness', createBusiness);

router.delete('/delete-business/:id', deleteBusiness);

export default router;
