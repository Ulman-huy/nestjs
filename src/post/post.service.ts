import { Injectable } from '@nestjs/common';
import { CommentDTO, InsetPostDTO, UpdatePostDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDTO } from './dto/post.dto';

@Injectable({})
export class PostService {
  constructor(private prismaService: PrismaService) {}

  async getAllPost() {
    try {
      const posts = await this.prismaService.post.findMany({
        orderBy: {
          id: 'desc',
        },
        take: 10,
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
            slug: true,
          },
        });
        const comment = await this.prismaService.comment.findFirst({
          where: {
            postId: post.id,
          },
          orderBy: {
            id: 'desc',
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
              slug: true,
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
    try {
      const posts = await this.prismaService.post.findMany({
        orderBy: {
          id: 'desc',
        },
        take: 10,
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
            slug: true,
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
              slug: true,
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

  async getPostById(postId: number) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: postId,
      },
    });
    return post;
  }

  async insertPost(userId: number, insertPostDTO: InsetPostDTO) {
    try {
      const post = await this.prismaService.post.create({
        data: {
          ...insertPostDTO,
          userId: userId,
        },
      });
      return {
        status: 201,
        data: post,
      };
    } catch (e) {
      return e;
    }
  }

  async updatePost(userId: number, updatePostDTO: UpdatePostDTO) {
    const newPost = await this.prismaService.post.update({
      where: {
        id: updatePostDTO.postId,
      },
      data: {
        // ...updatePostDTO,
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

  async hidePost(userId: number, updatePostDTO: UpdatePostDTO) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: updatePostDTO.postId,
      },
    });
    // if (!post.hides || !Array.isArray(post.hides)) {
    //   post.hides = [];
    // }
    // post.hides.push(userId);
    // await this.prismaService.post.update({
    //   where: {
    //     id: updatePostDTO.postId,
    //   },
    //   data: {
    //     ...post,
    //   },
    // });
    // return {
    //   status: 200,
    //   message: 'Đã ẩn bài viết ' + updatePostDTO.postId,
    // };
    console.log(post);

    return post;
  }

  async commentPost(userId: number, commentData: CommentDTO) {
    try {
      const { postId } = commentData;
      const comment = await this.prismaService.comment.create({
        data: {
          userId,
          ...commentData,
        },
      });
      const post = await this.prismaService.post.findFirst({
        where: {
          id: postId,
        },
      });

      post.comment++;

      await this.prismaService.post.update({
        where: {
          id: postId,
        },
        data: {
          ...post,
        },
      });
      return comment;
    } catch (error) {
      return error;
    }
  }

  async getAllCommentWithPostId(postId: any) {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: {
          postId: postId,
        },
        take: 30,
      });

      const commentsPromises = comments.map(async (comment: CommentDTO) => {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: comment.userId,
          },
          select: {
            email: true,
            image: true,
            firstName: true,
            lastName: true,
            slug: true,
          },
        });

        return {
          ...comment,
          user: { ...user },
        };
      });

      const res = await Promise.all(commentsPromises);
      return res;
    } catch (error) {}
  }
}
