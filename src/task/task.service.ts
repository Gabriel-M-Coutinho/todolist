import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { TaskEntity } from './entities/tesk.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(createTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  async findAll(): Promise<TaskEntity[]> {
    return this.taskRepository.find();
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

  // Delete
  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
