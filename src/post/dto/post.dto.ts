export type PostDTO = {
  id: number;
  user_id: number;
  description: string;
  images: string;
  likes: number[];
  hahas: number[];
  dears: number[];
  angrys: number[];
  wows: number[];
  hearts: number[];
  sads: number[];
  share: number;
  comment: number;
  type: string;
  background: string;
  created_at: Date;
  updated_at: Date;
};
