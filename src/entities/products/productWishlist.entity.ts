import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Categories } from './categories.entity';
import { Product } from './products.entity';

@Entity()
export class ProductWishlist {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
    // cascade: true,
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    // cascade: true,
  })
  user: User;
}
