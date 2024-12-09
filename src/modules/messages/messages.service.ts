import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import CreateMessageDto from './dtos/create-message.dto';
import { Message } from './entities/message.entity';
import { MessagesMapperInterface } from './interfaces/messages.mapper.interface';
import { MessagesRepositoryInterface } from './interfaces/messages.repository.interaface';
import { MessagesServiceInterface } from './interfaces/messages.service.interface';
import { User } from '../users/entities/user.entity';
import { MessageErrorCodes } from './enums/message-error-codes.enum';
import { FindManyOptions } from 'typeorm';
import { MessagesValidatorInterface } from './interfaces/messages.validator.interface';

@injectable()
export class MessagesService implements MessagesServiceInterface {
  constructor(
    @inject('MessagesRepositoryInterface')
    private readonly messagesRepository: MessagesRepositoryInterface,
    @inject('MessagesMapperInterface')
    private readonly messagesMapper: MessagesMapperInterface,
    @inject('MessagesValidatorInterface')
    private readonly messagesValidator: MessagesValidatorInterface
  ) {}

  public async create(
    messageDto: CreateMessageDto,
    user: User
  ): Promise<Message> {
    if (user.username !== messageDto.from) {
      throw new Error(
        `[${MessageErrorCodes.UNAUTHORIZED}] Usuário não autorizado a enviar mensagem`
      );
    }

    await this.messagesValidator.validateUsers(messageDto.from, messageDto.to);

    const message = await this.messagesRepository.save(
      await this.messagesMapper.mapCreateDtoToEntity(messageDto)
    );

    return plainToInstance(Message, message, {
      excludeExtraneousValues: true,
    });
  }

  public async readMany(user: User): Promise<Message[]> {
    const options: FindManyOptions<Message> = {
      select: ['from', 'to', 'content', 'createdAt'],
      order: {
        createdAt: 'ASC',
      },
    };

    const messages = await this.messagesRepository.findManyByOptions(options);

    const filteredMessages = messages.filter(
      (msg) => msg.from === user.username || msg.to === user.username
    );

    return plainToInstance(Message, filteredMessages, {
      excludeExtraneousValues: true,
      enableImplicitConversion: false,
    });
  }
}
