/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post()
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
