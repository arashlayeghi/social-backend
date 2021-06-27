import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";

export type PostUpdateInput = {
  cid?: TravellerWhereUniqueInput | null;
  content?: string | null;
  _ca?: number | null;
  _lma?: number | null;
};
