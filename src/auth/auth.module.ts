import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { Post } from 'src/post/entity/post.entity';
import { jwtConstants } from 'src/user/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [AuthService, UserService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Post]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
