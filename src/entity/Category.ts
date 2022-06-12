import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Movie } from "./Movie"


@Entity()
class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name!: string


    @OneToMany(() => Movie, (movie) => movie.category)
    movie: Movie[]
    
}

export { Category }