import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB_NAME,
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true, 
      dropSchema: true, 
      logging: true,
    }),

    TaskModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
