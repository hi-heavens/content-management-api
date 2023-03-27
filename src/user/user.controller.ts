import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { loginDto } from './dto/login-dto';
import { signUpDto } from './dto/signUp-dto';
import { updateDto } from './dto/updateUser-dto';
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

  @Get('all')
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':user_uuid')
  getUser(@Param('user_uuid', ParseUUIDPipe) user_uuid: string) {
    return this.userService.getAUser(user_uuid);
  }

  @Put(':user_uuid')
  updateUser(
    @Param('user_uuid', ParseUUIDPipe) user_uuid: string,
    @Body() updateUserDto: updateDto,
  ) {
    return this.userService.updateUser(user_uuid, updateUserDto);
  }
}
