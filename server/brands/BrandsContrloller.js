import Brand from "./BrandsModel.js";
import BrandService from "./BrandsService.js";

class BrandController {
  async create(req, res) {
    try {
      const brand = await BrandService.create(req.body);
      res.json(brand);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async find(req, res) {
    try {
      const brands = await BrandService.find(req.query);
      res.json(brands);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const brands = await BrandService.getAll();
      return res.json(brands);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const brand = await BrandService.getOne(req.params.id);
      return res.json(brand);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedBrand = await BrandService.update(req.body);
      return res.json(updatedBrand);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const brand = await BrandService.delete(req.params.id);
      return res.json(brand);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new BrandController();
