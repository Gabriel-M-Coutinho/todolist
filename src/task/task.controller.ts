import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { TaskService } from './task.service';

import { CreateTaskDto } from './entities/task.dto';

import { TaskEntity } from './entities/tesk.entity';
import { AuthGuard } from '@nestjs/passport';

interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}

@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<TaskEntity[]> {
    return this.taskService.findAll(Number(page), Number(limit), 1);
  }

  @Post()
  public async create(@Body() dto: CreateTaskDto, @Request() req) {
    console.log('Token do usuário:', req.headers.authorization); // Log do cabeçalho
    console.log('Usuário autenticado:', req.user); // Log do usuário autenticado
    const data = await this.taskService.createTask(dto);
  }
}
