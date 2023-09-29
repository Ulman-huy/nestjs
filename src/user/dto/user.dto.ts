export type UserDTO = {
  id: number;
  email: string;
  slug: string;
  first_name: string;
  last_name: string;
  full_name: string;
  image: string;
  bio: string;
  location: string;
  friends: number[];
  birthday: Date;
  created_at: Date;
  updated_at: Date;
  background: string;
};
