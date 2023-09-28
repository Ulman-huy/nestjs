import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { GatesWayModule } from './gatesway/gatesway.module';

@Module({
  imports: [
    AuthModule,
    GatesWayModule,
    UserModule,
    PostModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class AppModule {}
