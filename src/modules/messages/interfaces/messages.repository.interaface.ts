import { BaseInterfaceRepository } from '../../../shared/base/base.repository.interface';
import { Message } from '../entities/message.entity';

export type MessagesRepositoryInterface = BaseInterfaceRepository<Message>;
