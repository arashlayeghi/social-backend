import { Traveller } from "../traveller/Traveller";

export type Comment = {
  cid?: Traveller | null;
  content: string | null;
  _ca: number | null;
  id: string;
  _lma: number | null;
};
