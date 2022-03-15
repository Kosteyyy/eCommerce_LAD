import Brand from "./BrandsModel.js";

class BrandService {
  async create(brand) {
    const createdBrand = await Brand.create(brand);
    return createdBrand;
  }

  async find(query) {
    const brands = await Brand.find(query);
    return brands;
  }

  async getAll() {
    const brands = await Brand.find();
    return brands;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const brand = await Brand.findById(id);
    return brand;
  }

  async update(brand) {
    if (!brand._id) {
      throw new Error("Не указан ID");
    }
    const updatedBrand = await Brand.findByIdAndUpdate(brand._id, brand, {
      new: true,
    });
    return updatedBrand;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const brand = await Brand.findByIdAndDelete(id);
    return brand;
  }
}

export default new BrandService();
