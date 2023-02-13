import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/users/users.entity';
import { Addresses } from 'src/entities/users/user-addresses';

@Module({
  imports: [TypeOrmModule.forFeature([User, Addresses])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
