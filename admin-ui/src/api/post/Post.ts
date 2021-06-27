import { Traveller } from "../traveller/Traveller";
import { Like } from "../like/Like";
import { Media } from "../media/Media";

export type Post = {
  cid?: Traveller | null;
  content: string | null;
  _ca: number | null;
  id: string;
  likes?: Array<Like>;
  medias?: Array<Media>;
  _lma: number | null;
};
