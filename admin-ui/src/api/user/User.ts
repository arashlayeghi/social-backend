export type User = {
  createdAt: Date;
  first_name: string | null;
  id: string;
  last_name: string | null;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
