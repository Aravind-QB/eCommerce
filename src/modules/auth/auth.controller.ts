import { Controller, Post, UseGuards, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { OrderService } from '../order/order.service';
// import { dbConstants, jwtConstants } from 'src/constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService,
    private orderService: OrderService,) {
    }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    const x = await this.authService.login(req);
    const cookiesOpts = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      // path: '/',
      maxAge: 10* 24 * 60 * 60 * 1000,
      // domain:'localhost'
    };
    // res.set({'Access-Control-Allow-Credentials': true})
    // res.set({'Access-Control-Allow-Origin': 'http://localhost:3000'})
    res.cookie('emart', x['access_token'], cookiesOpts);
    return {
      response: {
        firstName: x['firstName'],
        lastName: x['lastName'],
        unfinishedOrder: x['unfinishedOrder'],
        expire: new Date().setDate(new Date().getDate() + 1),
      },
    };
  }

  // @Post('register')
  // async register(@Request() req) {
  //   return this.authService.register(req);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() request) {
    const unfinishedOrder = await this.orderService.findOneByStatus(
      'Pending',
      request.user.user,
    );
    return {...request.user,
      unfinishedOrder: unfinishedOrder,};
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res({ passthrough: true }) res) {
    res.clearCookie('emart')
    res
      .status(HttpStatus.OK)
      .send('Logged out!');
  }
}
