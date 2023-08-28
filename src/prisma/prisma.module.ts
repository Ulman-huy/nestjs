import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Module globle
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
