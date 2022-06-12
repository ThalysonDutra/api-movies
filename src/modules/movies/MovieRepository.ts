import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entity/Movie";


class MovieRepository {

    private repository: Repository<Movie>;

    constructor() {
        this.repository = AppDataSource.getRepository(Movie);
    }


    async create({ name, year, duration, description,  categoryId}): Promise<boolean> {
       

        const movieAlreadyExists = await this.findByName(name);

        if (movieAlreadyExists) {
            return false;
        }
        else {
            const movie = this.repository.create({
                name, year, duration, description, categoryId 
            });
    
            await this.repository.save(movie);
            return true;
        }

    }

    async findByName(name: string): Promise<Movie> {
        const hasMovie = await this.repository.findOne({ where: { name: name } });
        return hasMovie;
    }


}

export { MovieRepository }