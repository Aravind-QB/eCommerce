import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '../../entities/users/users.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response, @Body() user: User) {
    const newUser = await this.usersService.createUser(user);
    if (!!newUser) {
      return response.status(HttpStatus.CREATED).json({
        success: 'User created successfully',
        newUser,
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        failed: 'User creation failed',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Res() response) {
    const users = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json({
      users,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const user = await this.usersService.findOne(id);
    if (!!user) {
      return response.status(HttpStatus.OK).json({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        phonenumber: user.phoneNumber,
      });
    } else {
      return response.status(HttpStatus.NOT_FOUND).json({});
    }
  }

  @Post('/login')
  async login(@Res() response, @Body() user: User) {
    const _user = await this.usersService.login(user.username, user.password);
    if (!!_user) {
      return response.status(HttpStatus.OK).json({
        status: 'Loggedin successfully',
        firstname: _user.firstName,
        lastname: _user.lastName,
        email: _user.email,
        phonenumber: _user.phoneNumber,
      });
    } else {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 'Loggedin failed',
      });
    }
  }
}
