import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Generated,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Offer } from '../offers/offers.entity';
import { OrderItems } from '../order/order-items.entity';
import { Categories } from './categories.entity';
import { ProductImages } from './productImages.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  unit: string;

  @Column()
  inventory: string;

  @Column()
  price: string;

  @Column()
  rating: string;

  @Column()
  thumbnail: string;

  @Column()
  brand: string;

  @Column()
  discountPercentage: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Categories, (category) => category.id, {
    nullable: false,
  })
  category: Categories;

  @OneToMany(() => ProductImages, (productImages) => productImages.product)
  @JoinColumn({ name: 'productimages_id' })
  productImages: ProductImages[];

  @OneToMany(() => OrderItems, (orderItems) => orderItems.product)
  @JoinColumn({ name: 'orderItems_id' })
  orderItems: OrderItems;

  @OneToMany(() => Offer, (offer) => offer.product)
  @JoinColumn({ name: 'offer_id' })
  offer: Offer;
}
