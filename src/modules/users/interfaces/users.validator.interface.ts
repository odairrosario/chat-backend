import { User } from '../entities/user.entity';

export interface UsersValidatorInterface {
  validateUsername(username: string): Promise<void>;
  validateName(name: string): void;
  validateUserExists(user: User | null): void;
}
