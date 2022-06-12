import { hash } from "bcrypt";
import { Request, Response } from "express";
import { usersRepository } from ".";

class UserController{

    async createUser(request: Request, response: Response): Promise<Response>{
        const { name, email, password, isAdmin } = request.body;
        
        const passwordHash = await hash(password, 8);
        const wasCreated = await usersRepository.create({ name, email, password:passwordHash, isAdmin });
        console.log(wasCreated);
        
        if(wasCreated){
          return response.status(201).send("Usuário criado com sucesso.");
        }
        else{
          return response.status(422).send("Usuário já existe.");
        }
      }
    

}

export {UserController}