import { IsNotEmpty, IsString } from 'class-validator';

export class InsetPostDTO {
  userId: number;
  description?: string;
  images?: string;
  likes?: number[];
  hahas?: number[];
  dears?: number[];
  angrys?: number[];
  wows?: number[];
  sads?: number[];
  share?: number;
  comment?: number;
  type: string;
  background?: string;
}
