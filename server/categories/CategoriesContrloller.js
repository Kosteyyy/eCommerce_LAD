import Category from "./CategoriesModel.js";
import CategoryService from "./CategoriesService.js";

class CategoryController {
  async create(req, res) {
    try {
      const category = await CategoryService.create(req.body);
      res.json(category);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async find(req, res) {
    try {
      // console.log("categoryController.find, query: ", req.query);
      const categories = await CategoryService.find(req.query);
      res.json(categories);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const categories = await CategoryService.getAll();
      return res.json(categories);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const category = await CategoryService.getOne(req.params.id);
      return res.json(category);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedCategory = await CategoryService.update(req.body);
      return res.json(updatedCategory);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const category = await CategoryService.delete(req.params.id);
      return res.json(category);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new CategoryController();
