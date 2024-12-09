import { inject, injectable } from 'tsyringe';
import { Post, Route, Tags, Controller, Body } from 'tsoa';
import AuthServiceInterface from './interfaces/auth.service.interface';
import { COOKIE_DOMAIN, COOKIE_EXPIRATION } from '../../config/auth.config';
import LoginDto from './dtos/login.dto';
import { User } from '../users/entities/user.entity';

@injectable()
@Route('auth')
@Tags('Auth')
export class AuthController extends Controller {
  constructor(
    @inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface
  ) {
    super();
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<User> {
    try {
      const { authenticationToken, user } =
        await this.authService.create(loginDto);

      this.setHeader(
        'Set-Cookie',
        `auth=${authenticationToken}; HttpOnly; Secure; SameSite=Strict; Domain=${COOKIE_DOMAIN}; Max-Age=${COOKIE_EXPIRATION}; Path=/`
      );

      return user;
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }

  @Post('logout')
  public async logout(): Promise<void> {
    try {
      this.setHeader('Set-Cookie', [
        `auth=; HttpOnly; Secure; SameSite=Strict; Domain=${COOKIE_DOMAIN}; Max-Age=0; Path=/`,
        `auth=; HttpOnly; Secure; SameSite=Strict; Domain=${COOKIE_DOMAIN}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`,
      ]);

      this.setStatus(204);
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
