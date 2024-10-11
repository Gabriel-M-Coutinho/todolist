import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskService extends TypeOrmCrudService<TaskEntity>{

    constructor(@InjectRepository(TaskEntity) repo) {
        super(repo);
    }

}
