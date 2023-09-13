import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  exports: [TaskService],
})
export class AppModule {}
