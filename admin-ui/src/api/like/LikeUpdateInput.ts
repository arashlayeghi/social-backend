import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";
import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";

export type LikeUpdateInput = {
  cid?: TravellerWhereUniqueInput | null;
  _ca?: number | null;
  post_id?: PostWhereUniqueInput | null;
  _lma?: number | null;
};
