import { Repository } from "typeorm";
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
        const hasCategory = await this.repository.findOne({ where: { name: name } });
        return hasCategory;
    }


}

export { CategoryRepository }