import CreateMessageDto from '../dtos/create-message.dto';
import { Message } from '../entities/message.entity';

export interface MessagesMapperInterface {
  mapCreateDtoToEntity(messageDto: CreateMessageDto): Promise<Message>;
}
