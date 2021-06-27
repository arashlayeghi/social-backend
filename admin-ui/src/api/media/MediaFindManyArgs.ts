import { MediaWhereInput } from "./MediaWhereInput";
import { MediaOrderByInput } from "./MediaOrderByInput";

export type MediaFindManyArgs = {
  where?: MediaWhereInput;
  orderBy?: MediaOrderByInput;
  skip?: number;
  take?: number;
};
