import mongoose from "mongoose";
//Здесь схема для монгуста

const User = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  receiveNewsLetters: { type: Boolean, required: true },
  role: { type: String, required: true },
});

export default mongoose.model("User", User);
