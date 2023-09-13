import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  // Auto run 1 week
  @Cron('0 0 * * 0')
  async deleteExpiredRefreshTokens() {}
}
