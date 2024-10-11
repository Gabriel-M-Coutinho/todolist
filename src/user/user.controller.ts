import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { RouteMetadata } from 'nestjs-gis'

@RouteMetadata()
@Crud({
    model:{type:UserEntity},
    params:{
    }
})
@Controller('rest/user')
export class UserController {

  constructor(private service: UserService) { }

}
