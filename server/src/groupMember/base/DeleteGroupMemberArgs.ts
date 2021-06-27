import { ArgsType, Field } from "@nestjs/graphql";
import { GroupMemberWhereUniqueInput } from "./GroupMemberWhereUniqueInput";

@ArgsType()
class DeleteGroupMemberArgs {
  @Field(() => GroupMemberWhereUniqueInput, { nullable: false })
  where!: GroupMemberWhereUniqueInput;
}

export { DeleteGroupMemberArgs };
