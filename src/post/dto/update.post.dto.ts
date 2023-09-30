import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdatePostDTO {
  @IsNotEmpty()
  post_id: number;
  description?: string;
  images?: string;
  like?: number;
  haha?: number;
  dear?: number;
  angry?: number;
  wow?: number;
  sad?: number;
  share?: number;
  comment?: number;
  type?: string;
  hides?: number[];
  background?: string;
}
