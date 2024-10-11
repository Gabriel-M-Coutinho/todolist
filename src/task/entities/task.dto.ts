import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional() // Torna a descrição opcional
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsEnum(Priority)
  priority: Priority;

  @IsOptional()
  @IsDate()
  finish_at?: Date;
}
