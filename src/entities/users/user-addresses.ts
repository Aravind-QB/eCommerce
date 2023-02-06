import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

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

  @Column()
  AddressType: string;

  @Column({default: true})
  IsActive: boolean;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User;
}