import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Order } from '../order/order.entity';
import { ProductReviews } from '../product-review/product-review.entity';
import { Addresses } from './user-addresses';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ unique: true, nullable: false })
  phoneNumber: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.id)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToMany(() => ProductReviews, (review) => review.user)
  @JoinColumn({ name: 'review_id' })
  review: ProductReviews;

  @OneToMany(() => Addresses, (address) => address.user, {
    cascade: true,
  })
  @JoinColumn({ name: 'address_id' })
  addresses: Addresses[];
}
