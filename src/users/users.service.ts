import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    
    private readonly usersRepository: UsersRepository){}
 
  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  updateUser(id: string, user: Partial<User>) {
    return this.usersRepository.updateUser(id,user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  assingAdmin(id:string){
    return this.usersRepository.assingAdmin(id)
  }
}
