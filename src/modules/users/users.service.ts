import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users/users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/models/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
      },
      where: {
        isActive: true,
      },
    });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({
      id,
      isActive: true,
    });
  }

  async createUser(_user: CreateUserDto): Promise<User> {
    try {
      let user = new User();
      user = Object.assign(user, _user);
      user.password = await bcrypt.hash(_user.password, 10);
      const newUser = this.usersRepository.save(user).then().catch();
      return newUser;
    } catch (error) {
      return error;
    }
  }

  login(username: string, password: string): Promise<User> {
    return this.usersRepository.findOneBy({
      username: username,
      password: password,
      isActive: true,
    });
  }

  async findOneAuth(data: number | any): Promise<User | undefined> {
    return await this.usersRepository.findOneBy(data);
  }
}
