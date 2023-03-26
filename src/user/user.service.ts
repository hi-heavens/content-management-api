import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser() {
    return 'This action adds a new user';
  }
}
