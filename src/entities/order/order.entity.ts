import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Addresses } from '../users/user-addresses';
import { User } from '../users/users.entity';
import { OrderItems } from './order-items.entity';
import { Payment } from './payment';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  grandTotal: string;

  @Column()
  status: string;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User;

  @OneToMany(() => OrderItems, (orderItems) => orderItems.order, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'orderItems_id' })
  orderItems: OrderItems[];

  @OneToOne(() => Payment, (payment) => payment.order, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @ManyToOne(() => Addresses, (address) => address.id, {
    nullable: true,
  })
  address: Addresses;

  @ManyToOne(() => Addresses, (address) => address.id, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  billingAddress: Addresses;
}
