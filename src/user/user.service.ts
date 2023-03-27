import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/signup-dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login-dto';

@Injectable()
export class UserService {
  createSignUpDto: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createSignUpDto: signUpDto) {
    const hashPassword = await this.getHashedPassword(createSignUpDto.password);
    createSignUpDto.password = hashPassword;
    const newUser = await this.userRepository.save(createSignUpDto);
    const payload = { uuid: newUser.uuid };
    const token = this.jwtService.sign(payload);
    return {
      message: 'User created successfully',
      id: newUser.uuid,
      token,
    };
  }

  loginUser(createSignUpDto: loginDto) {
    return createSignUpDto;
    /**
    const user = this.userRepository.findOne({
      where: { email: createSignUpDto.email },
    });
    if (!user) {
      return { message: 'User not found' };
    }
    const payload = { uuid: user.uuid };
    const token = this.jwtService.sign(payload);
    return {
      message: 'User logged in successfully',
      id: user.uuid,
      token,
    };
    */
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getHashedPassword(password: string) {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }
}
