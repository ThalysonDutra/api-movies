import { Request, Response } from "express";
import { RepositoryNotTreeError } from "typeorm";
import { moviesRepository } from ".";

class MovieController{

    async createMovie(request: Request, response: Response): Promise<Response>{
        const { name, year, duration, description, categoryId, link } = request.body;
        
        const wasCreated = await moviesRepository.create({name, year, duration, description, categoryId, link });
        
        console.log(categoryId);
        
        if(wasCreated){
          return response.status(201).send("Filme criado com sucesso.");
        }
        else{
          return response.status(422).send("Filme já existe.");
        }
      }
    
      async listMovie(request: Request, response: Response): Promise<Response>{
        const movies = await moviesRepository.list();
        return response.status(201).json(movies);

      }

      async updateMovie (request: Request, response: Response): Promise<Response>{
          
          const { name, year, duration, description, categoryId, link } = request.body;
          const {id} = request.params;
          const editMovie = await moviesRepository.updateMovie(id, {name, year, duration, description,  categoryId, link});

          if(editMovie){
            return response.status(201).send("Filme editado com sucesso.");
          }
          else{
            return response.status(422).send("Filme já existe.")
          }          
      }

      async deleteMovie (request: Request, response: Response): Promise<Response>{

        const {id} = request.params;
        const movie = await moviesRepository.deleteMovie(id);
        if(movie){
          return response.status(201).send("Filme excluído com sucesso.")
        }
        else{
          return response.status(422).send("Não foi possível excluir filme.")
        }
      }
      

      async scoreMovie (request: Request, response: Response): Promise<Response>{

        const {id} = request.params;
        const { score } = request.body;

        const movie = await moviesRepository.giveRate(id, score);
        if(movie){
          return response.status(201).send("Filme avaliado com sucesso.")
        }
        else{
          return response.status(422).send("Não foi possível avaliar filme.")
        }
      }

      async findById (request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        const {data} = request.body;

        const movie = await moviesRepository.findById(id);
        
        if(movie){
          return response.status(201).json(movie);
        }
        else{
          return response.status(422).send("Filme não encontrado.");
        }

      }

}

export {MovieController}