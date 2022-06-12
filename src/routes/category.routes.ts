import { Router } from "express";
import { CategoryController } from "../modules/categories/CategoryController";

const categoriesRoutes = Router();

const categoryController = new CategoryController();

categoriesRoutes.post("/", (request, response) => {
    return categoryController.createCategory(request,response);
  });

export { categoriesRoutes };