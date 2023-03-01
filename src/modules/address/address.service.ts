import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressType } from 'src/constants/constants';
import { Addresses } from 'src/entities/users/user-addresses';
import { User } from 'src/entities/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService {
    constructor(
      @InjectRepository(Addresses)
      private addressRepository: Repository<Addresses>,
    ) {}
  
    createAddress(address: Addresses, user: User): Promise<Addresses> {
      try {
        if(address.IsDefault) { // && (!address.AddressType || address.AddressType == AddressType.SHIPPING)
          this.findAll(user).then(
            x=> {
              x.forEach(element => {
                this.addressRepository.save({
                  id: element.id, IsDefault: false
                });
              });
            }
          );
        }

        if(address.IsBillingDefault) { //  && (!address.AddressType || address.AddressType == AddressType.BILLING)
          this.findAll(user).then(
            x=> {
              x.forEach(element => {
                this.addressRepository.save({
                  id: element.id, IsBillingDefault: false
                });
              });
            }
          );
        }

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
          Firstname:true,
          Lastname:true,
          AddressLine1: true,
          AddressLine2: true,
          Area: true,
          City: true,
          State: true,
          Zipcode: true,
          Landmark: true,
          Phonenumber: true,
          IsDefault:true,
        },
        where: {
          IsActive: true,
          AddressType: 'S' || null,
          user: user
        },
      });
    }
  
    findAllBilling(user: User): Promise<Addresses[]> {
      return this.addressRepository.find({
        select: {
          id: true,
          Firstname:true,
          Lastname:true,
          AddressLine1: true,
          AddressLine2: true,
          Area: true,
          City: true,
          State: true,
          Zipcode: true,
          Landmark: true,
          Phonenumber: true,
          IsBillingDefault:true,
        },
        where: {
          IsActive: true,
          AddressType: 'B',
          user: user
        },
      });
    }

    findDefault(user: User): Promise<Addresses[]> {
      return this.addressRepository.find({
        select: {
          id: true,
          Firstname:true,
          Lastname:true,
          AddressLine1: true,
          AddressLine2: true,
          Area: true,
          City: true,
          State: true,
          Zipcode: true,
          Landmark: true,
          Phonenumber: true,
          IsDefault:true,
        },
        where: {
          IsActive: true,
          IsDefault: true,
          AddressType: 'S' || null,
          user: user
        },
      });
    }

    findDefaultBilling(user: User): Promise<Addresses[]> {
      return this.addressRepository.find({
        select: {
          id: true,
          Firstname:true,
          Lastname:true,
          AddressLine1: true,
          AddressLine2: true,
          Area: true,
          City: true,
          State: true,
          Zipcode: true,
          Landmark: true,
          Phonenumber: true,
          IsBillingDefault:true,
        },
        where: {
          IsActive: true,
          IsBillingDefault: true,
          AddressType: 'B',
          user: user
        },
      });
    }
}
