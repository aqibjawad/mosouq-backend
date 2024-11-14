import express from 'express';
import { upload } from '../../helpers/upload';
import { createSubCategory, getSubCategoryById, getSubCategories, searchSubCategories } from './subcategory.controller';

const router = express.Router();

router.get('/get-subcategories', getSubCategories);
router.get('/searchSubCategories', searchSubCategories);
router.post('/add-subcategory', createSubCategory);
router.get('/get-subcategories/:id', getSubCategoryById);

export default router;
 