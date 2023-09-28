import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable({})
export class PrismaService extends PrismaClient {
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          // url: 'postgresql://postgres:123456789@localhost:5432/nestjs?schema=public',
          url: configService.get('POSTGRES_URL'),
        },
      },
    });
  }
  cleanDatabase() {
    return this.$transaction([this.post.deleteMany(), this.user.deleteMany()]);
  }
}
