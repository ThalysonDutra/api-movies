import { Not, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Movie } from "../../entity/Movie";


class MovieRepository {

    private repository: Repository<Movie>;

    constructor() {
        this.repository = AppDataSource.getRepository(Movie);
    }


    async create({ name, year, duration, description, categoryId }): Promise<boolean> {


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

    async list(): Promise<Movie[]> {
        const movies = await this.repository.find({});
        return movies;
    }

    async updateMovie(id, { name, year, duration, description, categoryId }): Promise<Boolean> {

        const movie = await this.repository.findOne({ where: { id: id } });

        if (movie) {
            const newMovie = await this.repository.find({where: {name: name, id: Not(id)}});
            
            if (newMovie.length > 0) {
                return false;
            }
            else {
                console.log("Aqui");
                movie.name = name;
                movie.year = year;
                movie.duration = duration;
                movie.description = description;
                movie.categoryId = categoryId;

                this.repository.save(movie);
                return true;
            }
        }
        else {
            return false;
        }

    }

    async deleteMovie(id): Promise<Boolean> {

        const movie = await this.repository.findOne({ where: { id: id } });

        if(movie){
            this.repository.delete(movie);
            return true;
        }
        else{
            return false;
        }
    }


}

export { MovieRepository }