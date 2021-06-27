import { StringNullableFilter } from "../../util/StringNullableFilter";
import { IntNullableFilter } from "../../util/IntNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type GroupWhereInput = {
  description?: StringNullableFilter;
  end_date?: IntNullableFilter;
  id?: StringFilter;
  start_date?: IntNullableFilter;
};
