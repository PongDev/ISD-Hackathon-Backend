import { Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  registerUser(registerUser: UserDTO) {
    return `register route\nUser: ${registerUser.username}\nPassword: ${registerUser.password}`;
  }

  changeUserPassword(changePasswordData: ChangePasswordDTO) {
    return `change password route\nOld Password: ${changePasswordData.oldPassword}\nNew Password: ${changePasswordData.newPassword}`;
  }

  login(loginUser: UserDTO) {
    return `login route\nUser: ${loginUser.username}\nPassword: ${loginUser.password}`;
  }
}
