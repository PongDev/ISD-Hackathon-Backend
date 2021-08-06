import { IsString } from 'class-validator';

export class AccessTokenDTO {
  @IsString()
  access_token: string;
}
