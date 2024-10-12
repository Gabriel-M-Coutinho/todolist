import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './entities/create-user.dto';
import { UserResponseDto } from './entities/user-reponse.dto';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('signin')
  public async signin(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    this.service.create(dto);
    return new UserResponseDto('User registered', 201);
  }
}
