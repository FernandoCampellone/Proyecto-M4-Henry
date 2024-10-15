import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from './orderdetail.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({})
  date: String;

  @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetail

 @ManyToOne(() => User, (users) => users.orders)
  @JoinColumn({name: 'user_id'})
  user: User;
}