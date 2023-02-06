import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Addresses } from 'src/entities/users/user-addresses';
import { User } from 'src/entities/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
    constructor(
      @InjectRepository(Addresses)
      private addressRepository: Repository<Addresses>,
    ) {}
  
    createAddress(address: Addresses): Promise<Addresses> {
      try {
        const newaddress = this.addressRepository.save(address);
        return newaddress;
      } catch (error) {
        return error;
      }
    }
  
    findAll(user: User): Promise<Addresses[]> {
      return this.addressRepository.find({
        select: {
          id: true,
          AddressLine1: true,
          AddressLine2: true,
          AddressType: true,
          Area: true,
          City: true,
          State: true,
          Zipcode: true,
          Landmark: true,
          Phonenumber: true,
        },
        where: {
          IsActive: true,
          user: user
        },
      });
    }
}
