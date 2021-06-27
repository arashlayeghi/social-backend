import { GroupMember } from "../groupMember/GroupMember";
import { Trip } from "../trip/Trip";

export type Group = {
  _ca: number;
  description: string | null;
  end_date: number | null;
  groupMembers?: Array<GroupMember>;
  id: string;
  start_date: number | null;
  tid?: Trip | null;
  _lma: number | null;
};
