export type UserCreateInput = {
  first_name?: string | null;
  last_name?: string | null;
  password: string;
  roles: Array<string>;
  username: string;
};
