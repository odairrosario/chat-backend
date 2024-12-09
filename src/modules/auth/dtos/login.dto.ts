import { IsString, IsNotEmpty } from 'class-validator';

export default class LoginDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
