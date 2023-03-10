import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OrderService } from '../order/order.service';
// crypto module
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private orderService: OrderService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const existingUser = await this.usersService.checkExistingUser(username);
    if(!existingUser) {
      return 'User not found!';
    }
    const algorithm = 'aes-256-cbc';
    const initVector = process.env.INIT_VECTOR;
    const Securitykey = process.env.SECRET_KEY;

    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(pass, 'utf-8', 'hex');

    encryptedData += cipher.final('hex');

    console.log('Encrypted message: ' + encryptedData);
    console.log('Encrypted pass: ' + pass);

    const user = await this.usersService.findOneAuth({
      username: username,
      password: encryptedData,
    });

    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if(user.user === 'User not found!') {
      return 'User not found!'
    }
    const unfinishedOrder = await this.orderService.findOneByStatus(
      'Pending',
      user.user,
    );
    const payload = {
      user: {
        id: user.user.id,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email,
        phoneNumber: user.user.phoneNumber,
      },
    };
    return {
      access_token: this.jwtService.sign(payload),
      firstName: user.user.firstName,
      lastName: user.user.lastName,
      unfinishedOrder: unfinishedOrder,
    };
  }

  // async register(data) {
  //   data.password = await bcrypt.hash(data.password, 10);
  //   const response = await this.usersService.createUser(data);
  //   if (response) {
  //     const { password, ...result } = response;
  //     return result;
  //   }
  // }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
