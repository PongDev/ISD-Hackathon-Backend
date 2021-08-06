import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() registerUser: UserDTO) {
    return await this.userService.registerUser(registerUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put('changepassword')
  async changePassword(
    @Request() req,
    @Body() passwordData: ChangePasswordDTO,
  ) {
    return await this.userService.changeUserPassword(
      req.user.email,
      passwordData,
    );
  }

  @Post('login')
  async login(@Body() loginUser: UserDTO) {
    return await this.userService.login(loginUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('projectList')
  async projectList(@Request() req) {
    return await this.userService.projectList(req.user.email);
  }
}
