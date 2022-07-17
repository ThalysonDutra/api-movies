import { Router } from "express";
import { CategoryController } from "../modules/categories/CategoryController";

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.post("/", (request, response) => {
  return categoryController.createCategory(request, response);
});

categoriesRoutes.get("/", (request, response) => {
  return categoryController.listCategory(request, response);
});

categoriesRoutes.put("/:id", (request, response) => {
  return categoryController.updateCategory(request, response);
});

categoriesRoutes.delete("/:id", (request, response) => {
  return categoryController.deleteCategory(request, response);
});

export { categoriesRoutes };