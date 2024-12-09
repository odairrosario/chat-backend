import { injectable } from 'tsyringe';
import { MessagesMapperInterface } from '../interfaces/messages.mapper.interface';
import CreateMessageDto from '../dtos/create-message.dto';
import { Message } from '../entities/message.entity';

@injectable()
export class MessagesMapper implements MessagesMapperInterface {
  public async mapCreateDtoToEntity(
    messageDto: CreateMessageDto
  ): Promise<Message> {
    const message = new Message();

    message.from = messageDto.from;
    message.to = messageDto.to;
    message.content = messageDto.content;

    return message;
  }
}
