import express from 'express';
import { createRecord, getAll } from './businessStats.controller';
import { validateKeyInputs } from '../../middlewares/validate';

const router = express.Router();

router.post('/addRecord', validateKeyInputs({ key: "body", inputArr: ["businessId", "userId", "type"] }), createRecord);
router.get('/getAll', validateKeyInputs({ key: "query", inputArr: ["-businessId", "-userId", "-type"] }), getAll);

export default router;
