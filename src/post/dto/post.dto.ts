export type PostDTO = {
  id: number;
  userId: number;
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
  createdat: Date;
  updatedat: Date;
};
