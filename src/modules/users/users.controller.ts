import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Route,
  Security,
  Tags,
} from 'tsoa';
import { inject, injectable } from 'tsyringe';
import CreateUserDto from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { UsersServiceInterface } from './interfaces/users.service.interface';
import { Request as ExRequest } from 'express';

@injectable()
@Route('users')
@Tags('Users')
export class UserController extends Controller {
  constructor(
    @inject('UsersServiceInterface')
    private readonly userService: UsersServiceInterface
  ) {
    super();
  }

  @Post()
  public async create(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.create(userDto);
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }

  @Get()
  @Security('jwt')
  public async readMany(@Request() req: ExRequest): Promise<User[]> {
    try {
      const user = req.user as User;
      return await this.userService.readMany(user);
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
