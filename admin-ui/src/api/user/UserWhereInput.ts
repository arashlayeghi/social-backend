import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type UserWhereInput = {
  first_name?: StringNullableFilter;
  id?: StringFilter;
  last_name?: StringNullableFilter;
  username?: StringFilter;
};
