import { IsString } from 'class-validator';

export class ChangePasswordDTO {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
