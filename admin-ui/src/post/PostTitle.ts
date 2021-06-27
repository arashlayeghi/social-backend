import { Post as TPost } from "../api/post/Post";

export const POST_TITLE_FIELD = "id";

export const PostTitle = (record: TPost) => {
  return record.id;
};
