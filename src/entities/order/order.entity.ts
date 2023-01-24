import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { OrderItems } from './order-items.entity';

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
}
