import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { Post } from './post/entity/post.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PostModule,
    CategoryModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://content_management_user:ULXZdoyyLt6Ei5Scicq0SotVLaLm0iUy@dpg-cgi3nbg2qv2772he7p4g-a.oregon-postgres.render.com/content_management',
      entities: [User, Post],
      migrations: [User, Post],
      ssl: {
        rejectUnauthorized: false,
      },
      // synchronize: true,
    }),
    /*TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Post],
      synchronize: true,
    }),*/
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
