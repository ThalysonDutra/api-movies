import { hash } from "bcrypt";
import { Request, Response } from "express";
import { Repository, RepositoryNotTreeError } from "typeorm";
import { usersRepository } from ".";

class UserController {

  async createUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password, isAdmin } = request.body;

    const passwordHash = await hash(password, 8);
    const wasCreated = await usersRepository.create({ name, email, password: passwordHash, isAdmin });
    console.log(wasCreated);

    if (wasCreated) {
      return response.status(201).send("Usuário criado com sucesso.");
    }
    else {
      return response.status(422).send("Usuário já existe.");
    }
  }

  async listUser(request: Request, response: Response): Promise<Response> {

      const users = await usersRepository.find();

      if(users){
        return response.status(201).json(users);
      }
      else{
        return response.status(422).send("Não há usuários cadastrados.")
      }
      
  }


  async updateUser(request: Request, response: Response): Promise<Response> {

    const {id} = request.params;
    const {name, email, password, isAdmin } = request.body;

    const user = await usersRepository.updateUser(id, {name, email, password, isAdmin });

    if(user){
      return response.status(201).send("Informações atualizadas com sucesso.")
    }
    else{
      return response.status(422).send("Não foi possível atualizar informações.")
    }
  }

  async deleteUser(request: Request, response: Response): Promise<Response> {

    const {id} = request.params;
    const user = await usersRepository.deleteUser(id);
    
    if(user){
      return response.status(201).send("Usuário excluído com sucesso.");
    }
    else{
      return response.status(422).send("Não foi possível excluir usuário.");
    }
    
  }

  async login(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;
    const loginValidator = await usersRepository.login(email, password);

    if(loginValidator){
      return response.status(201).send("Login realizado com sucesso.");
    }
    else{
      return response.status(422).send("Email ou senha incorretos.");
    }

  }


}

export { UserController }