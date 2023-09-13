import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  id: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  refreshToken: string;
}
