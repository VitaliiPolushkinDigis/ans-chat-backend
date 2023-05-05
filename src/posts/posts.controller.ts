import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Routes, Services } from 'src/utils/constants';
import { PostsService } from './posts.service';

@ApiTags(Routes.POSTS)
@Controller(Routes.POSTS)
export class PostsController {
  constructor(
    @Inject(Services.POST_SERVICE) private readonly postsService: PostsService,
  ) {}

  @Post()
  create(@Body() createPostDto: any) {
    return this.postsService.createPost(/* createPostDto */);
  }

  /*  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  } */
}
