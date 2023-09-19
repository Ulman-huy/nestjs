import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { MyJwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

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

  @UseGuards(MyJwtGuard)
  @Get('info/:slug')
  getInfoUser(@Param('slug') slug: string) {
    return this.userService.getInfoUser(slug);
  }

  @UseGuards(MyJwtGuard)
  @Put('update-avatar')
  updateAvatar(@GetUser() user: User, @Body() { url }: any) {
    return this.userService.updateAvatar(user, url);
  }

  @UseGuards(MyJwtGuard)
  @Put('update-background')
  updateBackground(@GetUser() user: User, @Body() { url }: any) {
    return this.userService.updateBackground(user, url);
  }
  @UseGuards(MyJwtGuard)
  @Get('friends/:slug')
  getFriends(@Param("slug") slug: string) {
    return this.userService.getFriends(slug);
  }
}
