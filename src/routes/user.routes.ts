import { Router } from "express";
import { UserController } from "../modules/users/UserController";


const usersRotas = Router();

const userController = new UserController();

usersRotas.post("/", (request, response) => {
  return userController.createUser(request, response);
});

usersRotas.get("/", (request, response) => {
  return userController.listUser(request, response);
});

usersRotas.put("/:id", (request, response) => {
  return userController.updateUser(request,response);
});

usersRotas.delete("/:id", (request, response) => {
  return userController.deleteUser(request,response);
});

usersRotas.post("/login", (request, response) => {
  return userController.login(request,response);
});

export { usersRotas };