import "reflect-metadata"
import { DataSource } from "typeorm"
import { Category } from "./entity/Category"
import { Movie } from "./entity/Movie"
import { User } from "./entity/User"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Thalyson18!",
    database: "api_db",
    synchronize: true,
    logging: false,
    entities: [User, Movie, Category],
    migrations: [],
    subscribers: [],
})
