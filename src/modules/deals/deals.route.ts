import express from 'express';
import { upload } from '../../helpers/upload';
import {
    createDeal,
    getDeals,
    getDealById,
    deleteDeal
} from './deals.controller';

const router = express.Router();

router.get('/get-deals', getDeals);

router.post('/add-deal', createDeal);

router.get('/get-deal/:id', getDealById);

router.delete('/delete-deal/:id', deleteDeal);

export default router;
