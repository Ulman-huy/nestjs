import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
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
  getPostById(@GetUser('id', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(userId, id);
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
  getCommentsWithId(@GetUser('id', ParseIntPipe) userId: number,@Param('postId', ParseIntPipe) postId: number) {
    return this.postService.getAllCommentWithPostId(userId, postId);
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

  @UseGuards(MyJwtGuard)
  @Get('comments/feedback/:id')
  getCommentFeedBack(@Param('id', ParseIntPipe) commentId: number) {
    return this.postService.getCommentFeedBack(commentId);
  }

  @UseGuards(MyJwtGuard)
  @Post('comments/feedback')
  feedbackComment(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() { commentId, ...commentData }: any,
  ) {
    return this.postService.feedbackComment(userId, commentId, commentData);
  }
}
