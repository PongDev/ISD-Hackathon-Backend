import { Body, Controller, Post, Put } from '@nestjs/common';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  register(@Body() registerUser: UserDTO) {
    return this.userService.registerUser(registerUser);
  }

  @Put('changepassword')
  changePassword(@Body() passwordData: ChangePasswordDTO) {
    return this.userService.changeUserPassword(passwordData);
  }

  @Post('login')
  login(@Body() loginUser: UserDTO) {
    return this.userService.login(loginUser);
  }
}
