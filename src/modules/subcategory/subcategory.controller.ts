import { Request, Response } from 'express';
import SubCategory from './subcategory.model';

export const createSubCategory = async (req: Request, res: Response) => {
  const { sub_name, category, description, subcategory_image } = req.body;

  try {
    const subCategoryData = { sub_name, category, subcategory_image, description };
    const savedSubCategory = await SubCategory.create(subCategoryData);

    res.status(201).json({
      message: "Sub Category created successfully",
      subcategory: savedSubCategory,
    });
  } catch (error) {
    console.error("Error occurred while creating sub category:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const getSubCategories = async (req: Request, res: Response) => {
  try {
    const subcategories = await SubCategory.find();
    res.status(200).json(subcategories);
    console.log(subcategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
    
  }
  
};

export const searchSubCategories = async (req: Request, res: Response) => {
  try {
    const { sub_name } = req.query;
    const data = await SubCategory.find({ sub_name: { $regex: new RegExp(sub_name as string), $options: "i" } });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while fetching categories:", error);
    res.status(404).json({ message: error.message });
  }
};

export const getSubCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    console.log("eioioiljjhjkhuioi");
    
    const subcategory = await SubCategory.findById(id).populate("category");
    if (!subcategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
