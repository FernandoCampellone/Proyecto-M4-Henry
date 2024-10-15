import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Orders } from './order.entity';
import { Products } from 'src/products/entities/product.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order: Orders;

  @ManyToMany(() => Products)
  @JoinTable({ name: 'ORDER_DETAILS_PRODUCTS' })
  product: Products[];

}