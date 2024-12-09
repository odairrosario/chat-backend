import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/users/users.repository';
import { UsersRepositoryInterface } from '../../modules/users/interfaces/users.repository.interface';
import { UsersMapper } from '../../modules/users/mappers/users.mapper';
import { UsersService } from '../../modules/users/users.service';
import { UsersServiceInterface } from '../../modules/users/interfaces/users.service.interface';
import { UsersMapperInterface } from '../../modules/users/interfaces/users.mapper.inteface';
import { AppDataSource } from '../database/typeorm.config';
import AuthServiceInterface from '../../modules/auth/interfaces/auth.service.interface';
import AuthService from '../../modules/auth/auth.service';
import { MessagesServiceInterface } from '../../modules/messages/interfaces/messages.service.interface';
import { MessagesService } from '../../modules/messages/messages.service';
import { MessagesRepository } from '../../modules/messages/messages.resopository';
import { MessagesRepositoryInterface } from '../../modules/messages/interfaces/messages.repository.interaface';
import { MessagesMapper } from '../../modules/messages/mappers/messages.mapper';
import { MessagesMapperInterface } from '../../modules/messages/interfaces/messages.mapper.interface';
import { UsersValidatorInterface } from '../../modules/users/interfaces/users.validator.interface';
import { UserValidator } from '../../modules/users/validators/users.validator';
import { MessagesValidatorInterface } from '../../modules/messages/interfaces/messages.validator.interface';
import { MessagesValidator } from '../../modules/messages/validators/messages.validator';

export async function registerDependencies() {
  container.register('DataSource', { useValue: AppDataSource });

  container.registerSingleton<UsersRepositoryInterface>(
    'UsersRepositoryInterface',
    UsersRepository
  );
  container.registerSingleton<UsersMapperInterface>(
    'UsersMapperInterface',
    UsersMapper
  );
  container.registerSingleton<UsersServiceInterface>(
    'UsersServiceInterface',
    UsersService
  );

  container.registerSingleton<UsersValidatorInterface>(
    'UsersValidatorInterface',
    UserValidator
  );

  container.registerSingleton<MessagesRepositoryInterface>(
    'MessagesRepositoryInterface',
    MessagesRepository
  );
  container.registerSingleton<MessagesMapperInterface>(
    'MessagesMapperInterface',
    MessagesMapper
  );
  container.registerSingleton<MessagesServiceInterface>(
    'MessagesServiceInterface',
    MessagesService
  );
  container.registerSingleton<MessagesValidatorInterface>(
    'MessagesValidatorInterface',
    MessagesValidator
  );

  container.registerSingleton<AuthServiceInterface>(
    'AuthServiceInterface',
    AuthService
  );
}
