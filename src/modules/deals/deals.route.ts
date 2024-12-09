import express from 'express';
import { upload } from '../../helpers/upload';
import {
    createDeal,
    getDeals,
    getDealById,
    deleteDeal,
    updateDealImages, 
    uploadMultipleFiles
} from './deals.controller';
import { uploadToMemory } from '../../helpers/upload';

const router = express.Router();

router.get('/get-deals', getDeals);

router.post('/add-deal', createDeal);
router.post("/upload-multiple-files", uploadToMemory.array("files", 10), uploadMultipleFiles)
router.post("/updateDealsImages", updateDealImages)

router.get('/get-deal/:id', getDealById);

router.delete('/delete-deal/:id', deleteDeal);

export default router;
