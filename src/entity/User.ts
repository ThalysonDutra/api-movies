import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, JoinColumn } from "typeorm"


@Entity()
class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name!: string

    @Column({unique: true})
    email!: string

    @Column()
    password!: string

    @Column({default: false})
    isAdmin: boolean

    
}

export { User }