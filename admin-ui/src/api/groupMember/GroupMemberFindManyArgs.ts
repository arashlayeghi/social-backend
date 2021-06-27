import { GroupMemberWhereInput } from "./GroupMemberWhereInput";
import { GroupMemberOrderByInput } from "./GroupMemberOrderByInput";

export type GroupMemberFindManyArgs = {
  where?: GroupMemberWhereInput;
  orderBy?: GroupMemberOrderByInput;
  skip?: number;
  take?: number;
};
