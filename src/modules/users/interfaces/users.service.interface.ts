import CreateUserDto from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

export interface UsersServiceInterface {
  create(userDto: CreateUserDto): Promise<User>;
  readMany(user: User): Promise<User[]>;
  readOneByUsername(username: string): Promise<User | undefined>;
}
