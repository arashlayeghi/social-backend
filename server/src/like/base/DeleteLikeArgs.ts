import { ArgsType, Field } from "@nestjs/graphql";
import { LikeWhereUniqueInput } from "./LikeWhereUniqueInput";

@ArgsType()
class DeleteLikeArgs {
  @Field(() => LikeWhereUniqueInput, { nullable: false })
  where!: LikeWhereUniqueInput;
}

export { DeleteLikeArgs };
