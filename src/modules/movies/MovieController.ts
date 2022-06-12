import { Request, Response } from "express";
import { moviesRepository } from ".";

class MovieController{

    async createMovie(request: Request, response: Response): Promise<Response>{
        const { name, year, duration, description, categoryId } = request.body;
        
        const wasCreated = await moviesRepository.create({name, year, duration, description, categoryId });
        
        console.log(categoryId);
        
        if(wasCreated){
          return response.status(201).send("Filme criado com sucesso.");
        }
        else{
          return response.status(422).send("Filme já existe.");
        }
      }
    

}

export {MovieController}