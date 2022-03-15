import mongoose from "mongoose";
//Здесь схема для монгуста

const Order = new mongoose.Schema({
  id: { type: String, required: true },
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  isPaymentCompleted: { type: Boolean, required: true },
});

export default mongoose.model("Order", Order);
