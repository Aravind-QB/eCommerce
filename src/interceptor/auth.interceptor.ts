import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
import { AuthService } from '../modules/auth/auth.service';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const tokenArray = req.cookies['emart'];
    
    if (tokenArray) {
      req.body['user'] = this.authService.decodeToken(
        tokenArray,
      )?.user;
    }

    return next
      .handle()
      .pipe
      // tap(() => console.log(``)),
      ();
  }
}
