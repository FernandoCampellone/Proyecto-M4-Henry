import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { Orders } from './entities/order.entity';
import { OrderDetail } from './entities/orderdetail.entity';
import { User } from 'src/users/entities/user.entity';
import { Products } from 'src/products/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetail, User, Products]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}