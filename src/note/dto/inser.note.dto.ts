import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class InsetNoteDTO {
  userId: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}
