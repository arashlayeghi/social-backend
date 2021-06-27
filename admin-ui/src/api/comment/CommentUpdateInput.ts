import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";

export type CommentUpdateInput = {
  cid?: TravellerWhereUniqueInput | null;
  content?: string | null;
  _ca?: number | null;
  _lma?: number | null;
};
