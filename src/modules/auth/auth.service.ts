import { User } from '../users/entities/user.entity';
import { UsersRepositoryInterface } from '../users/interfaces/users.repository.interface';
import AuthServiceInterface from './interfaces/auth.service.interface';

import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { FindOneOptions } from 'typeorm';
import hashComparePassword from '../../shared/utils/hash-compare-password.utils';
import LoginDto from './dtos/login.dto';
import { plainToInstance } from 'class-transformer';
import { JWT_EXPIRE, JWT_SECRET_KEY } from '../../config/auth.config';
import { AuthErrorCodes } from './enums/auth-error-codes';

@injectable()
export default class AuthService implements AuthServiceInterface {
  public constructor(
    @inject('UsersRepositoryInterface')
    private usersRepository: UsersRepositoryInterface
  ) {}

  public async validateUser(username: string, password: string): Promise<User> {
    const options: FindOneOptions<User> = {
      where: { username },
    };

    const user = await this.usersRepository.findOneByOptions(options);
    if (!user) {
      throw new Error(`[${AuthErrorCodes.INVALID_USERNAME}] Username inválido`);
    }

    const isPasswordValid = await hashComparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new Error(`[${AuthErrorCodes.INVALID_PASSWORD}] Senha inválida`);
    }

    return plainToInstance(User, user, { excludeExtraneousValues: true });
  }

  public async create(loginDto: LoginDto): Promise<{
    authenticationToken: string;
    user: User;
  }> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const authenticationToken = jwt.sign(
      { id: user._id, name: user.name, username: user.username },
      JWT_SECRET_KEY,
      { expiresIn: JWT_EXPIRE }
    );

    return {
      authenticationToken,
      user,
    };
  }
}
