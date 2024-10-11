import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TaskEntity } from './entities/tesk.entity';
import { UserModule } from 'src/user/user.module';
import { TaskService } from './entities/task.service';
import { TaskController } from './entities/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), UserModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
