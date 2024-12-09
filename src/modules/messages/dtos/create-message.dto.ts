import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { IsMongoId } from 'class-validator';

export default class CreateMessageDto {
  @IsMongoId()
  @IsNotEmpty()
  from!: string;

  @IsMongoId()
  @IsNotEmpty()
  to!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000, {
    message: 'Mensagem não pode exceder 1000 caracteres',
  })
  content!: string;
}
