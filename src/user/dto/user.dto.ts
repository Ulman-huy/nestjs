export type UserDTO = {
  id: number;
  email: string;
  slug: string;
  firstname: string;
  lastname: string;
  fullname: string;
  image: string;
  bio: string;
  location: string;
  friends: number[];
  birthday: Date;
  createdat: Date;
  updatedat: Date;
  background: string;
};
