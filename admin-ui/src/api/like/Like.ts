import { Traveller } from "../traveller/Traveller";
import { Post } from "../post/Post";

export type Like = {
  cid?: Traveller | null;
  _ca: number | null;
  id: string;
  post_id?: Post | null;
  _lma: number | null;
};
