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
      firstName: user.firstname,
      lastName: user.lastname,
      fullName: user.fullname,
      image: user.image,
      bio: user.bio,
      location: user.location,
      friend: user.friends.length,
      birthday: user.birthday,
      background: user.background,
      createdAt: user.createdat,
      updatedAt: user.updatedat,
    };
  }

  async getListUser(user: any) {
    try {
      const listUser = await this.prismaService.user.findMany({
        where: {
          id: {
            notIn: [...user.friends, user.id],
          },
        },
        take: 36,
        select: {
          image: true,
          fullname: true,
          slug: true,
          id: true,
          email: true,
        },
      });
      return { status: 200, data: listUser };
    } catch (err) {
      return err;
    }
  }

  async getPosts(slug: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          slug: {
            equals: slug,
          },
        },
        select: {
          id: true,
          email: true,
          image: true,
          firstname: true,
          lastname: true,
          slug: true,
        },
      });
      if (!user) return false;
      const posts = await this.prismaService.post.findMany({
        where: {
          userid: user.id,
        },
      });

      const postPromises = posts.map(async (post: PostDTO) => {
        const comment: any = await this.prismaService.comment.findFirst({
          where: {
            postid: post.id,
            type: 'DEFAULT',
          },
        });

        const interact = findInteract(user.id, post);
        if (comment) {
          const interactComment = findInteractComment(user.id, comment);

          const userComment = await this.prismaService.user.findFirst({
            where: {
              id: comment.userid,
            },
            select: {
              email: true,
              image: true,
              firstname: true,
              lastname: true,
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
            createdAt: post.createdat,
            updatedAt: post.updatedat,
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
              createdAt: comment.createdat,
              updatedAt: comment.updatedat,
              interact: { ...interactComment },
              userId: comment.userid,
              type: comment.type,
              postId: comment.postid,
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
            createdAt: post.createdat,
            updatedAt: post.updatedat,
            interact: interact,
            user: { ...user },
          };
        }
      });

      const res = await Promise.all(postPromises);
      return res;
    } catch (err) {
      return err;
    }
  }

  async getInfoUser(slug: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          slug: slug,
        },
      });
      return {
        id: user.id,
        email: user.email,
        slug: user.slug,
        fullName: user.fullname,
        image: user.image,
        bio: user.bio,
        location: user.location,
        friend: user.friends.length,
        birthday: user.birthday,
        background: user.background,
        createdAt: user.createdat,
        updatedAt: user.updatedat,
      };
    } catch (error) {
      return error;
    }
  }

  async updateAvatar(user: UserDTO, url: string) {
    try {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          image: url,
        },
      });
      return 'OK';
    } catch (error) {
      return error;
    }
  }
  async updateBackground(user: UserDTO, url: string) {
    try {
      await this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          background: url,
        },
      });
      return 'OK';
    } catch (error) {
      return error;
    }
  }
  async getFriends(slug: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          slug: slug,
        },
      });
      const friends = await this.prismaService.user.findMany({
        where: {
          id: {
            in: user.friends,
          },
        },
        take: 9,
      });
      return friends;
    } catch (err) {
      return err;
    }
  }
  async getListFriend(user: UserDTO) {
    try {
      const listFriend = await this.prismaService.user.findMany({
        where: {
          id: {
            in: user.friends,
          },
        },
        select: {
          image: true,
          fullname: true,
          slug: true,
          id: true,
          email: true,
          friends: true,
        },
      });
      return { status: 200, data: listFriend };
    } catch (err) {
      return err;
    }
  }
}
