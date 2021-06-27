import { ArgsType, Field } from "@nestjs/graphql";
import { LikeWhereUniqueInput } from "./LikeWhereUniqueInput";

@ArgsType()
class LikeFindUniqueArgs {
  @Field(() => LikeWhereUniqueInput, { nullable: false })
  where!: LikeWhereUniqueInput;
}

export { LikeFindUniqueArgs };
