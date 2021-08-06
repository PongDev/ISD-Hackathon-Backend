import { IsEmail, IsString, Length } from 'class-validator';

export class UserLoginDTO {
  @IsString()
  @IsEmail()
  @Length(1, 128)
  email: string;

  @IsString()
  password: string;
}
