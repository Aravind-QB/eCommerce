import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { OrderService } from '../order/order.service';
// import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
// import { promisify } from 'util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private orderService: OrderService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const iv = randomBytes(16);
    // const password = 'anything';

    // // The key length is dependent on the algorithm.
    // // In this case for aes256, it is 32 bytes.
    // const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
    // const cipher = createCipheriv('aes-256-ctr', key, iv);

    // const textToEncrypt = 'Nest';
    // const encryptedText = Buffer.concat([
    //   cipher.update(textToEncrypt),
    //   cipher.final(),
    // ]);
    // console.log(encryptedText);
    // const decipher = createDecipheriv('aes-256-ctr', key, iv);
    // const decryptedText = Buffer.concat([
    //   decipher.update(encryptedText),
    //   decipher.final(),
    // ]);
    // console.log(decryptedText.toString());

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
