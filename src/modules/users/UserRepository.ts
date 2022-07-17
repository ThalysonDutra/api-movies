import { Not, Repository } from "typeorm";
import { usersRepository } from ".";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";
import { compare, hash } from "bcrypt";

class UserRepository {

    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async create({ name, email, password, isAdmin }): Promise<boolean> {
       

        const userAlreadyExists = await this.findByEmail(email);

        if (userAlreadyExists) {
            return false;
        }
        else {
            const user = this.repository.create({
                name, email, password, isAdmin
            });
    
            await this.repository.save(user);
            return true;
        }

    }

    async findByEmail(email: string): Promise<User> {
        const hasUser = await this.repository.findOne({ where: { email: email } });
        return hasUser;
    }

    async find(): Promise<User[]> {
        const user = await this.repository.find({});
        return user;        
    }

    async updateUser (id, {name, email, password, isAdmin }): Promise<Boolean>{

        const user = await this.repository.findOne({where:{ id : id }});

        if(user){
            const newUser = await this.repository.find({ where: { email: email, id: Not(id)}});
            if(newUser.length > 0){
                return false;
            }
            else{
                user.name = name;
                user.email = email;
                user.password = password;
                user.isAdmin = isAdmin;
                this.repository.save(user);
                return true;
            }
        }
        else{
            return false;
        }
    }

    async deleteUser (id): Promise<Boolean>{

        const user = await this.repository.findOne({where: {id : id}});
        console.log(user);
        if(user != null){
            this.repository.delete(user);
            return true;
        }
        else{
            return false;
        }
    }

    async login(email, password): Promise<Boolean>{

        const passwordHash = await hash(password, 8);
        const user = await usersRepository.findByEmail(email);        

        if(user){
            const login = await compare(password,user.password);
            if(login){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }

    }


}

export { UserRepository }