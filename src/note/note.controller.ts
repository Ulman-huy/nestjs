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
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator';
import { InsetNoteDTO } from './dto';
import { UpdateNoteDTO } from './dto';

@UseGuards(MyJwtGuard)
@Controller('api/v1/notes')
export class NoteController {
  constructor(private noteService: NoteService) {}
  @Get()
  getNote(@GetUser('id', ParseIntPipe) userId: number) {
    return this.noteService.getNotes(userId);
  }

  @Get(':id')
  getNoteById(@Param() id: number) {
    return this.noteService.getNoteById(id);
  }

  @Post()
  insertNote(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() insertNoteDTO: InsetNoteDTO,
  ) {
    return this.noteService.insertNote(userId, insertNoteDTO);
  }

  @Patch()
  updateNote(
    @GetUser('id', ParseIntPipe) userId: number,
    @Body() updateNoteDTO: UpdateNoteDTO,
  ) {
    return this.noteService.updateNote(userId, updateNoteDTO);
  }

  @Delete()
  deleteNote(@Param('id', ParseIntPipe) noteId: number) {
    return this.noteService.deleteNote(noteId);
  }
}
