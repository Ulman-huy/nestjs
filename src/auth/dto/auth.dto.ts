import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDTO {
  id: number;

  @IsEmail()
  @IsNotEmpty({message: "Email không được để trống!"})
  email: string;

  @IsString()
  @IsNotEmpty({message: "Mật khẩu không được để trống!"})
  password: string;
}
