import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/post-dto';
import { Post } from './entity/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createPost(createPostDto: CreatePostDto) {
    const { title, content, userId } = createPostDto;
    const newPost = new Post();
    newPost.title = title;
    newPost.content = content;
    newPost.user = await this.userRepository.findOne({
      where: { uuid: userId },
      select: ['id', 'uuid', 'first_name', 'last_name', 'email'],
    });

    const post = await this.postRepository.save(newPost);
    return { message: 'Post created successfully!', content, id: post.id };
  }

  async deletePost(postId: string) {
    await this.postRepository.delete({ id: postId });
    return { message: 'Post deleted successfully!' };
  }
}
