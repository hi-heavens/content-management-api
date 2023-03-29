import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entity/post.entity';
import { User } from 'src/user/entity/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from 'src/user/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [PostService, JwtStrategy, UserService],
  controllers: [PostController],
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class PostModule {}
