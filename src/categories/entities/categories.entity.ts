import { Products } from 'src/products/entities/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

@Entity({
  name: 'CATEGORIES',
})
export class Categories {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Products, (product) => product.category)
  @JoinColumn()
  products: Products[];
}