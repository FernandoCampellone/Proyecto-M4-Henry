import { BadRequestException, ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import userSuperAdmin from "src/helpers/users";
import { Role } from "src/role.enum";
import * as bcrypt from "bcrypt"

  @Injectable()
  export class UsersRepository{
    constructor(
      @InjectRepository(User)
      private readonly usersRepository: Repository<User>
    ){}
    @InjectRepository(User)
    async getUsers(page: number, limit: number){
      const [users] = await this.usersRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });
      return users;
    }

    async getUserById(id : string){
      return this.usersRepository.findOneBy({id})
    }
    
    async findUserByEmail(email: string): Promise<User> {
      const foundUser = await this.usersRepository.findOne({ where: { email } });
      if (!foundUser){
        throw new NotFoundException('User not found');
      }
      return foundUser;
    }
  
    async findUserByName(name: string): Promise<User> {
      const foundUser = await this.usersRepository.findOne({ where: { name } });
      if (!foundUser){
        throw new NotFoundException('User not found');
      }
      return foundUser;
        }


  async updateUser(id: string, updateUser: Partial<User>){
    const {email, name} = updateUser
    const user = await this.usersRepository.findOneBy({id});
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUser.email) {
      const existingUserWithEmail = await this.usersRepository.findOne({ where: { email } });
      if (existingUserWithEmail && existingUserWithEmail.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    if (updateUser.name) {
      const existingUserWithName = await this.usersRepository.findOne({ where: { name } });;
      if (existingUserWithName && existingUserWithName.id !== id) {
        throw new ConflictException('Name already exists');
      }
    }
    await this.usersRepository.update(user, updateUser);

    return updateUser;
  }

  async deleteUser(id: string): Promise<User>{
    const deletedUser = await this.usersRepository.findOneBy({id});
    if (!deletedUser) {
      throw new NotFoundException('User not found, cant delete');
    }
    await this.usersRepository.delete(deletedUser);
    return deletedUser;
  }

  async uploadSuperAdmin() {
    const {name, password} = userSuperAdmin  
    const foundUser = await this.usersRepository.findOneBy({name})
    if (!foundUser){
      const hashedPassword = await bcrypt.hash(password,10)
      if(!hashedPassword){
        throw new BadRequestException(`Encription error`)
      }
      userSuperAdmin.password = hashedPassword,
      await this.usersRepository.save(userSuperAdmin)
    } else {
      throw new ConflictException('SuperAdmin already exist!');
    }
  }

  async assingAdmin(id: string){
    const foundUser = await this.usersRepository.findOneBy({id})
    foundUser.role = Role.Admin 
    await this.usersRepository.save(foundUser)
    return foundUser
  }

}