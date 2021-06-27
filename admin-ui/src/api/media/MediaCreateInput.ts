import { PostWhereUniqueInput } from "../post/PostWhereUniqueInput";

export type MediaCreateInput = {
  _ca: number;
  post?: PostWhereUniqueInput | null;
  public_id?: string | null;
  type?: "Image" | "Video" | null;
  _lma?: Date | null;
};
