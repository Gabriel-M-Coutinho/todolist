import { ApiProperty } from '@nestjsx/crud/lib/crud';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'A brief description of the task',
    required: false,
  })
  @IsOptional() // Torna a descrição opcional
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The priority of the task', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  priority: number; // Use o tipo apropriado para Priority, aqui foi mudado para number

  @ApiProperty({ description: 'The finish date of the task', required: false })
  @IsOptional()
  @IsDate()
  finish_at?: Date;
}
