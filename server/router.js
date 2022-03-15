import Router from "express";
import UserController from "./users/UserContrloller.js";
import OrderController from "./orders/OrdersContrloller.js";
import BrandController from "./brands/BrandsContrloller.js";
import CategoryController from "./categories/CategoriesContrloller.js";
import ProductController from "./products/ProductContrloller.js";

const router = new Router();

router.post("/users", UserController.create);
router.get("/users?", UserController.find);
router.get("/users", UserController.getAll); //Если поменять местами с find то всегда выполняется getAll и query не читается. А так никогда не выполняется GetAll, даже если без query то выполняется find
router.get("/users/:id", UserController.getOne);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

router.post("/orders", OrderController.create);
router.get("/orders?", OrderController.find);
router.get("/orders/:id", OrderController.getOne);
router.put("/orders/:id", OrderController.update);
router.delete("/orders/:id", OrderController.delete);

router.get("/brands?", BrandController.find);

router.get("/products?", ProductController.find);

router.get("/categories?", CategoryController.find);

export default router;
