import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { TaskService } from './task.service';

import { CreateTaskDto } from './entities/task.dto';

import { TaskEntity } from './entities/tesk.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateTaskDto } from './entities/update-task.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

interface PaginatedResult<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}

@ApiTags('task')
@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req,
  ) {
    return this.taskService.findAll(Number(page), Number(limit), req.user.id);
  }

  @Post()
  public async create(@Body() dto: CreateTaskDto, @Request() req) {
    const data = await this.taskService.createTask(dto, req.user);
    return data;
  }

  @ApiParam({
    name: 'id',
    description: 'ID of the task to update',
    required: true,
    type: Number, // ou String, dependendo do tipo do ID
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateTaskDto })
  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    const numericId = Number(id);
    if (isNaN(numericId) || numericId <= 0) {
      throw new BadRequestException('Invalid task ID');
    }

    const updatedTask = await this.taskService.update(
      numericId,
      updateTaskDto,
      req.user,
    );
    return updatedTask;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string, @Request() req) {
    await this.taskService.remove(Number(id), req.user);
    this.findAll(1, 10, req);
  }
}
