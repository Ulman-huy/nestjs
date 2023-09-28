import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetswayService {
  constructor(private readonly prismaService: PrismaService) {}

  async createNewRequestAddFriend(body) {
    try {
    //   const room = await this.prismaService.room.create({
    //     data: body,
    //   });
    } catch (err) {
      return err;
    }
  }
}
