import { IsString, Length } from 'class-validator';

export class UserDTO {
  @IsString()
  @Length(1, 64)
  username: string;

  @IsString()
  password: string;
}
