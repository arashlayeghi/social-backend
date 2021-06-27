import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";

export type TripCreateInput = {
  cid?: TravellerWhereUniqueInput | null;
  _ca?: number | null;
  status?: string | null;
  _lma?: Date | null;
  userIp?: string | null;
};
