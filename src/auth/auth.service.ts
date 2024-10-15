import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from "bcrypt"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService) {}

  async signIn(user: Partial<User>) {

    const { email, password } = user;
    if (!email || !password) {
      throw new BadRequestException(`Missing email or password`);
    }

    const foundUser = await this.usersRepository.findUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException(`User not Found`)
    }

    const validPassword = await bcrypt.compare(password, foundUser.password)

    if (!validPassword) {
      throw new BadRequestException(`Invalid password`)
    }

    const userPayload = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role
    }

    const token = this.jwtService.sign(userPayload)
    
    return {message:'Login Successful!',
            token};
  }

  async signUp(user: Partial<User>){

    const {email, password} = user
    let foundUser = await this.userRepository.findOne({ where: { email } });

    if(foundUser) {
      throw new BadRequestException(`The user with the mail:${email} is already registered`)
    }
    const hashedPassword = await bcrypt.hash(password,10)

    if(!hashedPassword){
      throw new BadRequestException(`Encription error`)
    }

    const newUser = {
      ...user, password: hashedPassword}

      
    await this.userRepository.save(newUser)
    return newUser
  }
}
