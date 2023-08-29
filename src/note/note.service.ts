import { Injectable } from '@nestjs/common';
import { InsetNoteDTO, UpdateNoteDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class NoteService {
  constructor(private prismaService: PrismaService) {}

  async getNotes(userId: number) {
    const notes = this.prismaService.note.findMany({
      where: {
        userId: userId,
      },
    });
    return notes;
  }

  async getNoteById(noteId: number) {
    const note = await this.prismaService.note.findFirst({
      where: {
        id: noteId,
      },
    });
    return note;
  }

  async insertNote(userId: number, insertNoteDTO: InsetNoteDTO) {
    const note = await this.prismaService.note.create({
      data: {
        ...insertNoteDTO,
        userId: userId,
      },
    });
    return note;
  }

  async updateNote(noteId: number, updateNoteDTO: UpdateNoteDTO) {
    const newNote = await this.prismaService.note.update({
      where: {
        id: noteId,
      },
      data: {
        ...updateNoteDTO,
      },
    });
    return newNote;
  }

  async deleteNote(nodeId: number) {
    await this.prismaService.note.delete({
      where: {
        id: nodeId,
      },
    });
  }
}
