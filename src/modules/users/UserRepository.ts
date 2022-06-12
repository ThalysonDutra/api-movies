import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

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


}

export { UserRepository }