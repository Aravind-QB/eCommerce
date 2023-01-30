import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, res: any): Promise<{
        response: {
            unfinishedOrder: import("../../entities/order/order.entity").Order[];
            expire: number;
            access_token: string;
        };
    }>;
    getProfile(request: any): any;
}
