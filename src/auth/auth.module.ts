import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './startegies/jwt.startegy';
import { LocalStrategy } from './startegies/local.startegy';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule, // forwardRef para resolver a circularidade
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'teste',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtModule],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
