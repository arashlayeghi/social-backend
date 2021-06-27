import { GroupWhereUniqueInput } from "../group/GroupWhereUniqueInput";
import { StringFilter } from "../../util/StringFilter";

export type GroupMemberWhereInput = {
  group_id?: GroupWhereUniqueInput;
  id?: StringFilter;
};
