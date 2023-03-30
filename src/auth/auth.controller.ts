import { Controller, ValidationPipe } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { forgotPasswordDto } from './dto/forgotPassword-dto';
import { resetPasswordDto } from './dto/resetPassword-dto';

@Controller('/api/v1/user/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('forgot')
  forgotPassword(@Body() forgotPasswrdDto: forgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswrdDto);
  }

  // The token is expected to be sent as a parameter in the URL
  @Post('reset-password/:token')
  resetPassword(
    @Param('token', ValidationPipe) token: string,
    @Body() newPassword: resetPasswordDto,
  ) {
    // return token;
    return this.authService.resetPassword(token, newPassword);
  }
}
