import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity('Task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  title: string;
  @Column()
  description: string;

  @Column()
  @Index()
  priority: Priority;

  @Column()
  @Index()
  created_at: Date;

  @Column({ nullable: true })
  @Index()
  finish_at: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.created_at = new Date();
  }

  @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: UserEntity;
}
