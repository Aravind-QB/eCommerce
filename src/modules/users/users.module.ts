import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/users/users.entity';
import { Addresses } from 'src/entities/users/user-addresses';
import { OrderModule } from '../order/order.module';
import { AddressModule } from '../address/address.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Addresses]), OrderModule, AddressModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
