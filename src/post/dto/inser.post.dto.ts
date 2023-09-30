import { IsNotEmpty, IsString } from 'class-validator';

export class InsetPostDTO {
  user_id: number;
  description?: string;
  images?: string;
  likes?: string;
  hahas?: string;
  dears?: string;
  angrys?: string;
  wows?: string;
  sads?: string;
  share?: number;
  comment?: number;
  type: string;
  background?: string;
}
