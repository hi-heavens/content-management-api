import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { forgotPasswordDto } from './dto/forgotPassword-dto';

@Controller('/api/v1/user/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('forgot')
  forgotPassword(@Body() forgotPasswrdDto: forgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswrdDto);
  }
}
