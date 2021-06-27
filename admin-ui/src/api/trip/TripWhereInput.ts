import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type TripWhereInput = {
  id?: StringFilter;
  status?: StringNullableFilter;
  userIp?: StringNullableFilter;
};
