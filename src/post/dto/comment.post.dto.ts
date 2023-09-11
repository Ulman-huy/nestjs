import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentDTO {
  @IsNotEmpty()
  postId: number;

  @IsOptional()
  description: string;

  @IsOptional()
  image?: string;

  @IsOptional()
  likes?: number[];

  @IsOptional()
  hahas?: number[];

  @IsOptional()
  dears?: number[];

  @IsOptional()
  angrys?: number[];

  @IsOptional()
  wows?: number[];

  @IsOptional()
  sads?: number[];

  @IsOptional()
  share?: number;

  @IsOptional()
  userId?: number;
}
