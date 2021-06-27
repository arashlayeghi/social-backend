import { Post } from "../post/Post";

export type Media = {
  _ca: number;
  id: string;
  post?: Post | null;
  public_id: string | null;
  type?: "Image" | "Video" | null;
  _lma: Date | null;
};
