import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { TaskEntity } from './entities/tesk.entity';
import { CreateTaskDto } from './entities/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    userId: number,
  ): Promise<TaskEntity[]> {
    const skip = (page - 1) * limit;

    return this.taskRepository.find({
      where: { user: { id: userId } },
      skip,
      take: limit,
    });
  }

  async findTasksByUserId(userId: number): Promise<TaskEntity[]> {
    const tasks = await this.taskRepository.find({
      where: { user: { id: userId } },
    });

    if (!tasks.length) {
      throw new NotFoundException(
        'Nenhuma tarefa encontrada para este usuário',
      );
    }

    return tasks;
  }

  async findOne(id: number): Promise<TaskEntity> {
    const options: FindOneOptions<TaskEntity> = {
      where: { id },
    };
    return this.taskRepository.findOne(options);
  }

  async update(id: number, updateTaskDto): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    this.taskRepository.merge(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
