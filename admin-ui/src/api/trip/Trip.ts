import { Traveller } from "../traveller/Traveller";
import { Group } from "../group/Group";

export type Trip = {
  cid?: Traveller | null;
  _ca: number | null;
  groups?: Array<Group>;
  id: string;
  status: string | null;
  _lma: Date | null;
  userIp: string | null;
};
