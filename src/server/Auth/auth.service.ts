import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt';

const saltOrRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const compare = await Bcrypt.compare(pass, user.userPassword);
    if (compare) {
      const { userPassword, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async signup(fields) {
    let hashpassword = fields.password;
    hashpassword = await Bcrypt.hash(hashpassword, saltOrRounds);
    const user = await this.usersService.signup(
      fields.username,
      hashpassword,
      fields.email,
    );
    return user;
  }
}
