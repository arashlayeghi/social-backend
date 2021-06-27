import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";

export type CommentWhereInput = {
  cid?: TravellerWhereUniqueInput;
  content?: StringNullableFilter;
  id?: StringFilter;
};
