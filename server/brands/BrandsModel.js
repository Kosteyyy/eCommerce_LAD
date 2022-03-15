import mongoose from "mongoose";
//Здесь схема для монгуста

const Brand = new mongoose.Schema({
  id: { type: String, required: true },
  brandName: { type: String, required: true },
});

export default mongoose.model("Brand", Brand);
