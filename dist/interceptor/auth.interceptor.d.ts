import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';
import { UsersService } from '../modules/users/users.service';
export declare class AuthInterceptor implements NestInterceptor {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
