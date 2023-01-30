import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OrderService } from '../order/order.service';
export declare class AuthService {
    private usersService;
    private orderService;
    private jwtService;
    constructor(usersService: UsersService, orderService: OrderService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        unfinishedOrder: import("../../entities/order/order.entity").Order[];
    }>;
    decodeToken(token: any): any;
}
