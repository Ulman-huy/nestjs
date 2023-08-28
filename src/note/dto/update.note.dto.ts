import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateNoteDTO {
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
  url?: string;
}
