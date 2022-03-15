import mongoose from "mongoose";
//Здесь схема для монгуста

const Product = new mongoose.Schema({
  id: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  brandId: { type: String, required: true },
  categoryId: { type: String, required: true },
  rating: { type: Number, required: true },
  img: { type: String, required: true },
});

export default mongoose.model("Product", Product);
