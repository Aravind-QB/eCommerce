import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/users/users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/models/create-user.dto';
import * as crypto from 'crypto';
import * as cryptojs from 'crypto-js';
import { OrderService } from '../order/order.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private orderService: OrderService,
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

  async createUser(_user: CreateUserDto): Promise<User | string> {
    try {
      let existingUser = await this.usersRepository.findOneBy({
        email: _user.email
      });
      if(existingUser) {
        return 'Email already exists!';
      }

      existingUser = await this.usersRepository.findOneBy({
        phoneNumber: _user.phoneNumber
      });
      if(existingUser) {
        return 'Phone number already exists!';
      }
      let user = new User();
      user = Object.assign(user, _user);
      console.log(user);

      const Securitykey = process.env.SECRET_KEY;
      var decrypted = cryptojs.AES.decrypt(user.password, Securitykey);
      var password = decrypted.toString(cryptojs.enc.Utf8);
      
      const algorithm = 'aes-256-cbc';

      console.log('Decrypted message: ' + password);

    const initVector = process.env.INIT_VECTOR;

    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(password, 'utf-8', 'hex');

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
  async checkExistingUser(username){
    let existingUser = await this.usersRepository.findOneBy({
      username: username,
    });
    return existingUser;
  }

  findDefaultPayment(user) {
    return this.orderService.findDefaultPayment(user);
  }
}
