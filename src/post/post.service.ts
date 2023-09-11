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
          id: post.id,
          description: post.description,
          images: post.images,
          like: post.likes.length,
          haha: post.hahas.length,
          dear: post.dears.length,
          angry: post.angrys.length,
          wow: post.wows.length,
          sad: post.sads.length,
          share: post.share,
          comment: post.comment,
          type: post.type,
          background: post.background,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
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
        const interact = await this.findInteract(userId, post);
        return {
          id: post.id,
          description: post.description,
          images: post.images,
          like: post.likes.length,
          haha: post.hahas.length,
          dear: post.dears.length,
          angry: post.angrys.length,
          wow: post.wows.length,
          sad: post.sads.length,
          share: post.share,
          comment: post.comment,
          type: post.type,
          background: post.background,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          interact: interact,
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

  findInteract(userId: number, post: PostDTO) {
    let isInteract = false;
    let action = '';
    const interactKeys = ['likes', 'hahas', 'dears', 'angrys', 'wows', 'sads'];
    for (const key of interactKeys) {
      const isValid = post[key].includes(userId);
      if (isValid) {
        isInteract = true;
        action = key;
        break; // Exit the loop once a valid interaction is found.
      }
    }
    return {
      isInteract,
      action,
    };
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

  async addStatusPost(userId: number, data: { postId: number; type: string }) {
    const post = await this.prismaService.post.findUnique({
      where: {
        id: data.postId,
      },
    });
    const interactKeys = ['likes', 'hahas', 'dears', 'angrys', 'wows', 'sads'];
    for (const key of interactKeys) {
      if (!post[key].length) continue;
      const isValid = post[key].includes(userId);
      if (isValid) {
        post[key] = post[key].filter((item) => item != userId);
      }
    }
    post[data.type].push(userId);
    return post;
  }
}
