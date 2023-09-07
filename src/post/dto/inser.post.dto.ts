import { IsNotEmpty, IsString } from 'class-validator';

export class InsetPostDTO {
  userId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  images?: string;
  like?: number;
  haha?: number;
  dear?: number;
  angry?: number;
  wow?: number;
  sad?: number;
  share?: number;
  comment?: number;
  type: string;
  background?: string;
}
