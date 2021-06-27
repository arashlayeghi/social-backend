import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type TravellerWhereInput = {
  email?: StringNullableFilter;
  first_name?: StringNullableFilter;
  id?: StringFilter;
  last_name?: StringNullableFilter;
  middle_name?: StringNullableFilter;
  title?: StringNullableFilter;
};
