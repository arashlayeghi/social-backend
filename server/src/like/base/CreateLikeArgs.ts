import { ArgsType, Field } from "@nestjs/graphql";
import { LikeCreateInput } from "./LikeCreateInput";

@ArgsType()
class CreateLikeArgs {
  @Field(() => LikeCreateInput, { nullable: false })
  data!: LikeCreateInput;
}

export { CreateLikeArgs };
