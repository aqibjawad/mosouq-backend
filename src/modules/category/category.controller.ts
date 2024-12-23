import Category from "./category.model";

export async function createCategory(req, res) {
  const { name, category_image } = req.body;
  try {
    const categoryData = { name, category_image };
    const savedCategory = await Category.create(categoryData);
    res.status(201).json({
      message: "Category created successfully",
      category: savedCategory,
    });
  } catch (error) {
    console.error("Error occurred while creating category:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error occurred while fetching categories:", error);
    res.status(404).json({ message: error.message });
  }
};

export const searchCategories = async (req, res) => {
  try {
    const { name } = req.query;
    const data = await Category.find({
      name: { $regex: new RegExp(name), $options: "i" },
    });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error occurred while fetching categories:", error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error occurred while deleting category:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, category_image } = req.body;

  try {
    const updateData = { name, category_image };

    // Add the new: true and runValidators: true options
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true, // This will return the updated document
      runValidators: true, // This ensures any mongoose validations run
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error occurred while updating category:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};
