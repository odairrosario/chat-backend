import {
  Body,
  Controller,
  Get,
  Post,
  Route,
  Security,
  Tags,
  Request,
} from 'tsoa';
import { inject, injectable } from 'tsyringe';
import { Message } from './entities/message.entity';
import { MessagesServiceInterface } from './interfaces/messages.service.interface';
import CreateMessageDto from './dtos/create-message.dto';
import { Request as ExRequest } from 'express';
import { User } from '../users/entities/user.entity';

@injectable()
@Route('messages')
@Tags('Messages')
export class MessageController extends Controller {
  constructor(
    @inject('MessagesServiceInterface')
    private readonly messagesService: MessagesServiceInterface
  ) {
    super();
  }

  @Post()
  @Security('jwt')
  public async create(
    @Request() req: ExRequest,
    @Body() messageDto: CreateMessageDto
  ): Promise<Message> {
    try {
      const user = req.user as User;
      return await this.messagesService.create(messageDto, user);
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }

  @Get()
  @Security('jwt')
  public async readMany(@Request() req: ExRequest): Promise<Message[]> {
    try {
      const user = req.user as User;
      return await this.messagesService.readMany(user);
    } catch (error) {
      console.log('Error:', error);
      throw error;
    }
  }
}
