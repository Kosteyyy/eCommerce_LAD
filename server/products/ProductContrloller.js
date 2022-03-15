import Product from "./ProductsModel.js";
import ProductService from "./ProductsService.js";

class ProductController {
  async create(req, res) {
    try {
      const product = await ProductService.create(req.body);
      res.json(product);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async find(req, res) {
    // console.log("find, query: ", req.query);
    try {
      const product = await ProductService.find(req.query);
      res.json(product);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    // console.log("GetAll, query: ", req.query);
    try {
      const products = await ProductService.getAll();
      return res.json(products);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const product = await ProductService.getOne(req.params.id);
      return res.json(product);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedProduct = await ProductService.update(req.body);
      return res.json(updatedProduct);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const product = await ProductService.delete(req.params.id);
      return res.json(product);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new ProductController();
