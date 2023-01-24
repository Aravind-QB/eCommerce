import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../products/products.entity';

@Entity()
export class OrderItems {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  total: string;

  @Column()
  quantity: string;

  @ManyToOne(() => Order, (order) => order.id, {
    nullable: false,
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
  })
  product: Product;
}
