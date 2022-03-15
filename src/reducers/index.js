import { userReducer } from "./user-reducers.js";
import {
  ordersReducer,
  productsReducer,
  brandsReducer,
  categoriesReducer,
} from "./order-reducers.js";
import { combineReducers } from "redux";

var allReducers = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  products: productsReducer,
  brands: brandsReducer,
  categories: categoriesReducer,
});
export default allReducers;
