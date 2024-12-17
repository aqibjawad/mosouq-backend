import 'dotenv/config';
import express from 'express';
import { createRequestForm} from './requestForm.controller';

const router = express.Router();


router.post('/create-form', createRequestForm);


export default router;
