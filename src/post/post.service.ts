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
            id: post.user_id,
          },
          select: {
            email: true,
            image: true,
            first_name: true,
            last_name: true,
            slug: true,
          },
        });
        const comment = await this.prismaService.comment.findFirst({
          where: {
            post_id: post.id,
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
              id: comment.user_id,
            },
            select: {
              email: true,
              image: true,
              first_name: true,
              last_name: true,
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
            created_at: post.created_at,
            updated_at: post.updated_at,
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
              created_at: comment.created_at,
              updated_at: comment.updated_at,
              user_id: comment.user_id,
              post_id: comment.post_id,
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
            created_at: post.created_at,
            updated_at: post.updated_at,
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

  async getPosts(user_id: number) {
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
            id: post.user_id,
          },
          select: {
            email: true,
            image: true,
            first_name: true,
            last_name: true,
            slug: true,
          },
        });
        const comment: any = await this.prismaService.comment.findFirst({
          where: {
            post_id: post.id,
            type: 'DEFAULT',
          },
        });

        const interact = findInteract(user_id, post);
        if (comment) {
          const interactComment = findInteractComment(user_id, comment);

          const userComment = await this.prismaService.user.findFirst({
            where: {
              id: comment.user_id,
            },
            select: {
              email: true,
              image: true,
              first_name: true,
              last_name: true,
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
            created_at: post.created_at,
            updated_at: post.updated_at,
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
              created_at: comment.created_at,
              updated_at: comment.updated_at,
              interact: { ...interactComment },
              user_id: comment.user_id,
              type: comment.type,
              post_id: comment.post_id,
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
            created_at: post.created_at,
            updated_at: post.updated_at,
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

  async getPostById(user_id: number, post_id: number) {
    try {
      const post = await this.prismaService.post.findFirst({
        where: {
          id: post_id,
        },
      });
      const comment: any = await this.prismaService.comment.findFirst({
        where: {
          post_id: post.id,
          type: 'DEFAULT',
        },
      });
      if (post) {
        const interact = findInteract(user_id, post);
        const user = await this.prismaService.user.findUnique({
          where: {
            id: post.user_id,
          },
          select: {
            slug: true,
            full_name: true,
            email: true,
            image: true,
          },
        });
        if (comment) {
          const interactComment = findInteractComment(user_id, comment);
          const userComment = await this.prismaService.user.findFirst({
            where: {
              id: comment.user_id,
            },
            select: {
              email: true,
              image: true,
              first_name: true,
              last_name: true,
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
            created_at: post.created_at,
            updated_at: post.updated_at,
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
              created_at: comment.created_at,
              updated_at: comment.updated_at,
              interact: { ...interactComment },
              user_id: comment.user_id,
              type: comment.type,
              post_id: comment.post_id,
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
            wow: post.wows.length,
            sad: post.sads.length,
            heart: post.hearts.length,
            share: post.share,
            comment: post.comment,
            type: post.type,
            background: post.background,
            created_at: post.created_at,
            updated_at: post.updated_at,
            interact: interact,
            user: { ...user },
          };
        }
      }
    } catch (err) {
      return err;
    }
  }

  async getPostNoToken(post_id: number) {
    try {
      const post = await this.prismaService.post.findFirst({
        where: {
          id: post_id,
        },
      });
      const comment: any = await this.prismaService.comment.findFirst({
        where: {
          post_id: post.id,
          type: 'DEFAULT',
        },
      });
      if (post) {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: post.user_id,
          },
          select: {
            slug: true,
            full_name: true,
            email: true,
            image: true,
          },
        });
        if (comment) {
          const userComment = await this.prismaService.user.findFirst({
            where: {
              id: comment.user_id,
            },
            select: {
              email: true,
              image: true,
              first_name: true,
              last_name: true,
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
            created_at: post.created_at,
            updated_at: post.updated_at,
            interact: null,
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
              created_at: comment.created_at,
              updated_at: comment.updated_at,
              interact: null,
              user_id: comment.user_id,
              type: comment.type,
              post_id: comment.post_id,
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
            wow: post.wows.length,
            sad: post.sads.length,
            heart: post.hearts.length,
            share: post.share,
            comment: post.comment,
            type: post.type,
            background: post.background,
            created_at: post.created_at,
            updated_at: post.updated_at,
            interact: null,
            user: { ...user },
          };
        }
      }
    } catch (err) {
      return err;
    }
  }

  async insertPost(user_id: number, insertPostDTO: InsetPostDTO) {
    try {
      const post = await this.prismaService.post.create({
        data: {
          ...insertPostDTO,
          user_id: user_id,
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

  async updatePost(user_id: number, updatePostDTO: UpdatePostDTO) {
    const newPost = await this.prismaService.post.update({
      where: {
        id: updatePostDTO.post_id,
      },
      data: {
        // ...updatePostDTO,
      },
    });
    return newPost;
  }

  async deletePost(post_id: number) {
    await this.prismaService.post.delete({
      where: {
        id: post_id,
      },
    });
  }

  async hidePost(user_id: number, updatePostDTO: UpdatePostDTO) {
    const post = await this.prismaService.post.findFirst({
      where: {
        id: updatePostDTO.post_id,
      },
    });

    return post;
  }

  async commentPost(user_id: number, commentData: CommentDTO) {
    try {
      const { post_id } = commentData;
      const comment = await this.prismaService.comment.create({
        data: {
          user_id: user_id,
          ...commentData,
        },
      });
      await this.prismaService.post.update({
        where: {
          id: post_id,
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

  async getAllCommentWithpost_id(user_id: number, post_id: any) {
    try {
      const comments = await this.prismaService.comment.findMany({
        where: {
          post_id: post_id,
          type: 'DEFAULT',
        },
        take: 30,
      });

      const commentsPromises = comments.map(async (comment: CommentDTO) => {
        const user = await this.prismaService.user.findUnique({
          where: {
            id: comment.user_id,
          },
          select: {
            email: true,
            image: true,
            first_name: true,
            last_name: true,
            slug: true,
          },
        });
        const interact = findInteractComment(user_id, comment);
        return {
          id: comment.id,
          description: comment.description,
          image: comment.image,
          share: comment.share,
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          post_id: comment.post_id,
          user_id: comment.user_id,
          feedback: comment.feedback,
          angry: comment.angrys.length,
          dear: comment.dears.length,
          haha: comment.hahas.length,
          type: comment.type,
          heart: comment.hearts.length,
          like: comment.likes.length,
          wow: comment.wows.length,
          sad: comment.sads.length,
          interact: { ...interact },
          user: { ...user },
        };
      });

      const res = await Promise.all(commentsPromises);
      return res;
    } catch (error) {}
  }

  async addStatusPost(user_id: number, body: { post_id: number; type: string }) {
    try {
      const post = await this.prismaService.post.findFirst({
        where: {
          id: body.post_id,
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
        const isValid = post[key].includes(user_id);
        if (isValid) {
          post[key] = post[key].filter((item: number) => item != user_id);
        }
      }
      post[body.type].push(user_id);

      await this.prismaService.post.update({
        where: {
          id: body.post_id,
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
          created_at: post.created_at,
          updated_at: post.updated_at,
          user_id: post.user_id,
          interact: { isInteract: true, action: body.type },
        },
      };
    } catch (error) {
      return error;
    }
  }

  async addStatusComment(
    user_id: number,
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
        const isValid = comment[key].includes(user_id);
        if (isValid) {
          comment[key] = comment[key].filter((item: number) => item != user_id);
        }
      }
      comment[body.type].push(user_id);

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
          created_at: comment.created_at,
          updated_at: comment.updated_at,
          user_id: comment.user_id,
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
            id: comment.user_id,
          },
          select: {
            email: true,
            image: true,
            first_name: true,
            last_name: true,
            slug: true,
          },
        });
        return {
          id: comment.id,
          post_id: comment.post_id,
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
          user_id: comment.user_id,
          updated_at: comment.updated_at,
          created_at: comment.created_at,
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
    user_id: number,
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
        user_id: user_id,
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
