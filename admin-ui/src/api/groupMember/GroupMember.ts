import { Traveller } from "../traveller/Traveller";
import { Group } from "../group/Group";

export type GroupMember = {
  cid?: Traveller | null;
  _ca: number;
  group_id?: Group | null;
  id: string;
  _lma: Date | null;
};
