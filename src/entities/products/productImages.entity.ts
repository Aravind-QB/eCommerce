import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from './products.entity';

@Entity()
export class ProductImages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageURL: string;

  @Column()
  isActive: string;

  @ManyToOne(() => Product, (product) => product.id, {
    nullable: false,
  })
  product: Product;
}
