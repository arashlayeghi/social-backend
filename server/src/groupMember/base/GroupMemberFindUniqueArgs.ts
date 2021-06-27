import { ArgsType, Field } from "@nestjs/graphql";
import { GroupMemberWhereUniqueInput } from "./GroupMemberWhereUniqueInput";

@ArgsType()
class GroupMemberFindUniqueArgs {
  @Field(() => GroupMemberWhereUniqueInput, { nullable: false })
  where!: GroupMemberWhereUniqueInput;
}

export { GroupMemberFindUniqueArgs };
