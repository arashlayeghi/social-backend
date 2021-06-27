import { Comment as TComment } from "../api/comment/Comment";

export const COMMENT_TITLE_FIELD = "id";

export const CommentTitle = (record: TComment) => {
  return record.id;
};
