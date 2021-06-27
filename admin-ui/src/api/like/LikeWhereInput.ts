import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";
import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";

export type LikeWhereInput = {
  cid?: TravellerWhereUniqueInput;
  id?: StringFilter;
  post_id?: PostWhereUniqueInput;
};
