import { TravellerWhereUniqueInput } from "../traveller/TravellerWhereUniqueInput";
import { GroupWhereUniqueInput } from "../group/GroupWhereUniqueInput";

export type GroupMemberCreateInput = {
  cid?: TravellerWhereUniqueInput | null;
  _ca: number;
  group_id?: GroupWhereUniqueInput | null;
  _lma?: Date | null;
};
