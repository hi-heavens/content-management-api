import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Put, Req, UseGuards } from '@nestjs/common/decorators';
import { CreatePostDto } from './dto/post-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PostService } from './post.service';

@Controller('/api/v1/posts/')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(@Body() createPostDto: CreatePostDto, @Req() request) {
    return this.postService.createPost(createPostDto, request);
  }

  @Get('all')
  getPosts() {
    return this.postService.getPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':postId')
  updatePost(
    @Param('postId', ParseIntPipe) postId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.updatePost(postId, createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':postId')
  deletePost(@Param('postId', ParseIntPipe) postId: string, @Req() request) {
    return this.postService.deletePost(postId, request);
  }
}
