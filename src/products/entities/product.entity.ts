import { Categories } from 'src/categories/entities/categories.entity';
import { OrderDetail } from 'src/orders/entities/orderdetail.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';

@Entity({
  name: 'PRODUCTS',
})
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true, nullable: false })
  name: string;

  @Column('text', { nullable: false })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column('int', { nullable: false })
  stock: number;

  @Column({ default: 'default-image-url' })
  imgUrl: string;

  @ManyToOne(() => Categories, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToMany(() => OrderDetail, (orderDetails) => orderDetails.product)
  orderDetails: OrderDetail[];
}