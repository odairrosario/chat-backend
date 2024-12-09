import { inject, injectable } from 'tsyringe';
import { UsersServiceInterface } from '../../users/interfaces/users.service.interface';
import { MessageErrorCodes } from '../enums/message-error-codes.enum';
import { MessagesValidatorInterface } from '../interfaces/messages.validator.interface';

@injectable()
export class MessagesValidator implements MessagesValidatorInterface {
  constructor(
    @inject('UsersServiceInterface')
    private readonly userService: UsersServiceInterface
  ) {}

  public async validateUsers(
    fromUsername: string,
    toUsername: string
  ): Promise<void> {
    if (fromUsername === toUsername) {
      throw new Error(
        `[${MessageErrorCodes.INVALID_RECIPIENT}] Usuário não pode enviar mensagem para si mesmo`
      );
    }

    const toUser = await this.userService.readOneByUsername(toUsername);

    if (!toUser) {
      throw new Error(
        `[${MessageErrorCodes.USER_NOT_FOUND}] Usuário destinatário não encontrado`
      );
    }
  }
}
