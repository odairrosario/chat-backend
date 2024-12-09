import CreateUserDto from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export interface UsersMapperInterface {
  mapCreateDtoToEntity(userDto: CreateUserDto): Promise<User>;
}
