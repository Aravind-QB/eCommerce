import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import * as crypto from 'crypto-js';

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
      const Securitykey = process.env.SECRET_KEY;
      var decrypted = crypto.AES.decrypt(password, Securitykey);
      var password = decrypted.toString(crypto.enc.Utf8);

      const user = await this.authService.validateUser(username, password);
      
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
