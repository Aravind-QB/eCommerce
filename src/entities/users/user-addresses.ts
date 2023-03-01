import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { User } from './users.entity';

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({nullable: false})
  Firstname: string;

  @Column({nullable: false})
  Lastname: string;

  @Column({nullable: false})
  AddressLine1: string;

  @Column({nullable: false})
  AddressLine2: string;

  @Column({nullable: false})
  City: string;

  @Column({nullable: false})
  State: string;

  @Column()
  Area: string;

  @Column({nullable: false})
  Zipcode: string;

  @Column({nullable: false})
  Landmark: string;

  @Column({nullable: false})
  Phonenumber: string;

  @Column({default: false})
  IsDefault: boolean;

  @Column({default: false})
  IsBillingDefault: boolean;

  @Column()
  AddressType: string;

  @Column({default: true})
  IsActive: boolean;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User;
  
  @OneToMany(() => Order, (order) => order.address, {
    // cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'address_id' })
  order: Order[];
}
