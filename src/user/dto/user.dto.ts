import { IsEmail, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsEmail()
  @Length(1, 128)
  email: string;

  @IsString()
  password: string;

  @IsString()
  displayName: string;
}
