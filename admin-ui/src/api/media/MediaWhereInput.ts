import { StringFilter } from "../../util/StringFilter";
import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type MediaWhereInput = {
  id?: StringFilter;
  post?: PostWhereUniqueInput;
  public_id?: StringNullableFilter;
  type?: "Image" | "Video";
};
