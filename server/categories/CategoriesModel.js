import mongoose from "mongoose";
//Здесь схема для монгуста

const Category = new mongoose.Schema({
  id: { type: String, required: true },
  categoryName: { type: String, required: true },
});

export default mongoose.model("Category", Category);
