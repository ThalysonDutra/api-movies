import { Request, Response } from "express";
import { categoriesRepository } from ".";
import { Category } from "../../entity/Category";

class CategoryController{

    async createCategory(request: Request, response: Response): Promise<Response>{
        const { name } = request.body;
        
        const wasCreated = await categoriesRepository.create({ name });
        
        if(wasCreated && name != null){
          return response.status(201).send("Categoria criada com sucesso.");
        }
        else{
          return response.status(422).send("Categoria já existe.");
        }
      }

      async listCategory(request: Request, response: Response): Promise<Response>{
        
        const categories = await categoriesRepository.listCategory();
        
        if(categories.length > 0){
          return response.status(201).json(categories);
        }
        else{
          return response.status(422).send("A lista de categorias está vazia.");
        }
        
      }

      async updateCategory(request: Request, response: Response): Promise<Response>{

        const { name } = request.body;
        const { id } = request.params;

        const newCategory = await categoriesRepository.updateCategory(id, {name});

        if(newCategory){
          return response.status(201).send("Categoria editada com sucesso.");
        }
        else{
          return response.status(422).send("Categoria já existe.");
        }
      }

      async deleteCategory(request: Request, response: Response): Promise<Response>{

        const {id} = request.params;
        
        const category = await categoriesRepository.deleteCategory(id);

        if(category){
          return response.status(201).send("Categoria apagada com sucesso.");
        }
        else{
          return response.status(422).send("Não foi possível apagar categoria.");
        }
      }

      async findByID(request: Request, response: Response): Promise<Response>{
        const {id} = request.params;
        
        const category = await categoriesRepository.findById(id);
        
        if(category){
          return response.status(201).json(category);
        }
        else{
          return response.status(422).send("Categoria não encontrada.");
        }
      }

      async findByName(request: Request, response: Response): Promise<Response>{

        const { name } = request.body;

        const category = await categoriesRepository.findByName(name);

        if(category){
          return response.status(201).json(category);
        }
        else{
          return response.status(422).send("Categoria não encontrada.");
        }
      }




}

export {CategoryController}