import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";

export type TripUpdateInput = {
  cid?: TravellerWhereUniqueInput | null;
  _ca?: number | null;
  status?: string | null;
  _lma?: Date | null;
  userIp?: string | null;
};
