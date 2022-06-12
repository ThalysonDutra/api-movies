import { Router } from "express";
import { UserController } from "../modules/users/UserController";


const usersRotas = Router();

const userController = new UserController();

usersRotas.post("/", (request, response) => {
    return userController.createUser(request,response);
  });

export { usersRotas };