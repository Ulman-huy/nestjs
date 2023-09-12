import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { PostService } from './post.service';
import { GetUser } from '../auth/decorator';
import { InsetPostDTO, CommentDTO, UpdatePostDTO } from './dto';

@Controller('api/v1/posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(MyJwtGuard)
  @Get()
  getPost(@GetUser('id', ParseIntPipe) userId: number) {
    return this.postService.getPosts(userId);
  }

  @Get('all')
  getAllPost() {
    return this.postService.getAllPost();
  }

  @UseGuards(MyJwtGuard)
  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @UseGuards(MyJwtGuard)
  @Post()
  insertPost(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() insertPostDTO: InsetPostDTO,
  ) {
    return this.postService.insertPost(userId, insertPostDTO);
  }

  @UseGuards(MyJwtGuard)
  @Patch()
  updatePost(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() updatePostDTO: UpdatePostDTO,
  ) {
    return this.postService.updatePost(userId, updatePostDTO);
  }

  @UseGuards(MyJwtGuard)
  @Patch('hide')
  hidePost(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() updatePostDTO: UpdatePostDTO,
  ) {
    console.log({ updatePostDTO, userId });
  }

  @UseGuards(MyJwtGuard)
  @Delete()
  deletePost(@Param('id', ParseIntPipe) postId: number) {
    return this.postService.deletePost(postId);
  }

  @UseGuards(MyJwtGuard)
  @Post('comments')
  commentPost(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() commentData: CommentDTO,
  ) {
    return this.postService.commentPost(userId, commentData);
  }

  @UseGuards(MyJwtGuard)
  @Get('comments/:postId')
  getCommentsWithId(@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.getAllCommentWithPostId(postId);
  }

  @UseGuards(MyJwtGuard)
  @Post('status')
  addStatusPost(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() body: { type: string; postId: number },
  ) {
    return this.postService.addStatusPost(userId, body);
  }

  @UseGuards(MyJwtGuard)
  @Post('comments/status')
  addStatusComments(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() body: { type: string; commentId: number },
  ) {
    return this.postService.addStatusComment(userId, body);
  }
}
