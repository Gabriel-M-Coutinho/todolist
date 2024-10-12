import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { TaskEntity } from './entities/tesk.entity';
import { TaskService } from './task.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { CreateTaskDto } from './entities/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  public async add(@Body() dto: CreateTaskDto, @Request() req) {
    const data = await this.service.createTask(dto);
  }
}
