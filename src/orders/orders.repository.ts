import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from './entities/order.entity';
import { OrderDetail } from './entities/orderdetail.entity';
import { User } from 'src/users/entities/user.entity';
import { Products } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { format } from 'date-fns';


@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Orders)
    private readonly ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async addOrder(createOrder: CreateOrderDto){
    const {userId, products} = createOrder
    let total= 0;
    const user = await this.usersRepository.findOneBy({id : userId})

    if(!user){
      throw new NotFoundException('User not found');
    }

    const order = new Orders();
    const newDate = new Date();
    order.date= format(newDate, 'yyyy-MM-dd HH:mm:ss');
    order.user = user

    const newOrder = await this.ordersRepository.save(order);

    const productsArray = await Promise.all(
      products.map(async(element) => {
        const product = await this.productsRepository.findOneBy({id: element.id});
        if(!product){
          throw new NotFoundException('Product not found');
        };

        total += Number(product.price);

        await this.productsRepository.update(
          {id: element.id},
          {stock: product.stock -1},
        );
        return product
      }),
    );

    const orderDetail = new OrderDetail();
    orderDetail.price = Number(Number(total).toFixed(2));
    orderDetail.product = productsArray;
    orderDetail.order = newOrder;

    await this.orderDetailsRepository.save(orderDetail);

    return await this.ordersRepository.find({
      where: {id: newOrder.id},
      relations:{
        orderDetails: true,
      },
    });
  }

  async getOrder(id: string){
    const order = this.ordersRepository.findOne({
      where: {id},
      relations:{
        orderDetails:{
          product: true,
        },
      },
    });

    if(!order){
      throw new NotFoundException('Order not found')
    }

    return order
  }
}