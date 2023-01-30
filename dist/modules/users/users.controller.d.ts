import { CreateUserDto } from 'src/models/create-user.dto';
import { User } from '../../entities/users/users.entity';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(response: any, user: CreateUserDto): Promise<any>;
    fetchAll(response: any): Promise<any>;
    findById(response: any, id: any): Promise<any>;
    login(response: any, user: User): Promise<any>;
}
