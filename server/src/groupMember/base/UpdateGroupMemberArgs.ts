import { ArgsType, Field } from "@nestjs/graphql";
import { GroupMemberWhereUniqueInput } from "./GroupMemberWhereUniqueInput";
import { GroupMemberUpdateInput } from "./GroupMemberUpdateInput";

@ArgsType()
class UpdateGroupMemberArgs {
  @Field(() => GroupMemberWhereUniqueInput, { nullable: false })
  where!: GroupMemberWhereUniqueInput;
  @Field(() => GroupMemberUpdateInput, { nullable: false })
  data!: GroupMemberUpdateInput;
}

export { UpdateGroupMemberArgs };
