import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { signUpDto } from './dto/signup-dto';
import { UserService } from './user.service';

@Controller('/api/v1/user/')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signup(@Body() createSignUpDto: signUpDto) {
    return this.userService.createUser(createSignUpDto);
  }

  @Get('users')
  getUsers() {
    return this.userService.getUsers();
  }
}
