import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn() id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
