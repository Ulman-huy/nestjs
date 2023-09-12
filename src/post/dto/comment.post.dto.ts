export type CommentDTO = {
  postId: number;
  description: string;
  image?: string;
  likes?: number[];
  hahas?: number[];
  dears?: number[];
  angrys?: number[];
  wows?: number[];
  sads?: number[];
  share?: number;
  userId?: number;
};
