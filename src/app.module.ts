import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1238425wky22',
      database: 'teste',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true,
    }),

    TaskModule,

    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
