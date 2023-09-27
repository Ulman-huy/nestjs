import { Injectable } from '@nestjs/common';
import { CommentDTO, InsetPostDTO, UpdatePostDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDTO } from './dto/post.dto';
import { AuthDTO } from 'src/auth/dto';
import { findInteract, findInteractComment } from 'src/utils';

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
            type: 'DEFAULT',
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

          return {
            id: post.id,
            description: post.description,
            images: post.images,
            like: post.likes.length,
            haha: post.hahas.length,
            dear: post.dears.length,
            angry: post.angrys.length,
            heart: post.hearts.length,
            wow: post.wows.length,
            sad: post.sads.length,
            share: post.share,
            comment: post.comment,
            type: post.type,
            background: post.background,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: { ...user },
            commentPreview: {
              id: comment.id,
              description: comment.description,
              images: comment.image,
              like: comment.likes.length,
              haha: comment.hahas.length,
              dear: comment.dears.length,
              angry: comment.angrys.length,
              heart: comment.hearts.length,
              wow: comment.wows.length,
              sad: comment.sads.length,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
              userId: comment.userId,
              postId: comment.postId,
              type: comment.type,
              user: userComment,
            },
          };
        } else {
          return {
            id: post.id,
            description: post.description,
            images: post.images,
            like: post.likes.length,
            haha: post.hahas.length,
            dear: post.dears.length,
            angry: post.angrys.length,
            heart: post.hearts.length,
            wow: post.wows.length,
            sad: post.sads.length,
            share: post.share,
            comment: post.comment,
            type: post.type,
            background: post.background,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            user: { ...user },
          };
        }
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
        const comment: any = await this.prismaService.comment.findFirst({
          where: {
            postId: post.id,
            type: 'DEFAULT',
          },
        });

        const interact = findInteract(userId, post);
        if (comment) {
          const interactComment = findInteractComment(userId, comment);

          const userComment = await this.prismaService.user.findFirst({
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
            id: post.id,
            description: post.description,
            images: post.images,
            like: post.likes.length,
            haha: post.hahas.length,
            dear: post.dears.length,
            angry: post.angrys.length,
            wow: post.wows.length,
            sad: post.sads.length,
            heart: post.hearts.length,
            share: post.share,
            comment: post.comment,
            type: post.type,
            background: post.background,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            interact: interact,
            user: { ...user },
            commentPreview: {
              id: comment.id,
              description: comment.description,
              images: comment.image,
              like: comment.likes.length,
              haha: comment.hahas.length,
              dear: comment.dears.length,
              angry: comment.angrys.length,
              heart: comment.hearts.length,
              wow: comment.wows.length,
              sad: comment.sads.length,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt,
              interact: { ...interactComment },
              userId: comment.userId,
              type: comment.type,
              postId: comment.postId,
              user: userComment,
            },
          };
        } else {
          return {
            id: post.id,
            description: post.description,
            images: post.images,
            like: post.likes.length,
            haha: post.hahas.length,
            dear: post.dears.length,
            angry: post.angrys.length,
            heart: post.hearts.length,
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
          };
        }
      });

      const res = await Promise.all(postPromises);
      return res;
    } catch (error) {
      // Handle errors here
      throw error;
    }
  }

  async getPostById(userId: number, postId: number) {
    try {
      const post = await this.prismaService.post.findFirst({
        where: {
          id: postId,
        },
      });
      if (post) {
        const interact = findInteract(userId, post);
        const user = await this.prismaService.user.findUnique({
          where: {
            id: post.userId,
          },
          select: {
            slug: true,
            fullName: true,
            email: true,
            image: true,
          },
        });

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
          heart: post.hearts.length,
          share: post.share,
          comment: post.comment,
          type: post.type,
          background: post.background,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          interact: interact,
          user: { ...user },
        };
      }

      return post;
    } catch (err) {
      return err;
    }
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
      await this.prismaService.post.update({
        where: {
          id: postId,
        },
        data: {
          comment: {
            increment: 1,
          },
        },
      });
      return comment;
    } catch (error) {
      return error;
    }
  }

  async getAllCommentWithPostId(userId:number, postId: any) {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: {
          postId: postId,
          type: 'DEFAULT',
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
        const interact = findInteractComment(userId, comment)
        return {
          id: comment.id,
          description: comment.description,
          image: comment.image,
          share: comment.share,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          postId: comment.postId,
          userId: comment.userId,
          feedback: comment.feedback,
          angry: comment.angrys.length,
          dear: comment.dears.length,
          haha: comment.hahas.length,
          type: comment.type,
          heart: comment.hearts.length,
          like: comment.likes.length,
          wow: comment.wows.length,
          sad: comment.sads.length,
          interact: {...interact},
          user: { ...user },
        };
      });

      const res = await Promise.all(commentsPromises);
      return res;
    } catch (error) {}
  }

  async addStatusPost(userId: number, body: { postId: number; type: string }) {
    try {
      const post = await this.prismaService.post.findFirst({
        where: {
          id: body.postId,
        },
      });

      const interactKeys = [
        'likes',
        'hahas',
        'dears',
        'angrys',
        'wows',
        'sads',
        'hearts',
      ];
      for (const key of interactKeys) {
        if (!post[key].length) continue;
        const isValid = post[key].includes(userId);
        if (isValid) {
          post[key] = post[key].filter((item: number) => item != userId);
        }
      }
      post[body.type].push(userId);

      await this.prismaService.post.update({
        where: {
          id: body.postId,
        },
        data: {
          ...post,
        },
      });
      return {
        status: 200,
        data: {
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
          userId: post.userId,
          interact: { isInteract: true, action: body.type },
        },
      };
    } catch (error) {
      return error;
    }
  }

  async addStatusComment(
    userId: number,
    body: { commentId: number; type: string },
  ) {
    try {
      const comment = await this.prismaService.comment.findFirst({
        where: {
          id: body.commentId,
        },
      });

      const interactKeys = [
        'likes',
        'hahas',
        'dears',
        'angrys',
        'wows',
        'sads',
        'hearts',
      ];
      for (const key of interactKeys) {
        if (!comment[key].length) continue;
        const isValid = comment[key].includes(userId);
        if (isValid) {
          comment[key] = comment[key].filter((item: number) => item != userId);
        }
      }
      comment[body.type].push(userId);

      await this.prismaService.comment.update({
        where: {
          id: body.commentId,
        },
        data: {
          ...comment,
        },
      });
      return {
        status: 200,
        data: {
          id: comment.id,
          description: comment.description,
          images: comment.image,
          like: comment.likes.length,
          haha: comment.hahas.length,
          dear: comment.dears.length,
          angry: comment.angrys.length,
          wow: comment.wows.length,
          sad: comment.sads.length,
          share: comment.share,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          userId: comment.userId,
          interact: { isInteract: true, action: body.type },
        },
      };
    } catch (error) {
      return error;
    }
  }

  async getCommentFeedBack(commentId: number) {
    try {
      const comment = await this.prismaService.comment.findFirst({
        where: {
          id: commentId,
        },
      });
      const comments = await this.prismaService.comment.findMany({
        where: {
          id: {
            in: comment.feedback,
          },
        },
      });
      const commentPromises = comments.map(async (comment: CommentDTO) => {
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
          id: comment.id,
          postId: comment.postId,
          description: comment.description,
          image: comment.image,
          like: comment.likes.length,
          haha: comment.hahas.length,
          dear: comment.dears.length,
          angry: comment.angrys.length,
          wow: comment.wows.length,
          heart: comment.hearts.length,
          sad: comment.sads.length,
          type: comment.type,
          feedback: comment.feedback.length,
          share: comment.share,
          userId: comment.userId,
          updatedAt: comment.updatedAt,
          createdAt: comment.createdAt,
          user,
        };
      });
      const res = await Promise.all(commentPromises);
      return res;
    } catch (err) {
      return err;
    }
  }

  async feedbackComment(
    userId: number,
    commentId: number,
    commentData: CommentDTO,
  ) {
    // try {
    await this.prismaService.comment.update({
      where: {
        id: commentId,
      },
      data: {
        feedback: {
          push: commentId,
        },
      },
    });

    const feedbackComment = await this.prismaService.comment.create({
      data: {
        userId,
        ...commentData,
        type: 'FEEDBACK',
      },
    });
    return feedbackComment;
    // } catch (err) {
    //   return err;
    // }
  }
}
