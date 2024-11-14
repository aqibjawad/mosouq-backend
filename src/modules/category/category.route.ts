import express from 'express';
import { createCategory, getCategories, deleteCategory, updateCategory, searchCategories } from './category.controller';

const router = express.Router();


router.get('/get-categories', getCategories);
router.get('/searchCategories', searchCategories);
router.post('/add-category', createCategory);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

export default router;
