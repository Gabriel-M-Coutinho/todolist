import { UserEntity } from 'src/user/entities/user.entity';

export interface AuthRequest extends Request {
  user: UserEntity;
}
