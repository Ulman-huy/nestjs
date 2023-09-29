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
  getPost(@GetUser('id', ParseIntPipe) user_id: number) {
    return this.postService.getPosts(user_id);
  }

  @Get('all')
  getAllPost() {
    return this.postService.getAllPost();
  }

  @UseGuards(MyJwtGuard)
  @Get(':id')
  getPostById(@GetUser('id', ParseIntPipe) user_id: number, @Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(user_id, id);
  }

  @Get('share/:id')
  getPostNoToken(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostNoToken(id);
  }


  @UseGuards(MyJwtGuard)
  @Post()
  insertPost(
    @GetUser('id', ParseIntPipe) user_id: number,
    @Body() insertPostDTO: InsetPostDTO,
  ) {
    return this.postService.insertPost(user_id, insertPostDTO);
  }

  @UseGuards(MyJwtGuard)
  @Patch()
  updatePost(
    @GetUser('id', ParseIntPipe) user_id: number,
    @Body() updatePostDTO: UpdatePostDTO,
  ) {
    return this.postService.updatePost(user_id, updatePostDTO);
  }

  @UseGuards(MyJwtGuard)
  @Patch('hide')
  hidePost(
    @GetUser('id', ParseIntPipe) user_id: number,
    @Body() updatePostDTO: UpdatePostDTO,
  ) {
    console.log({ updatePostDTO, user_id });
  }

  @UseGuards(MyJwtGuard)
  @Delete()
  deletePost(@Param('id', ParseIntPipe) post_id: number) {
    return this.postService.deletePost(post_id);
  }

  @UseGuards(MyJwtGuard)
  @Post('comments')
  commentPost(
    @GetUser('id', ParseIntPipe) user_id: number,
    @Body() commentData: CommentDTO,
  ) {
    return this.postService.commentPost(user_id, commentData);
  }

  @UseGuards(MyJwtGuard)
  @Get('comments/:post_id')
  getCommentsWithId(@GetUser('id', ParseIntPipe) user_id: number,@Param('post_id', ParseIntPipe) post_id: number) {
    return this.postService.getAllCommentWithpost_id(user_id, post_id);
  }

  @UseGuards(MyJwtGuard)
  @Post('status')
  addStatusPost(
    @GetUser('id', ParseIntPipe) user_id: number,
    @Body() body: { type: string; post_id: number },
  ) {
    return this.postService.addStatusPost(user_id, body);
  }

  @UseGuards(MyJwtGuard)
  @Post('comments/status')
  addStatusComments(
    @GetUser('id', ParseIntPipe) user_id: number,
    @Body() body: { type: string; commentId: number },
  ) {
    return this.postService.addStatusComment(user_id, body);
  }

  @UseGuards(MyJwtGuard)
  @Get('comments/feedback/:id')
  getCommentFeedBack(@Param('id', ParseIntPipe) commentId: number) {
    return this.postService.getCommentFeedBack(commentId);
  }

  @UseGuards(MyJwtGuard)
  @Post('comments/feedback')
  feedbackComment(
    @GetUser('id', ParseIntPipe) user_id: number,
    @Body() { commentId, ...commentData }: any,
  ) {
    return this.postService.feedbackComment(user_id, commentId, commentData);
  }
}
