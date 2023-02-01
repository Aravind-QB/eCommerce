import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
  Generated,
} from 'typeorm';
import { Categories } from './categories.entity';
import { Product } from './products.entity';

@Entity()
export class ProductCategoriesMapper {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
    cascade: true,
  })
  product: Product;

  @ManyToOne(() => Categories, (category) => category.id, {
    nullable: false,
    cascade: true,
  })
  category: Categories;
}
