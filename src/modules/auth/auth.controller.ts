import { Controller, Request, Post, UseGuards, Get, Res } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
// import { dbConstants, jwtConstants } from 'src/constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const x = await this.authService.login(req);
    return x;
    // const cookiesOpts = {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   path: '/',
    //   maxAge: 60 * 60 * 24 * 3,
    // };
    // res.cookie('jwt', x, cookiesOpts);
    // return {
    //   response: {
    //     x,
    //     expire: new Date().setDate(new Date().getDate() + 3),
    //   },
    // };
  }

  // @Post('register')
  // async register(@Request() req) {
  //   return this.authService.register(req);
  // }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
