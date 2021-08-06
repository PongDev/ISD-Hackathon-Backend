import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { AccessTokenDTO } from './dto/access-token.dto';
import { PayloadDTO } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<AccessTokenDTO | null> {
    const loginUsername = await this.validateUser(username, password);

    if (loginUsername === null) {
      return null;
    } else {
      const payload: PayloadDTO = { username: loginUsername };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
