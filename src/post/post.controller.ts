import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/post-dto';
import { PostService } from './post.service';

@Controller('/api/v1/posts/')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Delete(':postId')
  deletePost(@Param('postId', ParseIntPipe) postId: string) {
    return this.postService.deletePost(postId);
  }
}
