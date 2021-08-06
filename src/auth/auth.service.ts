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

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUser(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user.email;
    } else {
      return null;
    }
  }

  async login(email: string, password: string): Promise<AccessTokenDTO | null> {
    const loginEmail = await this.validateUser(email, password);

    if (loginEmail === null) {
      return null;
    } else {
      const payload: PayloadDTO = { email: loginEmail };

      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
