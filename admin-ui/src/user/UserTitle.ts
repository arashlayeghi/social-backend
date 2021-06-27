import { User as TUser } from "../api/user/User";

export const USER_TITLE_FIELD = "first_name";

export const UserTitle = (record: TUser) => {
  return record.first_name;
};
