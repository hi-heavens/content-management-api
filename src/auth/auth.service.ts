import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { forgotPasswordDto } from './dto/forgotPassword-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async forgotPassword(forgotPasswordDto: forgotPasswordDto) {
    const resetToken = await this.generateToken(forgotPasswordDto.email);
    return {
      message: 'Password reset token sent successfully',
      token: resetToken,
    };
  }

  async generateToken(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('There is no user with this email');
    }
    const payload = { user: user.uuid };
    return this.jwtService.sign(payload);
  }
}
