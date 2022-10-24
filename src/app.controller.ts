import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from '../src/server/Auth/jwt-auth.guard';
import { LocalAuthGuard } from '../src/server/Auth/local-auth.guard';
import { AuthService } from '../src/server/Auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/signup')
  public async signup(@Body() fields) {
    return this.authService.signup(fields);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
