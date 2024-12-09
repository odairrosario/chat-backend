import { User } from '../../users/entities/user.entity';
import LoginDto from '../dtos/login.dto';

export default interface AuthServiceInterface {
  validateUser(username: string, password: string): Promise<User>;

  create(loginDto: LoginDto): Promise<{
    authenticationToken: string;
    user: User;
  }>;
}
