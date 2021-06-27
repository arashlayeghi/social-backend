import { Comment } from "../comment/Comment";
import { GroupMember } from "../groupMember/GroupMember";
import { Like } from "../like/Like";
import { Post } from "../post/Post";
import { Trip } from "../trip/Trip";

export type Traveller = {
  comments?: Array<Comment>;
  _ca: number | null;
  email: string | null;
  first_name: string | null;
  groupMembers?: Array<GroupMember>;
  id: string;
  last_name: string | null;
  likes?: Array<Like>;
  middle_name: string | null;
  posts?: Array<Post>;
  title: string | null;
  trips?: Array<Trip>;
  _lma: number;
};
