import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signUpDto } from './dto/signUp-dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login-dto';
import { updateDto } from './dto/updateUser-dto';
import { Post } from 'src/post/entity/post.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createUser(createSignUpDto: signUpDto) {
    const hashPassword = await this.getHashedPassword(createSignUpDto.password);
    createSignUpDto.password = hashPassword;
    const email = createSignUpDto.email;
    const existUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existUser) {
      return { message: 'User already exists' };
    }
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
    const { first_name, last_name } = updateUserDto;
    await this.userRepository.update(
      { uuid: user_uuid },
      { first_name, last_name },
    );
    return { message: 'User updated successfully' };
  }

  async getHashedPassword(password: string) {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
}
