import Category from "./CategoriesModel.js";

class CategoryService {
  async create(category) {
    const createdCategory = await Category.create(category);
    return createdCategory;
  }

  async find(query) {
    const categories = await Category.find(query);
    return categories;
  }

  async getAll() {
    const category = await Category.find();
    return category;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const category = await Category.findById(id);
    return category;
  }

  async update(category) {
    if (!category._id) {
      throw new Error("Не указан ID");
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      category,
      {
        new: true,
      }
    );
    return updatedCategory;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const category = await Category.findByIdAndDelete(id);
    return category;
  }
}

export default new CategoryService();
