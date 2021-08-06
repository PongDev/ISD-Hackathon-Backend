import { IsString } from 'class-validator';

export class PayloadDTO {
  @IsString()
  email: string;
}
