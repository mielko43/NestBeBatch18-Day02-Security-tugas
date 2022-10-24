import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../entities/Users';
import { Repository } from 'typeorm';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  @InjectRepository(Users) private UserRepo: Repository<Users>;

  async findOne(username: string) {
    return this.UserRepo.findOne({ where: { userName: username } });
  }
  async signup(username, hashpassword, email) {
    return await this.UserRepo.save({
      userName: username,
      userPassword: hashpassword,
      userEmail: email,
    });
  }
}
