import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsString()
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
