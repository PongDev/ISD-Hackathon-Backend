import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { AccessTokenDTO } from '../auth/dto/access-token.dto';
import { AuthService } from 'src/auth/auth.service';
import { ProjectService } from 'src/project/project.service';
import { Project } from 'src/project/project.entity';

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private projectService: ProjectService,
  ) {}

  async findUser(email: string): Promise<User> {
    return await this.userRepository.findOne(email);
  }

  async registerUser(registerUser: UserDTO): Promise<string> {
    const saltRound = parseInt(this.configService.get<string>('SALT_ROUND'));
    const isUserExist =
      (await this.findUser(registerUser.email)) === undefined ? false : true;

    if (isUserExist) {
      throw new HttpException('User Already Exist', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.insert({
      email: registerUser.email,
      password: await bcrypt.hash(registerUser.password, saltRound),
    });
    return `Register Complete`;
  }

  async changeUserPassword(
    email: string,
    changePasswordData: ChangePasswordDTO,
  ): Promise<string> {
    const saltRound = parseInt(this.configService.get<string>('SALT_ROUND'));
    const user = await this.findUser(email);

    if (
      !user ||
      !(await bcrypt.compare(changePasswordData.oldPassword, user.password))
    ) {
      throw new HttpException(
        'User Not Found Or Password Incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    this.userRepository.update(
      { email: email },
      {
        password: await bcrypt.hash(changePasswordData.newPassword, saltRound),
      },
    );
    return 'Change Password Complete';
  }

  async login(loginUser: UserDTO): Promise<AccessTokenDTO> {
    const accessToken = await this.authService.login(
      loginUser.email,
      loginUser.password,
    );

    if (accessToken === null) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    } else {
      return accessToken;
    }
  }

  async projectList(email: string): Promise<Project[]> {
    return await this.projectService.getUserProject(email);
  }
}
