import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/signup-dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

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

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getHashedPassword(password: string) {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }
}
