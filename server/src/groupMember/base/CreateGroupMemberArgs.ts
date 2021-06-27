import { ArgsType, Field } from "@nestjs/graphql";
import { GroupMemberCreateInput } from "./GroupMemberCreateInput";

@ArgsType()
class CreateGroupMemberArgs {
  @Field(() => GroupMemberCreateInput, { nullable: false })
  data!: GroupMemberCreateInput;
}

export { CreateGroupMemberArgs };
