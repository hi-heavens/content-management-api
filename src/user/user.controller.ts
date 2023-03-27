import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginDto } from './dto/login-dto';
import { signUpDto } from './dto/signup-dto';
import { UserService } from './user.service';

@Controller('/api/v1/user/')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() createSignUpDto: signUpDto) {
    return await this.userService.createUser(createSignUpDto);
  }

  @Post('login')
  async login(@Body() createSignUpDto: loginDto) {
    return await this.userService.loginUser(createSignUpDto);
  }

  @Get('users')
  getUsers() {
    return this.userService.getUsers();
  }
}
