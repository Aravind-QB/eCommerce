import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OrderService } from '../order/order.service';
// crypto module
// import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private orderService: OrderService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const algorithm = 'aes-256-cbc';
    // const initVector = process.env.INIT_VECTOR;
    // const Securitykey = process.env.SECRET_KEY;

    // // the cipher function
    // const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    // // encrypt the message
    // // input encoding
    // // output encoding
    // let encryptedData = cipher.update(pass, 'utf-8', 'hex');

    // encryptedData += cipher.final('hex');

    // console.log('Encrypted message: ' + encryptedData);

    // // the decipher function
    // const decipher = crypto.createDecipheriv(
    //   algorithm,
    //   Securitykey,
    //   initVector,
    // );

    // let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');

    // decryptedData += decipher.final('utf8');

    // console.log('Decrypted message: ' + decryptedData);

    const user = await this.usersService.findOneAuth({
      username: username,
      password: pass,
    });

    if (user && bcrypt.compare(user.password, await bcrypt.hash(pass, 10))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // console.log(user.user);
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
    // console.log({payload});
    return {
      access_token: this.jwtService.sign(payload),
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
