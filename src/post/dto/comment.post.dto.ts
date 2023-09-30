export type CommentDTO = {
  id: number;
  post_id: number;
  description: string;
  image?: string;
  likes?: number[];
  hahas?: number[];
  dears?: number[];
  angrys?: number[];
  wows?: number[];
  hearts?: number[];
  sads?: number[];
  type?: string;
  feedback?: number[]; 
  share?: number;
  user_id?: number;
  updated_at?: Date;
  created_at?: Date;
};
