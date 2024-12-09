import { inject, injectable } from 'tsyringe';
import { BaseAbstractRepository } from '../../shared/base/base.repository';
import { DataSource } from 'typeorm';
import { Message } from './entities/message.entity';

@injectable()
export class MessagesRepository extends BaseAbstractRepository<Message> {
  constructor(@inject('DataSource') private readonly dataSource: DataSource) {
    super(dataSource.getMongoRepository(Message));
  }
}
