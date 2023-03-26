import { Injectable } from '@nestjs/common';
import { signUpDto } from './dto/signup-dto';

@Injectable()
export class UserService {
  createUser(createSignUpDto: signUpDto) {
    return createSignUpDto;
  }
}
