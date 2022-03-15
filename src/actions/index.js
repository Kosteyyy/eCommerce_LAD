import { login, logout } from "./user.js";
import {
  fetchOrders,
  createOrder,
  editOrder,
  deleteOrder,
  fetchProducts,
  fetchBrands,
  fetchCategories,
} from "./orders.js";

var actions = {
  login,
  logout,
  fetchOrders,
  createOrder,
  editOrder,
  deleteOrder,
  fetchProducts,
  fetchBrands,
  fetchCategories,
};
export default actions;
