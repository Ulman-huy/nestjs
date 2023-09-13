import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  @Cron('0 0 * * 0')
  async deleteExpiredRefreshTokens() {
    try {
      const currentTime = new Date();
      await this.prismaService.refreshToken.deleteMany({
        where: {
          expirationDate: {
            lte: currentTime,
          },
        },
      });
      console.log('Expired refresh tokens deleted.');
    } catch (error) {
      console.error('Error deleting expired refresh tokens:', error);
    }
  }
}
