import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isActive: string;

  @OneToMany(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
