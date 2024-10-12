import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './entities/create-user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existUser) {
      throw new ConflictException('Email already registered');
    }

    const user = this.userRepository.create(createUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    return await this.userRepository.save(user);
  }

  public findOne(id: number) {
    this.userRepository.findOneBy({ id });
  }
  public findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}
