import express from 'express';
import { businessStats, categoryStats, subCategoryStats } from './controllers';
import { validateKeyInputs } from '../../middlewares/validate';

const router = express.Router();

router.get('/businessStats', validateKeyInputs({ key: "query", inputArr: [] }), businessStats);
router.get('/categoryStats', validateKeyInputs({ key: "query", inputArr: [] }), categoryStats);
router.get('/subCategoryStats', validateKeyInputs({ key: "query", inputArr: [] }), subCategoryStats);

export default router;
