import { Request, Response } from "express";
import { categoriesRepository } from ".";

class CategoryController{

    async createCategory(request: Request, response: Response): Promise<Response>{
        const { name } = request.body;
        
        const wasCreated = await categoriesRepository.create({ name });
        
        if(wasCreated){
          return response.status(201).send("Categoria criada com sucesso.");
        }
        else{
          return response.status(422).send("Categoria já existe.");
        }
      }
    

}

export {CategoryController}