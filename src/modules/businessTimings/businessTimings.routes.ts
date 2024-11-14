import 'dotenv/config';
import express from 'express';
import { updateBusinessTimings, getBusinessTimings } from './businessTimings.controller';

const router = express.Router();


router.post('/add-business-timings', updateBusinessTimings);

router.get('/getByBusinessId', getBusinessTimings);

export default router;
