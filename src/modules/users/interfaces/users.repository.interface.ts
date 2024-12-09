import { BaseInterfaceRepository } from '../../../shared/base/base.repository.interface';
import { User } from '../entities/user.entity';

export type UsersRepositoryInterface = BaseInterfaceRepository<User>;
