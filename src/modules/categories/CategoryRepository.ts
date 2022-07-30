import { request } from "express";
import { Not, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entity/Category";


class CategoryRepository {

    private repository: Repository<Category>;

    constructor() {
        this.repository = AppDataSource.getRepository(Category);
    }


    async create({ name }): Promise<boolean> {


        const categoryAlreadyExists = await this.findByName(name);

        if (categoryAlreadyExists) {
            return false;
        }
        else {
            const category = this.repository.create({
                name
            });

            await this.repository.save(category);
            return true;
        }

    }

    async findByName(name: string): Promise<Category> {
        const hasCategory = await this.repository.findOne({ where: { name : name } });
        return hasCategory;
    }

    async listCategory(): Promise<Category[]> {

        const categories = await this.repository.find({});
        return categories;

    }

    async updateCategory(id, { name }): Promise<Boolean>{
        
        const category = await this.repository.findOne({where: {id:id}});

        if(category){
            const newCategory = await this.repository.find({where: {name: name, id: Not(id)}});
            if(newCategory.length > 0){
                return false;
            }
            else{
                category.name = name;
                this.repository.save(category);
                return true;
            }
        }
        else{
            return false;
        }
    }

    async findById(id){
        const category = await this.repository.findOne({where : { id : id }});
        return category;
    }

    async deleteCategory(id): Promise<Boolean>{

        const category = await this.repository.findOne({where:{id:id}});
        
        if(category){
            
            this.repository.delete(category);
            return true;
        }
        else{
            return false;
        }

    }

}

export { CategoryRepository }