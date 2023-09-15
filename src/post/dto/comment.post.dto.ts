export type CommentDTO = {
  id: number;
  postId: number;
  description: string;
  image?: string;
  likes?: number[];
  hahas?: number[];
  dears?: number[];
  angrys?: number[];
  wows?: number[];
  hearts?: number[];
  sads?: number[];
  type: string;
  feedback?: number[];
  share?: number;
  userId?: number;
  updatedAt?: Date;
  createdAt?: Date;
};
