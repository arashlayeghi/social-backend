import { ArgsType, Field } from "@nestjs/graphql";
import { LikeWhereUniqueInput } from "./LikeWhereUniqueInput";
import { LikeUpdateInput } from "./LikeUpdateInput";

@ArgsType()
class UpdateLikeArgs {
  @Field(() => LikeWhereUniqueInput, { nullable: false })
  where!: LikeWhereUniqueInput;
  @Field(() => LikeUpdateInput, { nullable: false })
  data!: LikeUpdateInput;
}

export { UpdateLikeArgs };
