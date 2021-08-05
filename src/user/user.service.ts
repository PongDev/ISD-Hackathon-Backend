import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(registerUser: UserDTO) {
    const saltRound = parseInt(this.configService.get<string>('SALT_ROUND'));
    const isUserExist =
      (await this.userRepository.findOne(registerUser.username)) === undefined
        ? false
        : true;

    if (isUserExist) {
      throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.insert({
      username: registerUser.username,
      password: await bcrypt.hash(registerUser.password, saltRound),
    });
    return `Register Complete`;
  }

  changeUserPassword(changePasswordData: ChangePasswordDTO) {
    return `change password route\nOld Password: ${changePasswordData.oldPassword}\nNew Password: ${changePasswordData.newPassword}`;
  }

  login(loginUser: UserDTO) {
    return `login route\nUser: ${loginUser.username}\nPassword: ${loginUser.password}`;
  }
}
