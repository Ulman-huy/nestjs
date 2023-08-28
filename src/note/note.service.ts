import { Injectable } from '@nestjs/common';
import { InsetNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class NoteService {
  constructor(private prismaService: PrismaService) {}

  getNotes(id: number) {}

  getNoteById(id: number) {}

  async insertNote(userId: number, insertNoteDTO: InsetNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        ...insertNoteDTO,
        userId: userId,
      },
    });
    return note;
  }

  updateNote(id, data: UpdateNoteDTO) {}

  deleteNote(id) {}
}
