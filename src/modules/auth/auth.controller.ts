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
    const loginResponse = await this.authService.login(req);
    if(!loginResponse['access_token']) {
      res
      .status(HttpStatus.BAD_REQUEST)
      .json({
        "error":"User not found!"
      });
    }
    const cookiesOpts = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 10* 24 * 60 * 60 * 1000,
    };
    res.cookie('emart', loginResponse['access_token'], cookiesOpts);
    return {
      response: {
        firstName: loginResponse['firstName'],
        lastName: loginResponse['lastName'],
        unfinishedOrder: loginResponse['unfinishedOrder'],
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
    // res.clearCookie('emart')    
    const cookiesOpts = {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: -1,
    };
    res.cookie('emart', '', cookiesOpts);
    res
      .status(HttpStatus.OK)
      .send('Logged out!');
  }
}
