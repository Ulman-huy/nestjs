import { Injectable } from '@nestjs/common';
import { InsetPostDTO, UpdatePostDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDTO } from './dto/post.dto';

@Injectable({})
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async getAllPost() {
    try {
      const posts = await this.prismaService.post.findMany({
        orderBy: {
          id: 'asc',
        },
      });

      const postPromises = posts.map(async (post: PostDTO) => {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: post.userId,
          },
          select: {
            email: true,
            image: true,
            firstName: true,
            lastName: true,
          },
        });
        const comment = await this.prismaService.comment.findFirst({
          where: {
            postId: post.id,
          },
        });
        let userComment = null;
        if (comment) {
          userComment = await this.prismaService.user.findFirst({
            where: {
              id: comment.userId,
            },
            select: {
              email: true,
              image: true,
              firstName: true,
              lastName: true,
            },
          });
        }

        return {
          ...post,
          user: { ...user },
          commentPrivew: { ...comment, user: userComment },
        };
      });

      const res = await Promise.all(postPromises);
      return res;
    } catch (error) {
      // Handle errors here
      throw error;
    }
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
