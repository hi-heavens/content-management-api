import { Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('/api/v1/posts/')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  createPost() {
    return this.postService.createPost();
    // return 'This is the create post endpoint v1';
  }
}
