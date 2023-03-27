import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/signUp-dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login-dto';
import { updateDto } from './dto/updateUser-dto';

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

  async loginUser(createSignUpDto: loginDto) {
    const email = createSignUpDto.email;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (
      !user ||
      !(await this.comparePassword(createSignUpDto.password, user.password))
    ) {
      return { message: 'Incorrect email or password' };
    }
    const payload = { uuid: user.uuid };
    const token = this.jwtService.sign(payload);

    return {
      message: 'User logged in successfully',
      id: user.uuid,
      token,
    };
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: ['id', 'uuid', 'first_name', 'last_name', 'email'],
      order: { id: 'ASC' },
    });
  }

  getAUser(user_uuid: string): Promise<User> {
    return this.userRepository.findOne({
      where: { uuid: user_uuid },
      select: ['id', 'uuid', 'first_name', 'last_name', 'email'],
    });
  }

  async updateUser(user_uuid: string, updateUserDto: updateDto) {
    await this.userRepository.update({ uuid: user_uuid }, updateUserDto);
    return { message: 'User updated successfully' };
  }

  async getHashedPassword(password: string) {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
