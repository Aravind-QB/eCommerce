import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { Product } from '../products/products.entity';
import { User } from '../users/users.entity';

@Entity()
export class ProductReviews {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column()
  rating: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
  })
  user: User;
}
