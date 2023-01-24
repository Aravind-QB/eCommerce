import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToOne,
} from 'typeorm';
import { Product } from '../products/products.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  discountPercentage: string;

  @Column()
  thumbnail: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
  })
  product: Product;
}
