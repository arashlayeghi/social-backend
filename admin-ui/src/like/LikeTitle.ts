import { Like as TLike } from "../api/like/Like";

export const LIKE_TITLE_FIELD = "id";

export const LikeTitle = (record: TLike) => {
  return record.id;
};
