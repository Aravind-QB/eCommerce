import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProductCategoriesMapper } from './productCategoryMapper.entity';
import { Product } from './products.entity';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ProductCategoriesMapper, (category) => category.category)
  @JoinColumn({ name: 'categorymapper_id' })
  category: ProductCategoriesMapper;
}
