import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { IPostService } from './posts';
import { Post } from 'src/utils/typeorm';

@Injectable()
export class PostsService implements IPostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  async createPost(): Promise<Post> {
    const newProfile = this.postRepository.create({
      title: '',
      subtitle: '',
      description: '',
      comments: [],
      likes: 5,
      imgUrl: '',
    });
    return this.postRepository.save(newProfile);
  }
}
