import bcrypt from 'bcryptjs';
import { injectable } from 'tsyringe';
import CreateUserDto from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersMapperInterface } from '../interfaces/users.mapper.inteface';

@injectable()
export class UsersMapper implements UsersMapperInterface {
  public async mapCreateDtoToEntity(userDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.name = userDto.name;
    user.username = userDto.username;
    user.password = await this.hashPassword(userDto.password);

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
}
