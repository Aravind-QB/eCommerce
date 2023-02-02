import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users/users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/models/create-user.dto';
import * as crypto from 'crypto';

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
      console.log(user);
      
      const algorithm = 'aes-256-cbc';
      const passwordObj = JSON.parse(user.password || '');
      const _password = passwordObj['_password'];
      const vector = passwordObj['vector'];

      // the decipher function
      const decipher = crypto.createDecipheriv(
        algorithm,
        process.env.SECRET_KEY,
        vector,
      );

      let decryptedData = decipher.update(_password, 'hex', 'utf-8');

      decryptedData += decipher.final('utf8');

      console.log('Decrypted message: ' + decryptedData);

    const initVector = process.env.INIT_VECTOR;
    const Securitykey = process.env.SECRET_KEY;

    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(decryptedData, 'utf-8', 'hex');

    encryptedData += cipher.final('hex');
    console.log(encryptedData);
    
      user.password = encryptedData;
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
