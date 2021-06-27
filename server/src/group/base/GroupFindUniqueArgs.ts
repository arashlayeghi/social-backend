import { ArgsType, Field } from "@nestjs/graphql";
import { GroupWhereUniqueInput } from "./GroupWhereUniqueInput";

@ArgsType()
class GroupFindUniqueArgs {
  @Field(() => GroupWhereUniqueInput, { nullable: false })
  where!: GroupWhereUniqueInput;
}

export { GroupFindUniqueArgs };
