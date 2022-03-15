import Product from "./ProductsModel.js";

class ProductService {
  async create(product) {
    const createdProduct = await Product.create(product);
    return createdProduct;
  }

  async find(query) {
    const products = await Product.find(query);
    return products;
  }

  async getAll() {
    const product = await Product.find();
    return product;
  }

  async getOne(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const product = await Product.findById(id);
    return product;
  }

  async update(product) {
    if (!product._id) {
      throw new Error("Не указан ID");
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      product,
      {
        new: true,
      }
    );
    return updatedProduct;
  }

  async delete(id) {
    if (!id) {
      throw new Error("Не указан ID");
    }
    const product = await Product.findByIdAndDelete(id);
    return product;
  }
}

export default new ProductService();
