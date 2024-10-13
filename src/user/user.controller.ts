import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './entities/create-user.dto';
import { UserResponseDto } from './entities/user-reponse.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('signin')
  @ApiBody({ type: CreateUserDto }) // Informa que o corpo da requisição é do tipo CreateUserDto
  @ApiResponse({ status: 201, description: 'User registered' }) // Resposta bem-sucedida
  @ApiResponse({ status: 400, description: 'Bad Request' }) // Resposta de erro
  public async signin(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    this.service.create(dto);
    return new UserResponseDto('User registered', 201);
  }
}
