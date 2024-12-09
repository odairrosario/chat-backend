import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { FindManyOptions } from 'typeorm';
import CreateUserDto from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersMapperInterface } from './interfaces/users.mapper.inteface';
import { UsersRepositoryInterface } from './interfaces/users.repository.interface';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import { UserErrorCodes } from './enums/user-error-codes.enum';
import { UsersValidatorInterface } from './interfaces/users.validator.interface';

@injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface,
    @inject('UsersMapperInterface')
    private readonly usersMapper: UsersMapperInterface,
    @inject('UsersValidatorInterface')
    private readonly userValidator: UsersValidatorInterface
  ) {}

  public async create(userDto: CreateUserDto): Promise<User> {
    await this.userValidator.validateUsername(userDto.username);
    this.userValidator.validateName(userDto.name);

    const user = await this.usersRepository.save(
      await this.usersMapper.mapCreateDtoToEntity(userDto)
    );

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  public async readMany(user: User): Promise<User[]> {
    const options: FindManyOptions<User> = {
      select: ['name', 'username'],
      order: {
        name: 'ASC',
      },
    };

    const users = await this.usersRepository.findManyByOptions(options);

    return plainToInstance(
      User,
      users.filter((u) => {
        return u.username !== user.username;
      }),
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: false,
      }
    );
  }

  public async readOneByUsername(username: string): Promise<User> {
    const options = { where: { username } };
    const user = await this.usersRepository.findOneByOptions(options);

    if (!user) {
      throw new Error(
        `[${UserErrorCodes.USER_NOT_FOUND}] Usuário não encontrado`
      );
    }

    return user;
  }
}
