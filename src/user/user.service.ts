import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/signup-dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(createSignUpDto: signUpDto) {
    return createSignUpDto;
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
