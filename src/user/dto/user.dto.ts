export type UserDTO = {
  id: number;
  email: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  image: string;
  bio: string;
  location: string;
  friends: number[];
  birthday: Date;
  createdat: Date;
  updatedat: Date;
  background: string;
};
