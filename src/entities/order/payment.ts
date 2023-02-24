import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  OneToOne,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/products.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  cardNumber: string;

  @Column()
  issuedDate: string;

  @Column()
  expiryDate: string;

  @Column()
  cvv: string;

  @Column()
  nameOnCard: string;
  
  @Column({default: false})
  IsDefault: boolean;

  @OneToOne(() => Order, (order) => order.id, {
    nullable: false,
  })
  order: Order;
}
