import { GroupWhereInput } from "./GroupWhereInput";
import { GroupOrderByInput } from "./GroupOrderByInput";

export type GroupFindManyArgs = {
  where?: GroupWhereInput;
  orderBy?: GroupOrderByInput;
  skip?: number;
  take?: number;
};
