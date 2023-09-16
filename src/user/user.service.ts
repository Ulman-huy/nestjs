import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDTO } from './dto/user.dto';

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
}
