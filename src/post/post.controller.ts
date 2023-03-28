import { Body, Controller, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/post-dto';
import { PostService } from './post.service';

@Controller('/api/v1/posts/')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }
}
