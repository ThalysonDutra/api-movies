import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn, ManyToOne } from "typeorm"
import { Category } from "./Category"


@Entity()
class Movie {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name!: string

    @Column()
    year!: number

    @Column()
    duration!: number

    @Column()
    description!: string

    @Column()
    categoryId: number

    @ManyToOne(type => Category, category => category.movie, {onDelete:"CASCADE"})
    category: Category
    
}

export { Movie }