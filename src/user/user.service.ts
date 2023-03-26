import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/signup-dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  createSignUpDto: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createSignUpDto: signUpDto) {
    const hashPassword = await this.getHashedPassword(createSignUpDto.password);
    createSignUpDto.password = hashPassword;
    return this.userRepository.save(createSignUpDto);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getHashedPassword(password: string) {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }
}
