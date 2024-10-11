import { Controller, Get } from '@nestjs/common';

import { TaskService } from './task.service';
import { TaskEntity } from './tesk.entity';

@Controller('task')
export class TaskController {
  constructor(private service: TaskService) {}
}
