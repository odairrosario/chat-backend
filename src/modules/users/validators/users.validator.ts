import { UsersRepositoryInterface } from '../interfaces/users.repository.interface';
import { UserErrorCodes } from '../enums/user-error-codes.enum';
import { User } from '../entities/user.entity';
import { inject, injectable } from 'tsyringe';
import { UsersValidatorInterface } from '../interfaces/users.validator.interface';

@injectable()
export class UserValidator implements UsersValidatorInterface {
  constructor(
    @inject('UsersRepositoryInterface')
    private readonly usersRepository: UsersRepositoryInterface
  ) {}

  public async validateUsername(username: string): Promise<void> {
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(username)) {
      throw new Error(
        `[${UserErrorCodes.INVALID_USERNAME}] Username deve conter apenas letras, números e _ (entre 3 e 30 caracteres)`
      );
    }

    const options = { where: { username } };
    const existingUser = await this.usersRepository.findOneByOptions(options);
    if (existingUser) {
      throw new Error(
        `[${UserErrorCodes.USERNAME_TAKEN}] Username já está em uso`
      );
    }
  }

  public validateName(name: string): void {
    if (name.length < 2 || name.length > 100) {
      throw new Error(
        `[${UserErrorCodes.INVALID_NAME}] Nome deve ter entre 2 e 100 caracteres`
      );
    }
  }

  public validateUserExists(user: User | null): void {
    if (!user) {
      throw new Error(
        `[${UserErrorCodes.USER_NOT_FOUND}] Usuário não encontrado`
      );
    }
  }
}
