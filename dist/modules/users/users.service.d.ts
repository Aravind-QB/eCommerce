import { Repository } from 'typeorm';
import { User } from '../../entities/users/users.entity';
import { CreateUserDto } from 'src/models/create-user.dto';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    createUser(_user: CreateUserDto): Promise<User>;
    login(username: string, password: string): Promise<User>;
    findOneAuth(data: number | any): Promise<User | undefined>;
}
