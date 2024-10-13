import { TaskEntity } from 'src/task/entities/tesk.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  @Index()
  email: string;
  @Column()
  password: string;

  @OneToMany(() => TaskEntity, (task) => task.user, { cascade: true })
  tasks: TaskEntity[];
}
