import express from 'express';
import { addRecord, approveReview, deleteRecord, getAll, getApproved, getCount, getReviewsByBusinessId } from './review.controller';
import { validateKeyInputs } from '../../middlewares/validate';

const router = express.Router();

router.post('/addRecord', addRecord);
router.post('/approveReview', validateKeyInputs({ key: "body", inputArr: ["id"] }), approveReview);

router.delete('/deleteRecord', deleteRecord);

router.get('/getRecords', getApproved);

router.get('/getAll', getAll);

router.get('/getCount', getCount);

router.get('/getRecord/:_id', getReviewsByBusinessId);

export default router;
