import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { TaskEntity } from './entities/tesk.entity';
import { CreateTaskDto } from './entities/task.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { UpdateTaskDto } from './entities/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto, user: UserEntity) {
    const task = this.taskRepository.create(createTaskDto);
    task.user = user;
    return this.taskRepository.save(task);
  }

  async findAll(page: number = 1, limit: number = 10, userId: number) {
    const skip = (page - 1) * limit;

    const [tasks, totalCount] = await this.taskRepository.findAndCount({
      where: { user: { id: userId } },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: tasks,
      currentPage: page,
      totalPages: totalPages,
    };
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

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: UserEntity,
  ): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    // Verifica se a task foi encontrada
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Verifica se o usuário tem permissão para atualizar a task
    if (task.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    // Verifica se pelo menos um campo foi fornecido para a atualização
    if (
      updateTaskDto.title === undefined &&
      updateTaskDto.description === undefined &&
      updateTaskDto.priority === undefined &&
      updateTaskDto.finish_at === undefined
    ) {
      throw new BadRequestException('No fields provided for update');
    }

    await this.taskRepository.update(id, updateTaskDto);

    // Retorna a task atualizada
    return this.taskRepository.findOne({ where: { id } });
  }

  async remove(id: number, user: UserEntity): Promise<void> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.user.id !== user.id) {
      throw new ForbiddenException('You are not allowed to update this task');
    }

    await this.taskRepository.delete(id);
  }
}
