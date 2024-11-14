import express from 'express';
import { upload } from '../../helpers/upload';
import { getDubai, createDubai, deleteDubai } from './dubai.controller';

const router = express.Router();

router.get('/get-dubai', getDubai);

router.post('/add-dubai', createDubai);

router.delete('/delete-dubai/:id', deleteDubai);

export default router;
