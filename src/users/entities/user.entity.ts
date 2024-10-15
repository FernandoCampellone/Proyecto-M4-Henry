import { Orders } from 'src/orders/entities/order.entity';
import { Role } from 'src/role.enum';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';


@Entity({
  name:'USERS'
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User
  })
  role: Role

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 100, nullable: false })
  password: string;

  @Column('int', { nullable: false })
  phone: number;

  @Column({ length: 50, nullable: false })
  country: string;

  @Column('text', { nullable: false })
  address: string;

  @Column({ length: 50, nullable: false })
  city: string;

  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({name: 'order_id'})
  orders: Orders[];
}