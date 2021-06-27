import { Media as TMedia } from "../api/media/Media";

export const MEDIA_TITLE_FIELD = "public_id";

export const MediaTitle = (record: TMedia) => {
  return record.public_id;
};
