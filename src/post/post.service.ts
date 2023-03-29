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

  async getPosts() {
    return await this.postRepository.find({
      order: { id: 'ASC' },
    });
  }

  async updatePost(postId: string, createPostDto: CreatePostDto) {
    const { title, content } = createPostDto;
    const post = await this.postRepository.findOne({ where: { id: postId } });
    post.title = title;
    post.content = content;
    await this.postRepository.save(post);
    return { message: 'Post updated successfully!' };
  }

  async deletePost(postId: string, request) {
    const user = request.user;

    const post = await this.postRepository
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id AND user = :userId', { id: postId, userId: user.uuid })
      .execute();

    if (post.affected === 0) {
      return { message: 'Post not found for the user!' };
    }

    return { message: 'Post deleted successfully!' };
  }
}
