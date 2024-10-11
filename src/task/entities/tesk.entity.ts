
import {
  BeforeInsert,
  Column,
  Entity,
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
  title: string;
  @Column()
  description: string;

  @Column()
  priority: Priority;

  @Column()
  created_at: Date;

  @Column()
  finish_at: Date;

  @BeforeInsert()
  setCreatedAt() {
    this.created_at = new Date();
  }

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;
}
