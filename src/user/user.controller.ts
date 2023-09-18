import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { UserService } from './user.service';

@Controller('api/v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(MyJwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return this.userService.getUser(user);
  }

  @UseGuards(MyJwtGuard)
  @Get('posts/:slug')
  getPosts(@Param('slug') slug: string) {
    return this.userService.getPosts(slug);
  }
}
