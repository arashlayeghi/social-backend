import { ArgsType, Field } from "@nestjs/graphql";
import { MediaWhereUniqueInput } from "./MediaWhereUniqueInput";
import { MediaUpdateInput } from "./MediaUpdateInput";

@ArgsType()
class UpdateMediaArgs {
  @Field(() => MediaWhereUniqueInput, { nullable: false })
  where!: MediaWhereUniqueInput;
  @Field(() => MediaUpdateInput, { nullable: false })
  data!: MediaUpdateInput;
}

export { UpdateMediaArgs };
