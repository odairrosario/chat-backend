import { User } from '../../users/entities/user.entity';
import CreateMessageDto from '../dtos/create-message.dto';
import { Message } from '../entities/message.entity';

export interface MessagesServiceInterface {
  create(messageDto: CreateMessageDto, user: User): Promise<Message>;
  readMany(user: User): Promise<Message[]>;
}
