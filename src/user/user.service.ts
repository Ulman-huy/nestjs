import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/user.dto';
import { PostDTO } from 'src/post/dto/post.dto';
import { findInteract, findInteractComment } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}
  getUser(user: UserDTO) {
    return {
      id: user.id,
      email: user.email,
      slug: user.slug,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      image: user.image,
      bio: user.bio,
      location: user.location,
      friend: user.friends.length,
      birthday: user.birthday,
      background: user.background,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getPosts(slug: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          slug: slug,
        },
        select: {
          id: true,
          email: true,
          image: true,
          firstName: true,
          lastName: true,
          slug: true,
        },
      });
      const posts = await this.prismaService.post.findMany({
        where: {
          userId: user.id,
        },
      });

      const postPromises = posts.map(async (post: PostDTO) => {
        const comment: any = await this.prismaService.comment.findFirst({
          where: {
            postId: post.id,
            type: 'DEFAULT',
          },
        });

        const interact = findInteract(user.id, post);
        if (comment) {
          const interactComment = findInteractComment(user.id, comment);

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
      return res
    } catch (err) {
      return err;
    }
  }
}
