import { Injectable } from '@nestjs/common';
import { InsetPostDTO, UpdatePostDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async getAllPost() {
    const posts = await this.prismaService.post.findMany();
    return posts;
  }

  async getPosts(userId: number) {
    const posts = await this.prismaService.post.findMany({
      where: {
        userId: userId,
      },
    });
    return posts;
  }

  async getPostById(postId: number) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: postId,
      },
    });
    return post;
  }

  async insertPost(userId: number, insertPostDTO: InsetPostDTO) {
    const post = await this.prismaService.post.create({
      data: {
        ...insertPostDTO,
        userId: userId,
      },
    });
    return post;
  }

  async updatePost(postId: number, updatePostDTO: UpdatePostDTO) {
    const newPost = await this.prismaService.post.update({
      where: {
        id: postId,
      },
      data: {
        ...updatePostDTO,
      },
    });
    return newPost;
  }

  async deletePost(postId: number) {
    await this.prismaService.post.delete({
      where: {
        id: postId,
      },
    });
  }
}
