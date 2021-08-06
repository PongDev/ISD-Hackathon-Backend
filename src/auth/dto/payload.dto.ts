import { IsString } from 'class-validator';

export class PayloadDTO {
  @IsString()
  username: string;
}
