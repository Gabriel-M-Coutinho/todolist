import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional() // Torna a descrição opcional
  @IsString()
  description?: string;

  @IsNotEmpty()
  priority: Priority;
  @IsOptional()
  @IsDate()
  finish_at?: Date;
}
