import { inject, injectable } from 'tsyringe';
import { DataSource } from 'typeorm';
import { BaseAbstractRepository } from '../../shared/base/base.repository';
import { User } from './entities/user.entity';

@injectable()
export class UsersRepository extends BaseAbstractRepository<User> {
  constructor(@inject('DataSource') private readonly dataSource: DataSource) {
    super(dataSource.getMongoRepository(User));
  }
}
