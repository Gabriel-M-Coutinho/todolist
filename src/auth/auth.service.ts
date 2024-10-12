import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { UserPayload } from './model/UserPayload';
import { UserToken } from './model/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async verifyHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return { ...user, password: undefined };
      }
      throw new Error('Email address or password provider is incorrect');
    }
  }

  login(user: UserEntity): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }
}
