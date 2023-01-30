import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as crypto from 'crypto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      // const algorithm = 'aes-256-cbc';
      // const passwordObj = JSON.parse(password || '');
      // const _password = passwordObj['_password'];
      // const vector = passwordObj['vector'];

      // // the decipher function
      // const decipher = crypto.createDecipheriv(
      //   algorithm,
      //   process.env.SECRET_KEY,
      //   vector,
      // );

      // let decryptedData = decipher.update(_password, 'hex', 'utf-8');

      // decryptedData += decipher.final('utf8');

      // console.log('Decrypted message: ' + decryptedData);

      const user = await this.authService.validateUser(username, password);
      // console.log(user);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
