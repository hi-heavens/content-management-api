import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { forgotPasswordDto } from './dto/forgotPassword-dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { resetPasswordDto } from './dto/resetPassword-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async forgotPassword(forgotPasswordDto: forgotPasswordDto) {
    const resetToken = await this.generateToken(forgotPasswordDto.email);
    return {
      message: 'Password reset token sent successfully',
      token: resetToken,
    };
  }

  async generateToken(email: string): Promise<string> {
    // check if the user exists
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('There is no user with this email');
    }
    const payload = { user: user.uuid };
    return this.jwtService.sign(payload);
  }

  async resetPassword(token: string, newPassword: resetPasswordDto) {
    // verify that the token is valid, has not expired and that the user exists
    const userId = await this.verifyToken(token);
    const user = await this.userRepository.findOne({ where: { uuid: userId } });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    // hash the new password
    const hashPassword = await this.userService.getHashedPassword(
      newPassword.password,
    );
    // update the user's password with the hashed password
    user.password = hashPassword;
    await this.userRepository.save(user);
    return { message: 'Password reset successfully' };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.user;
    } catch (error) {
      throw new NotFoundException('Invalid token provided!');
    }
  }
}
