import { Controller, Post, UseGuards, Get, Res, Req } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
// import { dbConstants, jwtConstants } from 'src/constants/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res) {
    const x = await this.authService.login(req);
    const cookiesOpts = {
      httpOnly: false,
      secure: false,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 3,
    };
    res.cookie('jwt', x['access_token'], cookiesOpts);
    return {
      response: {
        ...x,
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
  getProfile(@Req() request) {
    // console.log(request.cookies['jwt']);
    return request.user;
  }
}
