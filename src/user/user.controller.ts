import {
  Body,
  Controller,
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
  changePassword(@Request() req, @Body() passwordData: ChangePasswordDTO) {
    return this.userService.changeUserPassword(req.user.username, passwordData);
  }

  @Post('login')
  login(@Body() loginUser: UserDTO) {
    return this.userService.login(loginUser);
  }
}
